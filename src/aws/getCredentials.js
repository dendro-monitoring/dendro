var AWS = require("aws-sdk");

async function isAuthenticated(callback) {
  AWS.config.getCredentials(callback);
}

module.exports = isAuthenticated