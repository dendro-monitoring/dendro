import store from '../../store';

// TODO
const config = (): string => {
  console.log('Not Implemented');
  return '';
};

export const buildHostConfig = (): string => {
  if (store.Vector.Host.shouldBuildConfig()) {
    return config();
  }

  return '';
};
