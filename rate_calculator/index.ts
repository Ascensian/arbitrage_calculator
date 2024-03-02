import * as func_arbitrage from "./func_arbitrage";
import axios from "axios";

// Set Variables

const structured_pairs_url: string = "https://notreapi.com/s_p";
const prices_url: string = "https://notreapi.com/prices";
let structured_pairs: any[];

async function step_0(): Promise<void> {
  try {
    const response = await axios.get(structured_pairs_url);
    if (response.status === 200) {
      structured_pairs = response.data;
      console.log("Structured pairs:", structured_pairs);
    } else {
      throw new Error("Failed to fetch structured pairs");
    }
  } catch (error: any) {
    console.error("Error fetching structured pairs:", error.message);
  }
}

// step_0 for stuctured pairs
//step_0();

async function step_1(): Promise<void> {
  // Get Latest Surface Prices
  //const prices_json = func_arbitrage.getCoinTickers(prices_url);
  async function extractData(): Promise<any> {
    try {
      const response = await axios.get(
        "https://api.poloniex.com/markets/ticker24h"
      );

      const result: any = {};

      response.data.forEach((element: any) => {
        const { symbol, ask, bid } = element;

        result[symbol] = {
          lowestAsk: ask,
          highestBid: bid,
        };
      });

      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      return null;
    }
  }
  const prices_json = await extractData();
  //console.log("prices_json =", prices_json);

  for (const t_pair of structured_pairs) {
    const prices_dict = func_arbitrage.getPriceForTPair(t_pair, prices_json);
    const surface_arb = func_arbitrage.calcTriangularArbSurfaceRate(
      t_pair,
      prices_dict
    );
    //console.log("surfacearb1", surface_arb);

    if (Object.keys(surface_arb).length > 0) {
      //console.log("surfacearb2", surface_arb);
      //console.log("surfacedict>0");

      const real_rate_arb = await func_arbitrage.getDepthFromOrderbook(
        surface_arb
      );
      console.log("real rate", real_rate_arb);
    }
  }
}

if (require.main === module) {
  // const coin_list = step_0();
  // step_1(coin_list);

  step_1();
  setInterval(step_1, 170);
}
