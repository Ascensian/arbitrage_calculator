import axios from "axios";

export interface TPair {
  pair_a: string;
  pair_b: string;
  pair_c: string;
  a_base: string;
  a_quote: string;
  b_base: string;
  b_quote: string;
  c_base: string;
  c_quote: string;
  triangular_pair: string;
}

export interface PricesJson {
  [key: string]: {
    lowestAsk: string;
    highestBid: string;
  };
}

interface PricesDict {
  pair_a_ask: number;
  pair_a_bid: number;
  pair_b_ask: number;
  pair_b_bid: number;
  pair_c_ask: number;
  pair_c_bid: number;
}

interface SurfaceDict {
  swap_1: string;
  swap_2: string;
  swap_3: string;
  contract_1: string;
  contract_2: string;
  contract_3: string;
  direction_trade_1: string;
  direction_trade_2: string;
  direction_trade_3: string;
  starting_amount: number;
  acquired_coin_t1: number;
  acquired_coin_t2: number;
  acquired_coin_t3: number;
  swap_1_rate: number;
  swap_2_rate: number;
  swap_3_rate: number;
  profit_loss: number;
  profit_loss_perc: number;
  direction: string;
  trade_description_1: string;
  trade_description_2: string;
  trade_description_3: string;
}

export interface DepthInfo {
  profit_loss: number;
  acquired_coin_t3: number;
  starting_amount: number;
  real_rate_perc: number;
  contract_1: string;
  contract_2: string;
  contract_3: string;
  contract_1_direction: string;
  contract_2_direction: string;
  contract_3_direction: string;
  trade_description_1: string;
  trade_description_2: string;
  trade_description_3: string;
}

interface DepthPrices {
  asks: string[];
  bids: string[];
}

export async function get(url: string): Promise<any> {
  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get");
    }
  } catch (error: any) {
    console.error("Error fetching :", error.message);
  }
}

export function getPriceForTPair(
  tPair: TPair,
  pricesJson: PricesJson
): PricesDict {
  // Extract Pair Info
  const pair_a: string = tPair["pair_a"];
  const pair_b: string = tPair["pair_b"];
  const pair_c: string = tPair["pair_c"];

  // Extract Price Information for Given Pairs
  const pair_a_ask: number = parseFloat(pricesJson[pair_a]["lowestAsk"]);
  const pair_a_bid: number = parseFloat(pricesJson[pair_a]["highestBid"]);
  const pair_b_ask: number = parseFloat(pricesJson[pair_b]["lowestAsk"]);
  const pair_b_bid: number = parseFloat(pricesJson[pair_b]["highestBid"]);
  const pair_c_ask: number = parseFloat(pricesJson[pair_c]["lowestAsk"]);
  const pair_c_bid: number = parseFloat(pricesJson[pair_c]["highestBid"]);

  // Output Object
  return {
    pair_a_ask: pair_a_ask,
    pair_a_bid: pair_a_bid,
    pair_b_ask: pair_b_ask,
    pair_b_bid: pair_b_bid,
    pair_c_ask: pair_c_ask,
    pair_c_bid: pair_c_bid,
  };
}

