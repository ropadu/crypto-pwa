import { r as registerInstance, h } from './index-c8254b5f.js';
import { H as Holdings } from './holdings-d5d2e2c9.js';

const appAddHoldingCss = "ion-footer{padding:10px;font-size:0.7em;color:#474747;background-color:#f6f6f6}app-add-holding ion-item{background:#fff}";

const AppAddHolding = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async addHolding() {
    let holding = {
      crypto: this.cryptoCode,
      currency: this.displayCurrency,
      amount: this.amountHolding || 0
    };
    let result = await Holdings.fetchPrice(holding);
    console.log(result);
    if (result.success) {
      await Holdings.addHolding(holding);
    }
    const navCtrl = document.querySelector("ion-router");
    navCtrl.back();
  }
  changeValue(ev) {
    const value = ev.target.value;
    switch (ev.target.name) {
      case "cryptoCode": {
        this.cryptoCode = value;
        break;
      }
      case "displayCurrency": {
        this.displayCurrency = value;
      }
      case "amountHolding": {
        this.amountHolding = value;
      }
    }
  }
  render() {
    return [
      h("ion-header", null, h("ion-toolbar", { color: "primary" }, h("ion-buttons", { slot: "start" }, h("ion-back-button", { defaultHref: "/" })), h("ion-title", null, "Add Holding"))),
      h("ion-content", { class: "ion-padding" }, h("div", { class: "message" }, h("p", null, "To add a holding you will need to supply the appropriate symbol for the cryptocurrency, and the symbol for the currency you would like to display the values in."), h("p", null, h("strong", null, "Note:"), " Listed prices are estimated. Rates may vary significantly across different exchanges.")), h("ion-list", null, h("ion-item", null, h("ion-label", { position: "stacked" }, "Crypto Code"), h("ion-input", { name: "cryptoCode", onInput: ev => this.changeValue(ev), placeholder: "(e.g. BTC, LTC, ETH)", type: "text" })), h("ion-item", null, h("ion-label", { position: "stacked" }, "Display Currency Code"), h("ion-input", { onInput: ev => this.changeValue(ev), name: "displayCurrency", placeholder: "(e.g. USD, CAD, AUD)", type: "text" })), h("ion-item", null, h("ion-label", { position: "stacked" }, "Amount Holding"), h("ion-input", { onInput: ev => this.changeValue(ev), name: "amountHolding", type: "number" }))), h("ion-button", { expand: "full", onClick: () => this.addHolding() }, "Add Holding")),
      h("ion-footer", null, h("p", null, h("strong", null, "Note:"), " This web application allows you to track your Cryptocurrency without creating an account. This means that all data is stored locally, and may be permanently deleted without warning."))
    ];
  }
};
AppAddHolding.style = appAddHoldingCss;

export { AppAddHolding as app_add_holding };
