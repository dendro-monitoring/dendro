const { Form } = require('enquirer');
import prompts = require('prompts');

export const nginxPrompt = (async (): Promise<prompts.Answers<"nginx">> => {
  return await prompts({
    type: 'multiselect',
    name: 'nginx',
    message: 'Which of the following aspects of nginx would you like to monitor?\n',
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
