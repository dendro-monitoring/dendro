import { MultiSelect, Form }  from 'enquirer';

export const nginxPrompt: any = new MultiSelect({
  name: 'nginx',
  message: 'Which of the following aspects of nginx would you like to monitor?\n' + 
           'Press: Space to select one, A to select all, and Enter to submit.',
  choices: [
    { name: 'Access log' },
    { name: 'Error log' },
    { name: 'Health metrics' },
  ],
});

export const nginxHealthPrompt: any = new Form({
  name: 'user',
  message: 'Please provide the following information for nginx:',
  choices: [
    { name: 'url', message: 'nginx URL', initial: 'localhost' },
    { name: 'port', message: 'nginx Port', initial: '80' },
    { name: 'scrapeInterval', message: 'Scrape Interval (s)', initial: '15' },
  ]
});