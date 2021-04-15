const AWSWrapper = require('../aws');

const DATABASE_NAME = 'dendroflumechuck-timestream2';
const TABLE_NAME = 'default-table';

function setupTimestream() {
  return new Promise(resolve => {  
    AWSWrapper.createTimestreamDatabase(DATABASE_NAME).then( () => {
      AWSWrapper.createTimestreamTable({ DatabaseName: DATABASE_NAME, TableName: TABLE_NAME }).then( () => {
        resolve();
      });
    });
  
  });
}

module.exports = setupTimestream;
