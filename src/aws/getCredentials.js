const AWS = require('aws-sdk');

async function isAuthenticated() {
  return new Promise(resolve => {
    AWS.config.getCredentials((err, data) => {
      if (err) throw new Error(err);
      resolve(data);
    });
  });
}

module.exports = isAuthenticated;
