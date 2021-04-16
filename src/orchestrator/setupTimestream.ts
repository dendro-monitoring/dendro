import AWSWrapper from '../aws';

const DATABASE_NAME = 'dendroflumechuck-timestream12';
const TABLE_NAME = 'default-table';

export default function setupTimestream(): Promise<any> {
  return new Promise(resolve => {  
    AWSWrapper.createTimestreamDatabase(DATABASE_NAME).then( (databaseData) => {
      AWSWrapper.createTimestreamTable({ DatabaseName: DATABASE_NAME, TableName: TABLE_NAME } as any).then( () => {
        resolve(databaseData);
      });
    });
  
  });
}

module.exports = setupTimestream;
