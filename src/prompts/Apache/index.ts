const { Form } = require('enquirer');
import prompts = require('prompts');

export const apachePrompt = async (): Promise<prompts.Answers<"apache">> => {
  return await prompts({
    type: 'multiselect',
    name: 'apache',
    message: 'Which of the following aspects of Apache would you like to monitor?',
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
        description: 'Record diagnostic information and any errors Apache encounters.'
      },
      { 
        title: 'Health metrics',
        value: 'Health metrics',
        description: 'Record information on access, connections, CPU load, and more.\nFor more info, visit https://vector.dev/docs/reference/configuration/sources/apache_metrics/'
      },
    ],
  });
};

export const apacheHealthPrompt: any = new Form({
  name: 'user',
  message: 'Please provide the following information for Apache:',
  choices: [
    { name: 'url', message: 'Apache URL', initial: 'localhost' },
    { name: 'port', message: 'Apache Port', initial: '80' },
    { name: 'scrapeIntervalSeconds', message: 'Scrape Interval (s)', initial: '15' },
  ]
});
