import * as path from 'path';
import AWSWrapper from '..';

export default function deleteLambda(): Promise<any> {
  return AWSWrapper.deleteLambdaFunction();
}

