const { MultiSelect, Form } = require('enquirer');

export const mongoPrompt: string[] = new MultiSelect({
  name: 'mongo',
  message: 'Which of the following aspects of MongoDB would you like to monitor?\n' + 
           'Press: Space to select one, A to select all, and Enter to submit.',
  choices: [
    { name: 'Log' },
    { name: 'Health metrics' },
  ],
});

export const mongoCredentialsPrompt: any = new Form({
  name: 'user',
  message: 'Please provide the following information for MongoDB:',
  choices: [
    { name: 'url', message: 'URL', initial: 'localhost' },
    { name: 'port', message: 'Port', initial: '27017' },
    { name: 'scrapeInterval', message: 'Scrape Interval (s)', initial: '15' },
  ]
});
