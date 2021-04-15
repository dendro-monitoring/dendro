import { MultiSelect }  from 'enquirer';
import { nginxPrompt } from './nginx/nginxPrompt';

const servicesToMonitor: any = new MultiSelect({
  name: 'sources',
  message: 'What would you like to monitor?\n' +
           'Press: Space to select one, A to select all, and Enter to submit.',
  choices: [
    { name: 'nginx' },
    { name: 'Apache' },
    { name: 'Postgres' },
    { name: 'MongoDB' },
    { name: 'Host machine health' },
    { name: 'Custom application (other)' },
  ],
})

export { servicesToMonitor, nginxPrompt }