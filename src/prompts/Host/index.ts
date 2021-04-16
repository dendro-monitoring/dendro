const { MultiSelect } = require('enquirer');

export const hostPrompt: string[] = new MultiSelect({
  name: 'host',
  message: 'Which of the following host metrics would you like to monitor?\n' + 
           'Press: Space to select one, A to select all, and Enter to submit.',
  choices: [
    { name: 'CPU' },
    { name: 'Disk' },
    { name: 'Filesystem' },
    { name: 'Load' },
    { name: 'Host' },
    { name: 'Memory' },
    { name: 'Network' },
  ],
});