export function calcTriangularArbSurfaceRate(
  tPair: TPair,
  pricesDict: PricesDict
): SurfaceDict {
  // Set Variables
  const startingAmount: number = 1;
  const minSurfaceRate: number = 0;
  let surfaceDict: any = {};
  let contract2: string = "";
  let contract3: string = "";
  let directionTrade1: string = "";
  let directionTrade2: string = "";
  let directionTrade3: string = "";
  let acquiredCoinT2: number = 0;
  let acquiredCoinT3: number = 0;
  let calculated: number = 0;

  // Extract Pair Variables
  const aBase: string = tPair["a_base"];
  const aQuote: string = tPair["a_quote"];
  const bBase: string = tPair["b_base"];
  const bQuote: string = tPair["b_quote"];
  const cBase: string = tPair["c_base"];
  const cQuote: string = tPair["c_quote"];
  const pairA: string = tPair["pair_a"];
  const pairB: string = tPair["pair_b"];
  const pairC: string = tPair["pair_c"];

  // Extract Price Information
  const aAsk: number = pricesDict["pair_a_ask"];
  const aBid: number = pricesDict["pair_a_bid"];
  const bAsk: number = pricesDict["pair_b_ask"];
  const bBid: number = pricesDict["pair_b_bid"];
  const cAsk: number = pricesDict["pair_c_ask"];
  const cBid: number = pricesDict["pair_c_bid"];

  // Set directions and loop through
  const directionList: string[] = ["forward", "reverse"];
  for (const direction of directionList) {
    // Set additional variables for swap information
    let swap1: string = "";
    let swap2: string = "";
    let swap3: string = "";
    let swap1Rate: number = 0;
    let swap2Rate: number = 0;
    let swap3Rate: number = 0;

    // Assume starting with a_base and swapping for a_quote
    if (direction === "forward") {
      swap1 = aBase;
      swap2 = aQuote;
      swap1Rate = 1 / aAsk;
      directionTrade1 = "base_to_quote";
    }
    // Assume starting with a_base and swapping for a_quote
    if (direction === "reverse") {
      swap1 = aQuote;
      swap2 = aBase;
      swap1Rate = aBid;
      directionTrade1 = "quote_to_base";
    }

    // Place first trade
    const contract1: string = pairA;
    const acquiredCoinT1: number = startingAmount * swap1Rate;

    /*  FORWARD */
    // SCENARIO 1 Check if a_quote (acquired_coin) matches b_quote
    if (direction === "forward") {
      if (aQuote === bQuote && calculated === 0) {
        swap2Rate = bBid;
        acquiredCoinT2 = acquiredCoinT1 * swap2Rate;
        directionTrade2 = "quote_to_base";
        contract2 = pairB;

        // If b_base (acquired coin) matches c_base
        if (bBase === cBase) {
          swap3 = cBase;
          swap3Rate = 1 / cAsk;
          directionTrade3 = "base_to_quote";
          contract3 = pairC;
        }
        // If b_base (acquired coin) matches c_quote
        if (bBase === cQuote) {
          swap3 = cQuote;
          swap3Rate = cBid;
          directionTrade3 = "quote_to_base";
          contract3 = pairC;
        }

        acquiredCoinT3 = acquiredCoinT2 * swap3Rate;
        calculated = 1;
      }
    }
    // SCENARIO 2 Check if a_quote (acquired_coin) matches b_base
    if (direction === "forward") {
      if (aQuote === bBase && calculated === 0) {
        swap2Rate = 1 / bAsk;
        acquiredCoinT2 = acquiredCoinT1 * swap2Rate;
        directionTrade2 = "base_to_quote";
        contract2 = pairB;

        // If b_quote (acquired coin) matches c_base
        if (bQuote === cBase) {
          swap3 = cBase;
          swap3Rate = 1 / cAsk;
          directionTrade3 = "base_to_quote";
          contract3 = pairC;
        }

        // If b_quote (acquired coin) matches c_quote
        if (bQuote === cQuote) {
          swap3 = cQuote;
          swap3Rate = cBid;
          directionTrade3 = "quote_to_base";
          contract3 = pairC;
        }

        acquiredCoinT3 = acquiredCoinT2 * swap3Rate;

        calculated = 1;
      }
    }

    // SCENARIO 3 Check if a_quote (acquired_coin) matches c_quote
    if (direction === "forward") {
      if (aQuote === cQuote && calculated === 0) {
        swap2Rate = cBid;
        acquiredCoinT2 = acquiredCoinT1 * swap2Rate;
        directionTrade2 = "quote_to_base";
        contract2 = pairC;

        // If c_base (acquired coin) matches b_base
        if (cBase === bBase) {
          swap3 = bBase;
          swap3Rate = 1 / bAsk;
          directionTrade3 = "base_to_quote";
          contract3 = pairB;
        }

        // If c_base (acquired coin) matches b_quote
        if (cBase === bQuote) {
          swap3 = bQuote;
          swap3Rate = bBid;
          directionTrade3 = "quote_to_base";
          contract3 = pairB;
        }

        acquiredCoinT3 = acquiredCoinT2 * swap3Rate;
        calculated = 1;
      }
    }

    // SCENARIO 4 Check if a_quote (acquired_coin) matches c_base
    if (direction === "forward") {
      if (aQuote === cBase && calculated === 0) {
        swap2Rate = 1 / cAsk;
        acquiredCoinT2 = acquiredCoinT1 * swap2Rate;
        directionTrade2 = "base_to_quote";
        contract2 = pairC;

        // If c_quote (acquired coin) matches b_base
        if (cQuote === bBase) {
          swap3 = bBase;
          swap3Rate = 1 / bAsk;
          directionTrade3 = "base_to_quote";
          contract3 = pairB;
        }

        // If c_quote (acquired coin) matches b_quote
        if (cQuote === bQuote) {
          swap3 = bQuote;
          swap3Rate = bBid;
          directionTrade3 = "quote_to_base";
          contract3 = pairB;
        }

        acquiredCoinT3 = acquiredCoinT2 * swap3Rate;
        calculated = 1;
      }
    }
    /*  REVERSE */
    // SCENARIO 1 Check if a_base (acquired_coin) matches b_quote
    if (direction === "reverse") {
      if (aBase === bQuote && calculated === 0) {
        swap2Rate = bBid;
        acquiredCoinT2 = acquiredCoinT1 * swap2Rate;
        directionTrade2 = "quote_to_base";
        contract2 = pairB;

        // If b_base (acquired coin) matches c_base
        if (bBase === cBase) {
          swap3 = cBase;
          swap3Rate = 1 / cAsk;
          directionTrade3 = "base_to_quote";
          contract3 = pairC;
        }

        // If b_base (acquired coin) matches c_quote
        if (bBase === cQuote) {
          swap3 = cQuote;
          swap3Rate = cBid;
          directionTrade3 = "quote_to_base";
          contract3 = pairC;
        }

        acquiredCoinT3 = acquiredCoinT2 * swap3Rate;
        calculated = 1;
      }
    }
    // SCENARIO 2 Check if a_base (acquired_coin) matches b_base
    if (direction === "reverse") {
      if (aBase === bBase && calculated === 0) {
        swap2Rate = 1 / bAsk;
        acquiredCoinT2 = acquiredCoinT1 * swap2Rate;
        directionTrade2 = "base_to_quote";
        contract2 = pairB;

        // If b_quote (acquired coin) matches c_base
        if (bQuote === cBase) {
          swap3 = cBase;
          swap3Rate = 1 / cAsk;
          directionTrade3 = "base_to_quote";
          contract3 = pairC;
        }

        // If b_quote (acquired coin) matches c_quote
        if (bQuote === cQuote) {
          swap3 = cQuote;
          swap3Rate = cBid;
          directionTrade3 = "quote_to_base";
          contract3 = pairC;
        }

        acquiredCoinT3 = acquiredCoinT2 * swap3Rate;
        calculated = 1;
      }
    }
    // SCENARIO 3 Check if a_base (acquired_coin) matches c_quote
    if (direction === "reverse") {
      if (aBase === cQuote && calculated === 0) {
        swap2Rate = cBid;
        acquiredCoinT2 = acquiredCoinT1 * swap2Rate;
        directionTrade2 = "quote_to_base";
        contract2 = pairC;

        // If c_base (acquired coin) matches b_base
        if (cBase === bBase) {
          swap3 = bBase;
          swap3Rate = 1 / bAsk;
          directionTrade3 = "base_to_quote";
          contract3 = pairB;
        }

        // If c_base (acquired coin) matches b_quote
        if (cBase === bQuote) {
          swap3 = bQuote;
          swap3Rate = bBid;
          directionTrade3 = "quote_to_base";
          contract3 = pairB;
        }

        acquiredCoinT3 = acquiredCoinT2 * swap3Rate;
        calculated = 1;
      }
    }

    // SCENARIO 4 Check if a_base (acquired_coin) matches c_base
    if (direction === "reverse") {
      if (aBase === cBase && calculated === 0) {
        swap2Rate = 1 / cAsk;
        acquiredCoinT2 = acquiredCoinT1 * swap2Rate;
        directionTrade2 = "base_to_quote";
        contract2 = pairC;

        // If c_quote (acquired coin) matches b_base
        if (cQuote === bBase) {
          swap3 = bBase;
          swap3Rate = 1 / bAsk;
          directionTrade3 = "base_to_quote";
          contract3 = pairB;
        }

        // If c_quote (acquired coin) matches b_quote
        if (cQuote === bQuote) {
          swap3 = bQuote;
          swap3Rate = bBid;
          directionTrade3 = "quote_to_base";
          contract3 = pairB;
        }

        acquiredCoinT3 = acquiredCoinT2 * swap3Rate;
        calculated = 1;
      }
    }

    /* PROFIT LOSS OUTPUT */

    // Profit and Loss Calculations
    const profitLoss: number = acquiredCoinT3 - startingAmount;

    const profitLossPerc: number =
      startingAmount !== 0 ? (profitLoss / startingAmount) * 100 : 0;

    // Trade Descriptions
    const tradeDescription1: string = `Start with ${swap1} of ${startingAmount}. Swap at ${swap1Rate} for ${swap2} acquiring ${acquiredCoinT1}.`;
    const tradeDescription2: string = `Swap ${acquiredCoinT1} of ${swap2} at ${swap2Rate} for ${swap3} acquiring ${acquiredCoinT2}.`;
    const tradeDescription3: string = `Swap ${acquiredCoinT2} of ${swap3} at ${swap3Rate} for ${swap1} acquiring ${acquiredCoinT3}.`;

    /* Output Results */
    if (profitLossPerc > minSurfaceRate) {
      surfaceDict = {
        swap_1: swap1,
        swap_2: swap2,
        swap_3: swap3,
        contract_1: contract1,
        contract_2: contract2,
        contract_3: contract3,
        direction_trade_1: directionTrade1,
        direction_trade_2: directionTrade2,
        direction_trade_3: directionTrade3,
        starting_amount: startingAmount,
        acquired_coin_t1: acquiredCoinT1,
        acquired_coin_t2: acquiredCoinT2,
        acquired_coin_t3: acquiredCoinT3,
        swap_1_rate: swap1Rate,
        swap_2_rate: swap2Rate,
        swap_3_rate: swap3Rate,
        profit_loss: profitLoss,
        profit_loss_perc: profitLossPerc,
        direction: direction,
        trade_description_1: tradeDescription1,
        trade_description_2: tradeDescription2,
        trade_description_3: tradeDescription3,
      };
    }
  }

  return surfaceDict;
}

