export interface FirehoseData {
  deliveryStreamName?: string
}

/*
 * TODO: Document Class
 */
class Firehose {
  deliveryStreamName?: string;
  /*
   * TODO: Document descriptions & data types for properties
   */
  constructor({ deliveryStreamName }: FirehoseData) {
    this.deliveryStreamName = deliveryStreamName;
  }
}

export default Firehose;
