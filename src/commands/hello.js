const {Command, flags} = require('@oclif/command')

class HelloCommand extends Command {
  async run() {
    const parsed = this.parse(HelloCommand)
    const name = parsed.flags.name || 'world'
    this.log(`hello ${name} from ./src/commands/hello.js`)
  }
}

HelloCommand.description = `Describe the command here
...
Extra documentation goes here
`

HelloCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = HelloCommand
