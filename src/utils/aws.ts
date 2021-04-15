import store from '../store';

/**
 * Used to ensure aws credentials exist prior to doing some operation
 * that would require them.
 *
 * @param {string} msg the error message
 */
export const ensureCredentials = (msg: string): void => {
  if (
    !store.AWS.Credentials.accessKeyId ||
    !store.AWS.Credentials.secretAccessKey
  ) {
    console.log(store.AWS);
    throw new Error(msg);
  }
};
