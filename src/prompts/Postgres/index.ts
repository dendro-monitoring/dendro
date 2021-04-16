const { MultiSelect, Form } = require('enquirer');

export const postgresPrompt: any = new MultiSelect({
  name: 'postgres',
  message: 'Which of the following aspects of Postgres would you like to monitor?\n' + 
           'Press: Space to select one, A to select all, and Enter to submit.',
  choices: [
    { name: 'Error log' },
    { name: 'Health metrics' },
  ],
});

export const postgresCredentialsPrompt: any = new Form({
  name: 'user',
  message: 'Please provide the following information for Postgres:',
  choices: [
    { name: 'url', message: 'URL', initial: 'localhost' },
    { name: 'port', message: 'Port', initial: '5432' },
    { name: 'username', message: 'Username', initial: 'postgres' },
    { name: 'password', message: 'Password', initial: '' },
    { name: 'scrapeInterval', message: 'Scrape Interval (s)', initial: '15' },
  ]
});