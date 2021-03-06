import { r as registerInstance, h } from './index-c8254b5f.js';

const appRootCss = "";

const AppRoot = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("ion-app", null, h("ion-router", { useHash: false }, h("ion-route", { url: "/", component: "app-home" }), h("ion-route", { url: "/add-holding", component: "app-add-holding" })), h("ion-nav", null)));
  }
};
AppRoot.style = appRootCss;

export { AppRoot as app_root };
