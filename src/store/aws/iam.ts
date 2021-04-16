export interface AWSIAMData {
  role: any;
}

class IAM {
  Role: any

  constructor({ role }: AWSIAMData) {
    this.Role = role
  }
}

export default IAM
