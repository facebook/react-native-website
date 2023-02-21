/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const isMacOS = ExecutionEnvironment.canUseDOM
  ? navigator.platform.startsWith('Mac')
  : false;
const isWindows = ExecutionEnvironment.canUseDOM
  ? navigator.platform.startsWith('Win')
  : false;

const syntax = [
  {label: 'Function Component', value: 'functional'},
  {label: 'Class Component', value: 'classical'},
];
const defaultSyntax = 'functional';

const packageManagers = [
  {label: 'npm', value: 'npm'},
  {label: 'Yarn', value: 'yarn'},
];
const defaultPackageManager = 'npm';

const androidLanguages = [
  {label: 'Java', value: 'java'},
  {label: 'Kotlin', value: 'kotlin'},
];
const defaultAndroidLanguage = 'java';

const javaScriptSpecLanguages = [
  {label: 'TypeScript', value: 'typescript'},
  {label: 'Flow', value: 'flow'},
];
const defaultJavaScriptSpecLanguages = 'typescript';

const snackLanguages = [
  {label: 'TypeScript', value: 'typescript'},
  {label: 'JavaScript', value: 'javascript'},
];
const defaultSnackLanguage = 'typescript';

const guides = [
  {label: 'Expo Go Quickstart', value: 'quickstart'},
  {label: 'React Native CLI Quickstart', value: 'native'},
];
const defaultGuide = 'quickstart';

const platforms = [
  {label: 'Android', value: 'android'},
  {label: 'iOS', value: 'ios'},
];
const defaultPlatform = isMacOS ? 'ios' : 'android';

const oses = [
  {label: 'macOS', value: 'macos'},
  {label: 'Windows', value: 'windows'},
  {label: 'Linux', value: 'linux'},
];
const defaultOs = isMacOS ? 'macos' : isWindows ? 'windows' : 'linux';

const getDevNotesTabs = (tabs = ['android', 'ios', 'web', 'windows']) =>
  [
    tabs.includes('android') ? {label: 'Android', value: 'android'} : undefined,
    tabs.includes('ios') ? {label: 'iOS', value: 'ios'} : undefined,
    tabs.includes('web') ? {label: 'Web', value: 'web'} : undefined,
    tabs.includes('windows') ? {label: 'Windows', value: 'windows'} : undefined,
  ].filter(Boolean);

export default {
  defaultGuide,
  defaultOs,
  defaultPackageManager,
  defaultPlatform,
  defaultSyntax,
  defaultAndroidLanguage,
  defaultJavaScriptSpecLanguages,
  getDevNotesTabs,
  guides,
  oses,
  packageManagers,
  platforms,
  syntax,
  androidLanguages,
  javaScriptSpecLanguages,
  snackLanguages,
  defaultSnackLanguage,
};
