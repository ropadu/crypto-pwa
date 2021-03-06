import { Component, State, h } from "@stencil/core";
import { Holdings } from "../../services/holdings";

interface Holding {
  crypto: string;
  currency: string;
  amount: number;
  value?: number;
}

@Component({
  tag: "app-home",
  styleUrl: "app-home.css"
})
export class AppHome {
  @State() holdings: Holding[] = [];

  componentDidLoad() {
    const router = document.querySelector("ion-router");

    // Refresh data every time view is entered
    router.addEventListener("ionRouteDidChange", async () => {
      const holdings = await Holdings.getHoldings();
      this.holdings = [...holdings];
    });
  }

  renderWelcomeMessage() {
    return (
      <div>
        {!this.holdings.length ? (
          <div class="message">
            <p>
              <strong>cryptoPWA</strong> is a <strong>P</strong>rogressive <strong>W</strong>eb{" "}
              <strong>A</strong>pplication that allows you to keep track of the approximate worth of
              your cryptocurency portfolio.
            </p>

            <p>
              A PWA is like a normal application from the app store, but you can access it directly
              through the web. You may also add this page to your home screen to launch it like your
              other applications.
            </p>

            <p>
              No account required, just hit the button below to start tracking your coins in
              whatever currency you wish!
            </p>

            <ion-button href="/add-holding" color="primary">
              Add Coins
            </ion-button>
          </div>
        ) : null}
      </div>
    );
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>cryptoPWA</ion-title>
          <ion-buttons slot="end">
            <ion-button href="/add-holding" routerDirection="forward">
              <ion-icon slot="icon-only" name="add"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        {this.renderWelcomeMessage()}
        <ion-list lines="none">
          {this.holdings.map(holding => (
            <ion-item-sliding>
              <ion-item class="holding">
                <ion-label>
                  <p>
                    <strong>
                      {holding.crypto}/{holding.currency}
                    </strong>
                  </p>
                  <p class="amount">
                    <strong>Coins:</strong> {holding.amount} <strong>Value:</strong> {holding.value}
                  </p>
                  <p class="value">{holding.amount * holding.value}</p>
                </ion-label>
              </ion-item>

              <ion-item-options>
                <ion-item-option color="danger">
                  <ion-icon slot="icon-only" name="trash"></ion-icon>
                </ion-item-option>
              </ion-item-options>
            </ion-item-sliding>
          ))}
        </ion-list>
      </ion-content>,

      <ion-footer>
        <p>
          <strong>Disclaimer:</strong> Do not use this application to make investment decisions.
          Displayed prices may not reflect actual prices.
        </p>
      </ion-footer>
    ];
  }
}