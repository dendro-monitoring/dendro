import { Command } from '@oclif/command';
import chalk from 'chalk';
import { cli } from 'cli-ux';
const { Select, Confirm } = require('enquirer');
import log from '../utils/log';

export default class InstallVector extends Command {
  static description = 'install Vector to collect and ship logs and metrics';

  async run(): Promise<void> {
    console.clear();
    const instructions = 'Copy and paste the following command into another terminal instance to download and install Vector:';
    const homebrew = ' brew tap timberio/brew && brew install vector && brew services restart vector ';
    const rpm = ' sudo rpm -i https://packages.timber.io/vector/0.13.X/vector-0.13.X-1.x86_64.rpm && sudo systemctl restart vector ';
    const apt = ' sudo apt-get install vector && sudo systemctl restart vector && vector top ';
    const other = 'Please check the official Vector documentation at: https://vector.dev/docs/setup/installation/';
    const codeBlock = (msg: string) => chalk.bgBlack.red(msg);

    const prompt = new Select({
      name: 'package-manager',
      message: 'Which package manager do you use?',
      choices: [ 'Homebrew', 'APT', 'RPM', 'Other' ]
    });

    const choice = await prompt.run();

    log.info(instructions);
    if (choice.includes('Homebrew')) {

      console.log('   ' + codeBlock(homebrew));
    } else if (choice.includes('APT')) {
      console.log('   ' + codeBlock(apt));
    } else if (choice.includes('RPM')) {
      console.log('   ' + codeBlock(rpm));
    } else if (choice.includes('Other')) {
      console.log(other);
    }

    const customTransforms = new Confirm({
      name: 'customTransforms',
      message: 'Would you like to transform your logs before sending them?'
    });

    if(await customTransforms.run()) {
      log.info('Please visit:');
      cli.url('- Vector\'s Remap Function', 'https://vector.dev/docs/reference/configuration/transforms/remap/');
    }
  }
}
