import { Command } from '@oclif/command';

import orchestrator from '../aws/orchestrator';

export default class DeleteResources extends Command {

  async run() {
    await orchestrator.deleteTimestream();
  }
}
