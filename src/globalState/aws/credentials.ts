export interface CredentialsData {
  accessKeyId?: string;
  secretAccessKey?: string;
}

/*
 * TODO: Document Class
 */
class Credentials {
  accessKeyId?: string;

  secretAccessKey?: string;

  constructor({ accessKeyId, secretAccessKey }: CredentialsData) {
    this.accessKeyId = accessKeyId
    this.secretAccessKey = secretAccessKey
  }
}

export default Credentials
