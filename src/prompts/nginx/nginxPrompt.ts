import { MultiSelect }  from 'enquirer';

const nginxPrompt: any = new MultiSelect({
  name: 'nginx',
  message: 'Which of the following aspects of nginx would you like to monitor?\n' + 
           'Press: Space to select one, A to select all, and Enter to submit.',
  choices: [
    { name: 'Access log' },
    { name: 'Error log' },
    { name: 'Health metrics' },
  ],
})

export { nginxPrompt }