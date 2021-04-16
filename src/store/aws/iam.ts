<<<<<<< HEAD
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
=======
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
>>>>>>> 0becc9cc1b4db997d07357e1fb3c471766f7922a
