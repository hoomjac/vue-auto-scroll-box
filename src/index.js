import AutoScrollBox from './components/AutoScrollBox';
import { version } from '../package.json';

export function install(Vue) {
  if (install.installed) return;
  install.installed = true;

  Vue.component('AutoScrollBox', AutoScrollBox);
}

const VPlugin = {
  install,
  version,
  AutoScrollBox,
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(VPlugin);
}

export default VPlugin;
export { AutoScrollBox };
