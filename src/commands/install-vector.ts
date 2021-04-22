import { Command } from '@oclif/command';
const { Select } = require('enquirer');

export default class InstallVector extends Command {
  static description = 'install Vector to collect and ship logs and metrics';

  async run(): Promise<void> {
    console.clear();

    const prompt = new Select({
      name: 'package-manager',
      message: 'Which package manager do you use?',
      choices: [ 'Homebrew', 'APT', 'RPM', 'Other' ]
    });

    const choice = await prompt.run();
    const instructions = 'Copy and paste the following command into another terminal instance to download and install Vector:';

    if (choice.includes('Homebrew')) {
      console.log(instructions);
      console.log('brew tap timberio/brew && brew install vector && brew services restart vector');
    } else if (choice.includes('APT')) {
      console.log(instructions);
      console.log('sudo apt-get install vector && sudo systemctl restart vector && vector top');
    } else if (choice.includes('RPM')) {
      console.log(instructions);
      console.log('sudo rpm -i https://packages.timber.io/vector/0.13.X/vector-0.13.X-1.x86_64.rpm && sudo systemctl restart vector');
    } else if (choice.includes('Other')) {
      console.log('Please check the official Vector documentation at: https://vector.dev/docs/setup/installation/');
    }
  }
}
