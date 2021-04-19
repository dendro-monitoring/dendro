export interface S3Data {
  bucketName: string
}

/*
 * TODO: Document Class
 */
class S3 {
  bucketName: string;
  /*
   * TODO: Document descriptions & data types for properties
   */
  constructor({ bucketName }: S3Data) {
    this.bucketName = bucketName;
  }
}

export default S3;
