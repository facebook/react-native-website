---
id: understanding-cli
title: Understanding the CLI
---

Though you may have installed the `react-native-cli` via npm as a separate module, it is a shell for accessing the CLI embedded in the React Native of each project. Your commands and their effects are dependent on the version of the module of `react-native` in context of the project. This guide will give a brief overview of the CLI in the module.

# The local CLI

React Native has a [`local-cli`](https://github.com/facebook/react-native/tree/master/local-cli) folder with a file named [`cliEntry.js`](https://github.com/facebook/react-native/blob/master/local-cli/cliEntry.js). Here, the commands are read from `commands.js` and added as possible CLI commands. _E.G._ the `react-native link` command, exists in the [`react-native/local-cli/link`](https://github.com/facebook/react-native/blob/master/local-cli/link/) folder, and is required in `commands.js`, which will register it as a documented command to be exposed to the CLI.

# Command definitions

At the end of each command entry is an export. The export is an object with a function to perform, description of the command, and the command name. The object structure for the `link` command looks like so:

```javascript
module.exports = {
  func: link,
  description: 'links all native dependencies',
  name: 'link [packageName]',
};
```

### Parameters

The command name identifies the parameters that a command would expect. When the command parameter is surrounded by greater-than, less-than symbols `< >`, this indicates that the parameter is expected. When a parameter is surrounded by brackets `[ ]`, this indicates that the parameter is optional.

### Getting a list of all CLI commands

Running `react-native --help` from inside a React Native project will list all of your current commands. Here is an example from version `0.56`:

```sh
  Usage: react-native [options] [command]

  Options:

    -V, --version                      output the version number
    -h, --help                         output usage information

  Commands:

    start [options]                    starts the webserver
    run-ios [options]                  builds your app and starts it on iOS simulator
    run-android [options]              builds your app and starts it on a connected Android emulator or device
    new-library [options]              generates a native library bridge
    bundle [options]                   builds the javascript bundle for offline use
    unbundle [options]                 builds javascript as "unbundle" for offline use
    eject [options]                    Re-create the iOS and Android folders and native code
    link [options] [packageName]       links all native dependencies (updates native build files)
    unlink [options] <packageName>     unlink native dependency
    install [options] <packageName>    install and link native dependencies
    uninstall [options] <packageName>  uninstall and unlink native dependencies
    upgrade [options]                  upgrade your app's template files to the latest version; run this after updating the react-native version in your package.json and running npm install
    log-android [options]              starts adb logcat
    log-ios [options]                  starts iOS device syslog tail
    dependencies [options]             lists dependencies
    info [options]                     Get relevant version info about OS, toolchain and libraries
```

### CLI Configs

When using `react-native start`, its platform derivatives, and `react-native bundle` you can use a file to define the CLI options used by React Native by default. If you create a file `rn-cli.config.js` in the root of your project, it will be evaluated and options for the commands will come from there.

You can see the options for the CLI config file inside the [source code for Metro here](https://github.com/facebook/metro/blob/master/packages/metro/src/Config.js), and here is a common `rn-cli.config.js` used for supporting TypeScript in React Native projects:

```js
module.exports = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  }
}
```
