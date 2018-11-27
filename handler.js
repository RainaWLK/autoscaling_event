'use strict';
let AWS = require('aws-sdk');
let app = require('./src/app.js');

module.exports.init_instance = (event, context, callback) => {
  console.log('init_instance');
  console.log(event);

  return callback(null, "OK");
}