const AWS = require('aws-sdk');
const Route53 = require('./route53.js');

const ec2 = new AWS.EC2({
  apiVersion: '2016-11-15',
  region: 'us-west-1'
});

const RecordSetName = process.env.DNS;
const HostZoneId = process.env.HostedZoneId;

async function describeInstance(EC2InstanceId) {
  let params = {
    InstanceIds: []
  };
  params.InstanceIds.push(EC2InstanceId);
  
  try {
    let data = await ec2.describeInstances(params).promise();
    console.log(data.Reservations[0].Instances);           // successful response

    return data.Reservations[0].Instances[0];
  }
  catch(err) {
    console.log(err, err.stack); // an error occurred
    throw err;
  }
}

async function delInstance(EC2InstanceId) {
  try {
    let data = await describeInstance(EC2InstanceId);

    let records = await Route53.getRecord(HostZoneId, RecordSetName);
    let newRecords = records.filter(e => e.Value !== data.PrivateIpAddress);
  
    return await Route53.updateRecord(HostZoneId, RecordSetName, newRecords);
  }
  catch(err) {
    throw err;
  }
}

async function newInstance(EC2InstanceId) {
  try {
    let data = await describeInstance(EC2InstanceId);
  
    let records = await Route53.getRecord(HostZoneId, RecordSetName);
    records.push({
      Value: data.PrivateIpAddress
    });
  
    return await Route53.updateRecord(HostZoneId, RecordSetName, records);
  }
  catch(err) {
    throw err;
  }
}

exports.delInstance = delInstance;
exports.newInstance = newInstance;