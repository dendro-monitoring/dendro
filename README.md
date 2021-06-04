Dendro
==========

Bundled CLI and exploration platform/server for Dendro

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dendro-cli.svg)](https://npmjs.org/package/dendro-cli)
[![Downloads/week](https://img.shields.io/npm/dw/dendro-cli.svg)](https://npmjs.org/package/dendro-cli)
[![License](https://img.shields.io/npm/l/dendro-cli.svg)](https://github.com/dendro-monitoring/dendro/blob/main/package.json)

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
dendro-cli/0.0.11 darwin-x64 node-v12.18.1
$ dendro --help [COMMAND]
USAGE
  $ dendro COMMAND
...
```
<!-- usagestop -->
## Getting started

To get started, install Dendro using:

```console
$ npm i -g dendro-cli
```

Then run `dendro configure` to select which services you want to monitor. Here you will be prompted to input any neccessary credentials.

To deploy the AWS cloud pipeline, run:

```console
$ dendro deploy
```

Lets now verify our deployment using:

```console
$ dendro list
```

Next, you need to install our log and metric collector Vector. We've provided a command to help you do this:

```console
$ dendro install-vector
```

Now, lets begin sending off logs and metrics to the pipeline using:

```console
$ ./vector --config=./vector-config.toml
```

Now that we have data being processed by the pipeline and being stored into the database, let's now visualize it. Run `dendro start:server` and point your browser to http://localhost:3000/

And finally to clean up, run:

```console
$ dendro teardown
```
# Commands
<!-- commands -->
* [`dendro clean`](#dendro-clean)
* [`dendro configure`](#dendro-configure)
* [`dendro deploy`](#dendro-deploy)
* [`dendro help [COMMAND]`](#dendro-help-command)
* [`dendro install-vector`](#dendro-install-vector)
* [`dendro list`](#dendro-list)
* [`dendro review [FILE]`](#dendro-review-file)
* [`dendro start:server`](#dendro-startserver)
* [`dendro teardown`](#dendro-teardown)
* [`dendro update`](#dendro-update)

## `dendro clean`

Removes the existing cache from disk

```
USAGE
  $ dendro clean

OPTIONS
  -L, --level=debug|info|warn|error|fatal  [default: info] set the log level
  -h, --help                               show CLI help
```

_See code: [src/commands/clean.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/clean.ts)_

## `dendro configure`

Configure Vector to monitor services and log sources

```
USAGE
  $ dendro configure

OPTIONS
  -L, --level=debug|info|warn|error|fatal  [default: info] set the log level
  -h, --help                               show CLI help
```

_See code: [src/commands/configure.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/configure.ts)_

## `dendro deploy`

Deploy the dendro logging pipeline on AWS. Run [33m[1mconfigure[22m[39m prior to this command otherwise database tables will not be set

```
USAGE
  $ dendro deploy

OPTIONS
  -L, --level=debug|info|warn|error|fatal  [default: info] set the log level
  -h, --help                               show CLI help
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

## `dendro install-vector`

Install Vector to collect and ship logs and metrics

```
USAGE
  $ dendro install-vector
```

_See code: [src/commands/install-vector.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/install-vector.ts)_

## `dendro list`

List existing AWS resources

```
USAGE
  $ dendro list

OPTIONS
  -L, --level=debug|info|warn|error|fatal  [default: info] set the log level
  -h, --help                               show CLI help
```

_See code: [src/commands/list.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/list.ts)_

## `dendro review [FILE]`

Pretty print the Vector config of monitored services

```
USAGE
  $ dendro review [FILE]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/review.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/review.ts)_

## `dendro start:server`

Start dendro's dashboard for viewing live metrics

```
USAGE
  $ dendro start:server

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/start/server.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/start/server.ts)_

## `dendro teardown`

Permanently deletes the logging pipeline deployed on AWS

```
USAGE
  $ dendro teardown

OPTIONS
  -L, --level=debug|info|warn|error|fatal  [default: info] set the log level
  -h, --help                               show CLI help
```

_See code: [src/commands/teardown.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/teardown.ts)_

## `dendro update`

Creates any new Timestream tables as neccessary

```
USAGE
  $ dendro update
```

_See code: [src/commands/update.ts](https://github.com/dendro-naap/dendro-cli/blob/v0.0.11/src/commands/update.ts)_
<!-- commandsstop -->
