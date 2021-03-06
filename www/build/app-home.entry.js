import { r as registerInstance, h } from './index-c8254b5f.js';
import { H as Holdings } from './holdings-d5d2e2c9.js';

const appHomeCss = "ion-footer{padding:10px;font-size:0.7em;color:#474747;background-color:#f6f6f6}ion-item-sliding{margin-top:10px}ion-item{background-color:#f6f6f6;text-transform:uppercase;padding:10px}.amount{font-size:0.7em}.value{margin-top:10px;font-size:1.2em;color:#32db64}";

const AppHome = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.holdings = [];
  }
  componentDidLoad() {
    const router = document.querySelector("ion-router");
    // Refresh data every time view is entered
    router.addEventListener("ionRouteDidChange", async () => {
      const holdings = await Holdings.getHoldings();
      this.holdings = [...holdings];
    });
  }
  renderWelcomeMessage() {
    return (h("div", null, !this.holdings.length ? (h("div", { class: "message" }, h("p", null, h("strong", null, "cryptoPWA"), " is a ", h("strong", null, "P"), "rogressive ", h("strong", null, "W"), "eb", " ", h("strong", null, "A"), "pplication that allows you to keep track of the approximate worth of your cryptocurency portfolio."), h("p", null, "A PWA is like a normal application from the app store, but you can access it directly through the web. You may also add this page to your home screen to launch it like your other applications."), h("p", null, "No account required, just hit the button below to start tracking your coins in whatever currency you wish!"), h("ion-button", { href: "/add-holding", color: "primary" }, "Add Coins"))) : null));
  }
  render() {
    return [
      h("ion-header", null, h("ion-toolbar", { color: "primary" }, h("ion-title", null, "cryptoPWA"), h("ion-buttons", { slot: "end" }, h("ion-button", { href: "/add-holding", routerDirection: "forward" }, h("ion-icon", { slot: "icon-only", name: "add" }))))),
      h("ion-content", { class: "ion-padding" }, this.renderWelcomeMessage(), h("ion-list", { lines: "none" }, this.holdings.map(holding => (h("ion-item-sliding", null, h("ion-item", { class: "holding" }, h("ion-label", null, h("p", null, h("strong", null, holding.crypto, "/", holding.currency)), h("p", { class: "amount" }, h("strong", null, "Coins:"), " ", holding.amount, " ", h("strong", null, "Value:"), " ", holding.value), h("p", { class: "value" }, holding.amount * holding.value))), h("ion-item-options", null, h("ion-item-option", { color: "danger" }, h("ion-icon", { slot: "icon-only", name: "trash" })))))))),
      h("ion-footer", null, h("p", null, h("strong", null, "Disclaimer:"), " Do not use this application to make investment decisions. Displayed prices may not reflect actual prices."))
    ];
  }
};
AppHome.style = appHomeCss;

export { AppHome as app_home };
