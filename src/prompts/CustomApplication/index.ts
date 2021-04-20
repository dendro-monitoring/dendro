// export const customApplicationPrompt = new Form({
export const customApplicationPromptOptions = {
  name: 'customApplication',
  message: 'Please provide the following information for your custom application:',
  choices: [
    { name: 'name', message: 'Application name', initial: 'ex. Rails server' },
    { name: 'location', message: 'Log filepath', initial: 'ex. /var/log/railsApp/railsApp.log' },
  ]
};
