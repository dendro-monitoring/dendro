import AWS = require('aws-sdk');

import store from '../../store';

const timestreamwrite = new AWS.TimestreamWrite();

export default function listTables(): Promise<any> {
  return new Promise(resolve => {
    const params = {
      DatabaseName: store.AWS.Timestream.DatabaseName,
      NextToken: store.AWS.Timestream.NextToken
    };
    timestreamwrite.listTables(params, function(err, data) {
      if (err) {
        throw new Error(String(err));
      }
      else { 
        store.AWS.Timestream.NextToken = data.NextToken;
        resolve(data);
      }
    });
  });
}
