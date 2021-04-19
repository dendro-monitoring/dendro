export interface CloudwatchData {
  NextToken?: string | null;
}

export default class Cloudwatch {
  NextToken?: string;

  constructor({ NextToken }: CloudwatchData) {
    if (NextToken) this.NextToken = NextToken;
  }
}
