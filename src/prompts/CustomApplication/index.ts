export const customApplicationPromptOptions = {
  name: 'customApplication',
  message: 'Please provide the following information for your custom application/log location to tail:',
  choices: [
    { name: 'name', message: 'Application name', initial: 'ex. Rails server' },
    { name: 'filepath', message: 'Log filepath', initial: 'ex. /var/log/railsApp/railsApp.log' },
  ]
};
