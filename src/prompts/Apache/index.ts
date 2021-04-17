const { Form } = require('enquirer');
import prompts = require('prompts');

export const apachePrompt = (async (): Promise<prompts.Answers<"apache">> => {
  return await prompts({
    type: 'multiselect',
    name: 'apache',
    message: 'Which of the following aspects of Apache would you like to monitor?\n',
    instructions: 'Press: Space to select one, A to select all, and Enter to submit.',
    choices: [
      { 
        title: 'Access log',
        value: 'Access log',
        description: "hello"  
      },
      { 
        title: 'Error log',
        value: 'Error log',
        description: 'world'  
      },
      { 
        title: 'Health metrics',
        value: 'Health metrics',
        description: 'world' 
      },
    ],
  });
});

export const apacheHealthPrompt: any = new Form({
  name: 'user',
  message: 'Please provide the following information for Apache:',
  choices: [
    { name: 'url', message: 'Apache URL', initial: 'localhost' },
    { name: 'port', message: 'Apache Port', initial: '80' },
    { name: 'scrapeIntervalSeconds', message: 'Scrape Interval (s)', initial: '15' },
  ]
});
