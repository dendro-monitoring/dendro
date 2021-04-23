import * as AWS from 'aws-sdk';
import store from '../store';
import { awsCredentialsFormInfo } from '../prompts';
const { Form } = require('enquirer');
import { AWSCredentialsAnswers } from '../constants/cliTypes';
import chalk from 'chalk';

export const credentialsExist = (): boolean => (
  !!(store.AWS.Credentials.accessKeyId) && !!(store.AWS.Credentials.secretAccessKey)
);

export const ensureCredentials = (): void => {
  if (!credentialsExist()) {
    throw new Error(`AWS Credentials do not exist.\nPlease run ${chalk.bold.yellow('dendro configure')}`);
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

let credentialsSet = false;
/**
 * This may be called multiple times throughout the app
 * so we must ensure we only update AWS config once.
 */
export function setCredentials(): void {
  if (credentialsSet) return;

  AWS.config.update({
    accessKeyId: store.AWS.Credentials.accessKeyId,
    secretAccessKey: store.AWS.Credentials.secretAccessKey,
  });

  credentialsSet = true;
}
