import { r as registerInstance, n as Build, h, j as Host, k as getElement } from './index-c8254b5f.js';
import { a as isPlatform, c as config, g as getIonMode } from './ionic-global-b9bb9178.js';

const appCss = "html.plt-mobile ion-app{user-select:none}html.plt-mobile ion-app [contenteditable]{user-select:text}ion-app.force-statusbar-padding{--ion-safe-area-top:20px}";

const App = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    if (Build.isBrowser) {
      rIC(async () => {
        const isHybrid = isPlatform(window, 'hybrid');
        if (!config.getBoolean('_testing')) {
          import('./tap-click-c8e4ed5f.js').then(module => module.startTapClick(config));
        }
        if (config.getBoolean('statusTap', isHybrid)) {
          import('./status-tap-b5090708.js').then(module => module.startStatusTap());
        }
        if (config.getBoolean('inputShims', needInputShims())) {
          import('./input-shims-03a6197c.js').then(module => module.startInputShims(config));
        }
        const hardwareBackButtonModule = await import('./hardware-back-button-508e48cf.js');
        if (config.getBoolean('hardwareBackButton', isHybrid)) {
          hardwareBackButtonModule.startHardwareBackButton();
        }
        else {
          hardwareBackButtonModule.blockHardwareBackButton();
        }
        if (typeof window !== 'undefined') {
          import('./keyboard-06906eac.js').then(module => module.startKeyboardAssist(window));
        }
        import('./focus-visible-abf04ce3.js').then(module => module.startFocusVisible());
      });
    }
  }
  render() {
    const mode = getIonMode(this);
    return (h(Host, { class: {
        [mode]: true,
        'ion-page': true,
        'force-statusbar-padding': config.getBoolean('_forceStatusbarPadding'),
      } }));
  }
  get el() { return getElement(this); }
};
const needInputShims = () => {
  return isPlatform(window, 'ios') && isPlatform(window, 'mobile');
};
const rIC = (callback) => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback);
  }
  else {
    setTimeout(callback, 32);
  }
};
App.style = appCss;

export { App as ion_app };
