export interface SNSData {
  TopicArn?: string | undefined
  SubscriptionArn?: string | undefined
}

export default class SNS {
  TopicArn: string | undefined;
  SubscriptionArn: string | undefined;

  constructor({ TopicArn, SubscriptionArn }: SNSData) {
    this.TopicArn = TopicArn;
    this.SubscriptionArn = SubscriptionArn;
  }
}
