export interface SNSData {
  TopicArn?: string
  SubscriptionArn?: string
}

export default class SNS {
  TopicArn?: string;
  SubscriptionArn?: string;

  constructor({ TopicArn, SubscriptionArn }: SNSData) {
    this.TopicArn = TopicArn;
    this.SubscriptionArn = SubscriptionArn;
  }
}