function reformattedOrderbook(
  prices: DepthPrices,
  cDirection: string
): number[][] {
  const priceListMain: number[][] = [];
  if (cDirection === "base_to_quote") {
    for (let i = 0; i < prices.asks.length; i += 2) {
      const askPrice: number = parseFloat(prices.asks[i]);
      const adjQuantity: number = parseFloat(prices.asks[i + 1]);
      const adjPrice: number = askPrice !== 0 ? 1 / askPrice : 0;
      priceListMain.push([adjPrice, adjQuantity]);
    }
  } else if (cDirection === "quote_to_base") {
    for (let i = 0; i < prices.bids.length; i += 2) {
      const bidPrice: number = parseFloat(prices.bids[i]);
      const adjPrice: number = bidPrice !== 0 ? bidPrice : 0;
      const adjQuantity: number = parseFloat(prices.bids[i + 1]);
      priceListMain.push([adjPrice, adjQuantity]);
    }
  }
  return priceListMain;
}

function calculateAcquiredCoin(
  amountIn: number,
  orderbook: number[][]
): number {
  let tradingBalance: number = amountIn;
  let quantityBought: number = 0;
  let acquiredCoin: number = 0;
  let counts: number = 0;

  for (const level of orderbook) {
    const levelPrice: number = level[0];
    const levelAvailableQuantity: number = level[1];

    if (tradingBalance <= levelAvailableQuantity) {
      quantityBought = tradingBalance;
      tradingBalance = 0;
    } else {
      quantityBought = levelAvailableQuantity;
      tradingBalance -= quantityBought;
    }

    const amountBought: number = quantityBought * levelPrice;
    acquiredCoin += amountBought;

    if (tradingBalance === 0) {
      return acquiredCoin;
    }

    counts++;

    if (counts === orderbook.length) {
      return 0;
    }
  }

  return acquiredCoin;
}

