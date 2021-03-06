import { Component, h } from "@stencil/core";
import { Holdings } from "../../services/holdings";

@Component({
  tag: "app-add-holding",
  styleUrl: "app-add-holding.css"
})
export class AppAddHolding {
  private cryptoCode: string;
  private displayCurrency: string;
  private amountHolding: number;

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
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>Add Holding</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <div class="message">
          <p>
            To add a holding you will need to supply the appropriate symbol for the cryptocurrency,
            and the symbol for the currency you would like to display the values in.
          </p>

          <p>
            <strong>Note:</strong> Listed prices are estimated. Rates may vary significantly across
            different exchanges.
          </p>
        </div>

        <ion-list>
          <ion-item>
            <ion-label position="stacked">Crypto Code</ion-label>
            <ion-input
              name="cryptoCode"
              onInput={ev => this.changeValue(ev)}
              placeholder="(e.g. BTC, LTC, ETH)"
              type="text"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Display Currency Code</ion-label>
            <ion-input
              onInput={ev => this.changeValue(ev)}
              name="displayCurrency"
              placeholder="(e.g. USD, CAD, AUD)"
              type="text"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Amount Holding</ion-label>
            <ion-input
              onInput={ev => this.changeValue(ev)}
              name="amountHolding"
              type="number"
            ></ion-input>
          </ion-item>
        </ion-list>

        <ion-button expand="full" onClick={() => this.addHolding()}>
          Add Holding
        </ion-button>
      </ion-content>,

      <ion-footer>
        <p>
          <strong>Note:</strong> This web application allows you to track your Cryptocurrency
          without creating an account. This means that all data is stored locally, and may be
          permanently deleted without warning.
        </p>
      </ion-footer>
    ];
  }
}