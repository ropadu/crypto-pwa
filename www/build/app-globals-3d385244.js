import { i as ionicCoreGlobalScript } from './ionic-global-b9bb9178.js';

// import { setupConfig } from '@ionic/core';
const appGlobalScript = () => {
  // setupConfig({
  //   mode: 'ios'
  // });
};

const globalScripts = () => {
  appGlobalScript();
  ionicCoreGlobalScript();
};

export { globalScripts as g };
