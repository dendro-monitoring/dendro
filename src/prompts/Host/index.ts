import prompts = require('prompts');

export const hostPrompt = (async (): Promise<prompts.Answers<"host">> => {
  return await prompts({
    type: 'multiselect',
    name: 'host',
    message: 'Which of the following host metrics would you like to monitor?\n',
    instructions: 'Press: Space to select one, A to select all, and Enter to submit.',
    choices: [
      { 
        title: 'CPU',
        value: 'CPU',
        description: "hello"  
      },
      { 
        title: 'Disk',
        value: 'Disk',
        description: 'world'  
      },
      { 
        title: 'Filesystem',
        value: 'Filesystem',
        description: 'world' 
      },
      { 
        title: 'Load',
        value: 'Load',
        description: 'world' 
      },
      { 
        title: 'Host',
        value: 'Host',
        description: 'world' 
      },
      { 
        title: 'Memory',
        value: 'Memory',
        description: 'world' 
      },
      { 
        title: 'Network',
        value: 'Network',
        description: 'world' 
      },
    ],
  });
});
