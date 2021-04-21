import log from '../../utils/log';
import { AWSCredentialsAnswers } from '../../constants/cliTypes';
import store from '../../store';

export const awsCredentialsFormInfo = {
  name: 'aws credentials',
  message: 'Please provide AWS credentials for generating the vector configuration file:',
  choices: [
    {
      name: 'Access Key ID',
      message: 'Access Key ID',
      initial: store.AWS.Credentials.accessKeyId || 'AKIA****'
    },
    {
      name: 'Secret Key',
      message: 'Secret Key',
      initial: store.AWS.Credentials.secretAccessKey || 'Wg55Y****'
    },
  ],
  validate: (answers: AWSCredentialsAnswers): boolean => {
    if (answers['Access Key ID'].length < 16) {
      console.clear();
      log.warn('That does not look like a AWS Acess Key ID. Length is typically 20\n');

      return false;
    } else if (answers['Secret Key'].length < 30) {
      console.clear();
      log.warn('That does not look like a AWS Secret Key. Length is typically 40\n');

      return false;
    }

    return true;
  }
};
