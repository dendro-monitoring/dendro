import log from '../../utils/log';
import { AWSCredentialsAnswers } from '../../constants/cliTypes';
import store from '../../store';
import { credentialsExist } from '../../utils/aws';
import { EMAIL_REGEX } from '../../constants';
const { Confirm, List, Form } = require('enquirer');

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
      log.warn('That does not look like a AWS Access Key ID. Length is typically 20 characters.\n');

      return false;
    } else if (answers['Secret Key'].length < 30) {
      console.clear();
      log.warn('That does not look like a AWS Secret Key. Length is typically 40 characters.\n');

      return false;
    }

    return true;
  }
};

/**
 * Used to ensure aws credentials exist prior to doing some operation
 * that would require them.
 */
export const promptCredentials = async (): Promise<void> => {
  if (!credentialsExist()) {
    console.clear();

    const answers: AWSCredentialsAnswers = await (new Form(awsCredentialsFormInfo)).run();
    store.AWS.Credentials.accessKeyId = answers['Access Key ID'];
    store.AWS.Credentials.secretAccessKey = answers['Secret Key'];
  }
};

export const IAMPrompt = new Confirm({
  name: 'IAM',
  message: 'Do your keys have access to the following policies? \n * IAMFullAccess \n * AmazonS3FullAccess \n * AmazonKinesisFirehoseFullAccess \n * AmazonTimestreamFullAccess \n * AWSLambda_FullAccess \n'
});

export const confirmAlarms = new Confirm({
  name: 'question',
  message: 'Would you like to enable email alerts when errors occur?',
});

export const alarmEmailsPrompt = new List({
  name: 'emails',
  message: 'Please list comma-separated emails you would to notify when alarms are raised?\n',
  validate: (answers: string[]) => {
    if (answers.length === 0) return false;
    if (typeof answers === 'string') return;

    let valid = true;

    answers.forEach((answer) => {
      if (!EMAIL_REGEX.test(answer)) {
        console.clear();

        log.warn(`${answer} does not look like an email.`);
        valid = false;
      }
    });

    return valid;
  }
});
