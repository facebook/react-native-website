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

const guides = [
  {label: 'Expo CLI Quickstart', value: 'quickstart'},
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
  getDevNotesTabs,
  guides,
  oses,
  packageManagers,
  platforms,
  syntax,
};
