const { MultiSelect, Form } = require('enquirer');
import prompts = require('prompts');

export const postgresPrompt = async (): Promise<prompts.Answers<"postgres">> => {
  return await prompts({
    type: 'multiselect',
    name: 'postgres',
    message: 'Which of the following aspects of Postgres would you like to monitor?\n',
    instructions: 'Press: Space to select one, A to select all, and Enter to submit.',
    choices: [
      { 
        title: 'Error Log',
        value: 'Error Log',
        description: "hello"  
      },
      { 
        title: 'Health metrics',
        value: 'Health metrics',
        description: 'world' 
      },
    ],
  });
};

export const postgresCredentialsPrompt: any = new Form({
  name: 'user',
  message: 'Please provide the following information for Postgres:',
  choices: [
    { name: 'url', message: 'URL', initial: 'localhost' },
    { name: 'port', message: 'Port', initial: '5432' },
    { name: 'dbName', message: 'Database name', initial: 'postgres' },
    { name: 'username', message: 'Username', initial: 'postgres' },
    { name: 'password', message: 'Password', initial: '' },
    { name: 'scrapeIntervalSeconds', message: 'Scrape Interval (s)', initial: '15' },
  ]
});
