dendro-cli
==========

Core CLI for dendroflumechuck

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dendro-cli.svg)](https://npmjs.org/package/dendro-cli)
[![Downloads/week](https://img.shields.io/npm/dw/dendro-cli.svg)](https://npmjs.org/package/dendro-cli)
[![License](https://img.shields.io/npm/l/dendro-cli.svg)](https://github.com/dendro-naap/dendro-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g dendro-cli
$ dendro COMMAND
running command...
$ dendro (-v|--version|version)
dendro-cli/0.0.0 linux-x64 node-v14.15.3
$ dendro --help [COMMAND]
USAGE
  $ dendro COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dendro clean [FILE]`](#dendro-clean-file)
* [`dendro hello`](#dendro-hello)
* [`dendro help [COMMAND]`](#dendro-help-command)
* [`dendro test`](#dendro-test)

## `dendro clean [FILE]`

describe the command here

```
USAGE
  $ dendro clean [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/clean.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.0/src/commands/clean.ts)_

## `dendro hello`

describe the command here

```
USAGE
  $ dendro hello

OPTIONS
  -L, --level=debug|info|warn|error|fatal  [default: info] set the log level
  -h, --help                               show CLI help

EXAMPLE
  $ dendro hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.0/src/commands/hello.ts)_

## `dendro help [COMMAND]`

display help for dendro

```
USAGE
  $ dendro help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `dendro test`

Describe the command here

```
USAGE
  $ dendro test

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/test.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.0/src/commands/test.ts)_
<!-- commandsstop -->
