import AWS = require('aws-sdk');

export default async function isAuthenticated(): Promise<any> {
  return new Promise(resolve => {
    AWS.config.getCredentials((err, data) => {
      if (err) throw new Error(String(err));
      resolve(data);
    });
  });
<<<<<<< HEAD
}
=======
}
>>>>>>> 0becc9cc1b4db997d07357e1fb3c471766f7922a
