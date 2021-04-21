const { Form } = require('enquirer');
import prompts from 'prompts';

export const nginxPrompt = async (): Promise<prompts.Answers<"nginx">> => {
  return await prompts({
    type: 'multiselect',
    name: 'nginx',
    message: 'Which of the following aspects of nginx would you like to monitor?\n',
    instructions: 'Press: Space to select one, A to select all, and Enter to submit.',
    choices: [
      {
        title: 'Access log',
        value: 'Access log',
        description: 'Record all requests processed by the server.'
      },
      {
        title: 'Error log',
        value: 'Error log',
        description: 'Record diagnostic information and any errors nginx encounters.'
      },
      {
        title: 'Health metrics',
        value: 'Health metrics',
        description: 'Record information on server status, access, connections, and more.\nFor more info, visit https://vector.dev/docs/reference/configuration/sources/nginx_metrics/'
      },
    ],
  });
};

export const nginxHealthPrompt: any = new Form({
  name: 'user',
  message: 'Please provide the following information for nginx:',
  choices: [
    {
      name: 'url',
      message: 'nginx URL',
      initial: 'localhost' },
    {
      name: 'port',
      message: 'nginx Port',
      initial: '80' },
    {
      name: 'scrapeIntervalSeconds',
      message: 'Scrape Interval (s)',
      initial: '15'
    },
  ]
});
