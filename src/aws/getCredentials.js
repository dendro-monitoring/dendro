const AWS = require('aws-sdk');

async function isAuthenticated() {
  return new Promise(resolve => {
    AWS.config.getCredentials((err, data) => {
      resolve([err, data]);
    });
  });
}

module.exports = isAuthenticated;
