const AWS = require('aws-sdk');
var autoscaling = new AWS.AutoScaling({
  apiVersion: '2016-11-15',
  region: 'us-west-1'
});

async function completeLifecycle(event) {
  var params = {
    AutoScalingGroupName: event.detail.AutoScalingGroupName, 
    LifecycleActionResult: "CONTINUE", 
    LifecycleActionToken: event.detail.LifecycleActionToken, 
    LifecycleHookName: event.detail.LifecycleHookName
  };

  try {
    let data = await autoscaling.completeLifecycleAction(params).promise();
    console.log(data);           // successful response
    return;
  }
  catch(err) {
    console.log(err, err.stack); // an error occurred
    throw err;
  }
}

exports.completeLifecycle = completeLifecycle;