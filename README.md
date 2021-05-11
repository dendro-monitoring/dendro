dendro-cli
==========

Core CLI for dendroflumechuck

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dendro-cli.svg)](https://npmjs.org/package/dendro-cli)
[![Downloads/week](https://img.shields.io/npm/dw/dendro-cli.svg)](https://npmjs.org/package/dendro-cli)
[![License](https://img.shields.io/npm/l/dendro-cli.svg)](https://github.com/dendro-monitoring/dendro-cli/blob/master/package.json)

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
dendro-cli/0.0.11 linux-x64 node-v14.15.3
$ dendro --help [COMMAND]
USAGE
  $ dendro COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dendro clean`](#dendro-clean)
* [`dendro configure`](#dendro-configure)
* [`dendro deleteResources`](#dendro-deleteresources)
* [`dendro deploy`](#dendro-deploy)
* [`dendro help [COMMAND]`](#dendro-help-command)
* [`dendro list`](#dendro-list)
* [`dendro logs`](#dendro-logs)
* [`dendro query [QUERYSTRING]`](#dendro-query-querystring)
* [`dendro review [FILE]`](#dendro-review-file)
* [`dendro start:server`](#dendro-startserver)

## `dendro clean`

removes the existing cache from disk

```
USAGE
  $ dendro clean

OPTIONS
  -L, --level=debug|info|warn|error|fatal  [default: info] set the log level
  -h, --help                               show CLI help
```

_See code: [src/commands/clean.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/clean.ts)_

## `dendro configure`

configuring collector/agent setup of log sources

```
USAGE
  $ dendro configure

OPTIONS
  -L, --level=debug|info|warn|error|fatal  [default: info] set the log level
  -h, --help                               show CLI help
```

_See code: [src/commands/configure.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/configure.ts)_

## `dendro deleteResources`

```
USAGE
  $ dendro deleteResources
```

_See code: [src/commands/deleteResources.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/deleteResources.ts)_

## `dendro deploy`

Describe the command here

```
USAGE
  $ dendro deploy

OPTIONS
  -L, --level=debug|info|warn|error|fatal  [default: info] set the log level
  -h, --help                               show CLI help

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/deploy.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/deploy.ts)_

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

## `dendro list`

describe the command here

```
USAGE
  $ dendro list

OPTIONS
  -L, --level=debug|info|warn|error|fatal  [default: info] set the log level
  -h, --help                               show CLI help

EXAMPLE
  $ dendro list
  Roles
  Buckets
  Firehose streams
  Lambda
  Timestream
```

_See code: [src/commands/list.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/list.ts)_

## `dendro logs`

logs cloudwatch logs

```
USAGE
  $ dendro logs

OPTIONS
  -L, --level=debug|info|warn|error|fatal  [default: info] set the log level
  -h, --help                               show CLI help
```

_See code: [src/commands/logs.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/logs.ts)_

## `dendro query [QUERYSTRING]`

queries the database

```
USAGE
  $ dendro query [QUERYSTRING]

OPTIONS
  -L, --level=debug|info|warn|error|fatal  [default: info] set the log level
  -h, --help                               show CLI help
```

_See code: [src/commands/query.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/query.ts)_

## `dendro review [FILE]`

describe the command here

```
USAGE
  $ dendro review [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/review.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/review.ts)_

## `dendro start:server`

describe the command here

```
USAGE
  $ dendro start:server

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/start/server.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/start/server.ts)_
<!-- commandsstop -->
