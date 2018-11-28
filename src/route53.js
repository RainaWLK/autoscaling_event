const AWS = require('aws-sdk');
const route53 = new AWS.Route53();

async function getRecord(HostZoneId, RecordSetName) {
  let params = {
    HostedZoneId: HostZoneId,
    StartRecordName: RecordSetName,
    StartRecordType: "A"
  };
  
  try {
    let data = await route53.listResourceRecordSets(params).promise();

    let record = data.ResourceRecordSets.find(e => e.Name === RecordSetName);

    return record.ResourceRecords;
  }
  catch(err) {
    console.log(err, err.stack); // an error occurred
    throw err;
  }
  
}

async function updateRecord(HostZoneId, RecordSetName, records) {
  var params = {
    ChangeBatch: {
      Changes: [
      {
        Action: "UPSERT", 
        ResourceRecordSet: {
          Name: RecordSetName, 
          ResourceRecords: records,
          /*[
            {
              Value: "192.0.2.44"
            }
          ], */
          TTL: 60, 
          Type: "A"
        }
      }
      ]
    }, 
    HostedZoneId: HostZoneId
  };
  
  try {
    let data = await route53.changeResourceRecordSets(params).promise();
    /*
      data = {
        ChangeInfo: {
          Comment: "Web server for example.com", 
          Id: "/change/C2682N5HXP0BZ4", 
          Status: "PENDING", 
          SubmittedAt: <Date Representation>
        }
      }
    */
    return;
  }
  catch(err) {
    console.log(err, err.stack); // an error occurred
    throw err;
  }
  
}

exports.getRecord = getRecord;
exports.updateRecord = updateRecord;