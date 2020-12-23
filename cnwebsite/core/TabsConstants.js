import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const isMacOS = ExecutionEnvironment.canUseDOM
  ? navigator.platform.startsWith('Mac')
  : false;
const isWindows = ExecutionEnvironment.canUseDOM
  ? navigator.platform.startsWith('Win')
  : false;

const syntax = [
  {label: '函数式组件', value: 'functional'},
  {label: 'Class 组件', value: 'classical'},
];
const defaultSyntax = 'functional';

const packageManagers = [
  {label: 'npm', value: 'npm'},
  {label: 'Yarn', value: 'yarn'},
];
const defaultPackageManager = 'npm';

const guides = [
  {label: '完整原生环境', value: 'native'},
  {label: '简易沙盒环境', value: 'quickstart'},
];
const defaultGuide = 'native';

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
