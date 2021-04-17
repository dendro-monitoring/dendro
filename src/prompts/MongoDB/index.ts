const { MultiSelect, Form } = require('enquirer');
import prompts = require('prompts');

export const mongoPrompt = async (): Promise<prompts.Answers<"mongo">> => {
  return await prompts({
    type: 'multiselect',
    name: 'mongo',
    message: 'Which of the following aspects of MongoDB would you like to monitor?\n',
    instructions: 'Press: Space to select one, A to select all, and Enter to submit.',
    choices: [
      { 
        title: 'Log',
        value: 'Log',
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

export const mongoCredentialsPrompt: any = new Form({
  name: 'user',
  message: 'Please provide the following information for MongoDB:',
  choices: [
    { name: 'url', message: 'URL', initial: 'localhost' },
    { name: 'port', message: 'Port', initial: '27017' },
    { name: 'scrapeIntervalSeconds', message: 'Scrape Interval (s)', initial: '15' },
  ]
});
