import { get, set } from "./storage";

interface Holding {
  crypto: string;
  currency: string;
  amount: number;
  value?: number;
}

class HoldingsController {
  async addHolding(holding: Holding): Promise<void> {
    const holdings = (await get("cryptoHoldings")) || [];
    holdings.push(holding);

    await set("cryptoHoldings", holdings);
  }

  async removeHolding(holding): Promise<void> {
    const holdings = await get("cryptoHoldings");
    holdings.splice(holdings.indexOf(holding), 1);

    await set("cryptoHoldings", holdings);
  }

  async getHoldings(): Promise<any> {
    let holdings = await get("cryptoHoldings");

    if (holdings) {
      // Retrieve the price for each holding
      let requests = [];

      holdings.forEach(holding => {
        let request = this.fetchPrice(holding);
        requests.push(request);
      });

      try {
        let results = await Promise.all(requests);
        holdings.map((holding, index) => {
          holding.value = results[index].ticker.price;
        });

        return holdings;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }

  async fetchPrice(holding): Promise<any> {
    const response = await fetch(
      "https://api.cryptonator.com/api/ticker/" + holding.crypto + "-" + holding.currency
    );

    return await response.json();
  }
}

export const Holdings = new HoldingsController();