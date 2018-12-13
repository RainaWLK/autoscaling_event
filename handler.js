'use strict';
let app = require('./src/app.js');
let autoScaling = require('./src/autoScaling.js');

module.exports.initEC2 = async (event, context, callback) => {
  console.log(event);
  console.log('instance id=' + event.detail.EC2InstanceId);
  
  if(event['detail-type'] === 'EC2 Instance Launch Successful') {
    await app.newInstance(event.detail.EC2InstanceId);
  }
  else if(event['detail-type'] === 'EC2 Instance-terminate Lifecycle Action') {
    try {
      await app.delInstance(event.detail.EC2InstanceId);
    }
    catch(err) {
      //do nothing
    }
    await autoScaling.completeLifecycle(event);
  }

  return callback(null, "OK");
}