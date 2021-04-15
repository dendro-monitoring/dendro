import globalState from '../../globalState';

// TODO
const config = (): string => {
  console.log('Not Implemented');
  return '';
};

export const buildHostConfig = (): string => {
  if (globalState.Vector.Host.shouldBuildConfig()) {
    return config();
  }

  return '';
};
