import prompts from 'prompts';

import { nginxPrompt, nginxHealthPrompt } from './Nginx';
import { apachePrompt, apacheHealthPrompt } from './Apache';
import { postgresPrompt, postgresCredentialsPrompt } from './Postgres';
import { mongoPrompt, mongoCredentialsPrompt } from './MongoDB';
import { hostPrompt } from './Host';
import { customApplicationPromptOptions } from './CustomApplication';
<<<<<<< HEAD
import {
  awsCredentialsFormInfo,
  promptCredentials,
  confirmAlarms,
  alarmEmailsPrompt
} from './AWS';
=======
import { awsCredentialsFormInfo, promptCredentials } from './AWS';
>>>>>>> 882e0f1bb75f669a3bd7ab3723c05b3fe28571e9

const servicesToMonitor = async (): Promise<prompts.Answers<'sources'>> => {
  return await prompts({
    type: 'multiselect',
    name: 'sources',
    message: 'What would you like to monitor?\n',
    instructions: 'Press: Space to select one, A to select all, and Enter to submit.',
    choices: [
      {
        title: 'nginx',
        value: 'nginx',
      },
      {
        title: 'Apache',
        value: 'Apache',
      },
      {
        title: 'Postgres',
        value: 'Postgres',
      },
      {
        title: 'MongoDB',
        value: 'MongoDB',
      },
      {
        title: 'Host machine health',
        value: 'Host machine health',
      },
      {
        title: 'Custom application (other)',
        value: 'Custom application (other)',
      },
    ],
  });
};

export {
  servicesToMonitor,
  nginxPrompt, nginxHealthPrompt,
  apachePrompt, apacheHealthPrompt,
  postgresPrompt, postgresCredentialsPrompt,
  mongoPrompt, mongoCredentialsPrompt,
  hostPrompt,
  customApplicationPromptOptions,
  awsCredentialsFormInfo,
  promptCredentials,
  confirmAlarms,
  alarmEmailsPrompt
};