export async function getDepthFromOrderbook(
  surfaceDict: SurfaceDict
): Promise<DepthInfo | { "realRatePerc < -1": string }> {
  const swap1: string = surfaceDict.swap_1;

  let startingAmount: number = 100;
  const startingAmountDict: { [key: string]: number } = {
    USDT: 100,
    USDC: 100,
    BTC: 0.05,
    ETH: 0.1,
  };
  if (swap1 in startingAmountDict) {
    startingAmount = startingAmountDict[swap1];
  }

  const contract1: string = surfaceDict.contract_1;
  const contract2: string = surfaceDict.contract_2;
  const contract3: string = surfaceDict.contract_3;

  const contract1Direction: string = surfaceDict.direction_trade_1;
  const contract2Direction: string = surfaceDict.direction_trade_2;
  const contract3Direction: string = surfaceDict.direction_trade_3;

  const tradeDescription1: string = surfaceDict.trade_description_1;
  const tradeDescription2: string = surfaceDict.trade_description_2;
  const tradeDescription3: string = surfaceDict.trade_description_3;

  const depth1Prices = await get(
    `https://api.poloniex.com/markets/${contract1}/orderBook?limit=20`
  );

  const depth1ReformattedPrices = reformattedOrderbook(
    depth1Prices,
    contract1Direction
  );

  const depth2Prices = await get(
    `https://api.poloniex.com/markets/${contract2}/orderBook?limit=20`
  );
  const depth2ReformattedPrices = reformattedOrderbook(
    depth2Prices,
    contract2Direction
  );

  const depth3Prices = await get(
    `https://api.poloniex.com/markets/${contract3}/orderBook?limit=20`
  );
  const depth3ReformattedPrices = reformattedOrderbook(
    depth3Prices,
    contract3Direction
  );

  const acquiredCoinT1 = calculateAcquiredCoin(
    startingAmount,
    depth1ReformattedPrices
  );
  const acquiredCoinT2 = calculateAcquiredCoin(
    acquiredCoinT1,
    depth2ReformattedPrices
  );
  const acquiredCoinT3 = calculateAcquiredCoin(
    acquiredCoinT2,
    depth3ReformattedPrices
  );

  const profitLoss = acquiredCoinT3 - startingAmount;
  const realRatePerc =
    startingAmount !== 0 ? (profitLoss / startingAmount) * 100 : 0;

  console.log("realRatePerc", realRatePerc);
  if (realRatePerc > -1) {
    console.log("if (realRatePerc > -1)");
    return {
      profit_loss: profitLoss,
      acquired_coin_t3: acquiredCoinT3,
      starting_amount: startingAmount,
      real_rate_perc: realRatePerc,
      contract_1: contract1,
      contract_2: contract2,
      contract_3: contract3,
      contract_1_direction: contract1Direction,
      contract_2_direction: contract2Direction,
      contract_3_direction: contract3Direction,
      trade_description_1: tradeDescription1,
      trade_description_2: tradeDescription2,
      trade_description_3: tradeDescription3,
    };
  } else {
    return { "realRatePerc < -1": "realRatePerc < -1" };
  }
}
