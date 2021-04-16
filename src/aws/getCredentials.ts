import AWS = require('aws-sdk');

export default async function isAuthenticated(): Promise<any> {
  return new Promise(resolve => {
    AWS.config.getCredentials((err, data) => {
      if (err) throw new Error(String(err));
      resolve(data);
    });
  });
}
