import { MultiSelect, Form }  from 'enquirer';

export const apachePrompt: any = new MultiSelect({
  name: 'apache',
  message: 'Which of the following aspects of Apache would you like to monitor?\n' + 
           'Press: Space to select one, A to select all, and Enter to submit.',
  choices: [
    { name: 'Access log' },
    { name: 'Error log' },
    { name: 'Health metrics' },
  ],
});

export const apacheHealthPrompt: any = new Form({
  name: 'user',
  message: 'Please provide the following information for Apache:',
  choices: [
    { name: 'url', message: 'Apache URL', initial: 'localhost' },
    { name: 'port', message: 'Apache Port', initial: '80' },
    { name: 'scrapeInterval', message: 'Scrape Interval (s)', initial: '15' },
  ]
});