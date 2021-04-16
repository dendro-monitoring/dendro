// TODO: we have the rolename string, which is user input? And then we have the data from the API creation call, which I'm storing in RoleData. Is there a better

export interface AWSIAMData {
  RoleName?: string;
  RoleData?: Record<string, any>;
}

class IAM {
  RoleName?: string;
  RoleData?: Record<string, any>;

  constructor({ RoleName }: AWSIAMData) {
    this.RoleName = RoleName;
  }
}

export default IAM;
