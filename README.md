<h1 align="center"><img src="https://raw.githubusercontent.com/eko/monday/master/misc/logo.jpg" title="Monday: dev tool for local app and port-forwarding" alt="Monday: dev tool for local app and port-forwarding"></h1>

[![TravisBuildStatus](https://api.travis-ci.org/eko/monday-app.svg?branch=master)](https://travis-ci.org/eko/monday-app)

This is a GUI built with ElectronJS for the [Monday](https://github.com/eko/monday) project.

## What Monday can do for you?
✅ Define a unified way to setup applications for all your developers

✅ Run your local applications

✅ Hot reload your applications automatically when a change is made locally

✅ Port-forward an application locally using a remote one on Kubernetes (targeting a pod via label) or over SSH

✅ Forward traffic of a remote application over Kubernetes, SSH or TCP locally (see example forward types)

✅ Auto reconnect when a port-forward connection is lost

✅ Forward multiple times the same port locally, using an hostname

## Overview

// Screenshots

## Installation

### Download binary

You can download the latest version of the binary built for your architecture here:

* Architecture **i386** [
    [Darwin](https://github.com/eko/monday/releases/latest/download/monday-darwin-386) /
    [Linux](https://github.com/eko/monday/releases/latest/download/monday-linux-386)
]
* Architecture **amd64** [
    [Darwin](https://github.com/eko/monday/releases/latest/download/monday-darwin-amd64) /
    [Linux](https://github.com/eko/monday/releases/latest/download/monday-linux-amd64)
]
* Architecture **arm** [
    [Linux](https://github.com/eko/it/releases/latest/download/monday-linux-arm)
]

## Development

### Package the application

```
npm run package
```
or
```
yarn package
```

### Run the app (dev)

```
npm run start
```
or
```
yarn start
```

### Run the app on production mode
```
npm run prod
```
```
yarn prod
```

## Code of Conduct

[Contributor Code of Conduct](code-of-conduct.md). By participating in this project you agree to abide by its terms.

## Community

You can [join the community Slack space](https://join.slack.com/t/mondaytool/shared_invite/enQtNzE3NDAxNzIxNTQyLTBmNGU5YzAwNjRjY2IxY2MwZmM5Njg5N2EwY2NjYzEwZWExNWYyYTlmMzg5ZTBjNDRiOTUwYzM3ZDBhZTllOGM) to discuss about your issues, new features or anything else regarding Monday.
