import AWSWrapper from '../..';

export default function deleteLambda(): Promise<any> {
  return AWSWrapper.deleteFunction();
}

