export interface SNSData {
  TopicArn?: string
  SubscriptionArn?: string
  Emails?: string[]
}

export default class SNS {
  TopicArn?: string;
  SubscriptionArn?: string;
  Emails: string[];

  constructor({ TopicArn, SubscriptionArn, Emails = [] }: SNSData) {
    this.TopicArn = TopicArn;
    this.SubscriptionArn = SubscriptionArn;
    this.Emails = Emails;
  }
}
