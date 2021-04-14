import globalState from '../globalState'

/*
 * Used to ensure aws credentials exist prior to doing some operation
 * that would require them.
 */
export const ensureCredentials = (msg: string) => {
  if (
    !globalState.AWS.Credentials.accessKeyId ||
    !globalState.AWS.Credentials.secretAccessKey
  ) {
    console.log(globalState.AWS)
    throw new Error(msg)
  }
}
