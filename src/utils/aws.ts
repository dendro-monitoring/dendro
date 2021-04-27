import * as AWS from 'aws-sdk';
import store from '../store';
import chalk from 'chalk';

export const credentialsExist = (): boolean => (
  !!(store.AWS.Credentials.accessKeyId) && !!(store.AWS.Credentials.secretAccessKey)
);

export const ensureCredentials = (): void => {
  if (!credentialsExist()) {
    throw new Error(`AWS Credentials do not exist.\nPlease run ${chalk.bold.yellow('dendro configure')}`);
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
