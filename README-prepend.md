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
