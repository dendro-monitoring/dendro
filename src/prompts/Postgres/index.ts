const { Form } = require('enquirer');
import prompts from 'prompts';

export const postgresPrompt = async (): Promise<prompts.Answers<"postgres">> => {
  return await prompts({
    type: 'multiselect',
    name: 'postgres',
    message: 'Which of the following aspects of Postgres would you like to monitor?\n',
    instructions: 'Press: Space to select one, A to select all, and Enter to submit.',
    choices: [
      {
        title: 'Error log',
        value: 'Error log',
        description: 'Collect Postgres logs per your `postgresql.conf` file.\nFor more information on defaults, visit: https://www.postgresql.org/docs/9.0/runtime-config-logging.html'
      },
      {
        title: 'Health metrics',
        value: 'Health metrics',
        description: 'Record information on status, database connections, and more.\nFor more info, visit https://vector.dev/docs/reference/configuration/sources/postgresql_metrics/'
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
