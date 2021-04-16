// TODO: we have the rolename string, which is user input? And then we have the data from the API creation call, which I'm storing in RoleData. Is there a better way?

export interface AWSIAMData {
  RoleName?: string;
  Arn?: string;
}

class IAM {
  RoleName?: string;
  Arn?: string;

  constructor({ RoleName }: AWSIAMData) {
    this.RoleName = RoleName;
  }
}

export default IAM;
