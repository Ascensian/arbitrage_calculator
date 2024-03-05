"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepthFromOrderbook = exports.calcTriangularArbSurfaceRate = exports.getPriceForTPair = exports.get = void 0;
var axios_1 = __importDefault(require("axios"));
function get(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    response = _a.sent();
                    if (response.status === 200) {
                        return [2 /*return*/, response.data];
                    }
                    else {
                        throw new Error("Failed to get");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching :", error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.get = get;
function getPriceForTPair(tPair, pricesJson) {
    // Extract Pair Info
    var pair_a = tPair["pair_a"];
    var pair_b = tPair["pair_b"];
    var pair_c = tPair["pair_c"];
    // Extract Price Information for Given Pairs
    var pair_a_ask = parseFloat(pricesJson[pair_a]["lowestAsk"]);
    var pair_a_bid = parseFloat(pricesJson[pair_a]["highestBid"]);
    var pair_b_ask = parseFloat(pricesJson[pair_b]["lowestAsk"]);
    var pair_b_bid = parseFloat(pricesJson[pair_b]["highestBid"]);
    var pair_c_ask = parseFloat(pricesJson[pair_c]["lowestAsk"]);
    var pair_c_bid = parseFloat(pricesJson[pair_c]["highestBid"]);
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
exports.getPriceForTPair = getPriceForTPair;
function calcTriangularArbSurfaceRate(tPair, pricesDict) {
    // Set Variables
    var startingAmount = 1;
    var minSurfaceRate = 0;
    var surfaceDict = {};
    var contract2 = "";
    var contract3 = "";
    var directionTrade1 = "";
    var directionTrade2 = "";
    var directionTrade3 = "";
    var acquiredCoinT2 = 0;
    var acquiredCoinT3 = 0;
    var calculated = 0;
    // Extract Pair Variables
    var aBase = tPair["a_base"];
    var aQuote = tPair["a_quote"];
    var bBase = tPair["b_base"];
    var bQuote = tPair["b_quote"];
    var cBase = tPair["c_base"];
    var cQuote = tPair["c_quote"];
    var pairA = tPair["pair_a"];
    var pairB = tPair["pair_b"];
    var pairC = tPair["pair_c"];
    // Extract Price Information
    var aAsk = pricesDict["pair_a_ask"];
    var aBid = pricesDict["pair_a_bid"];
    var bAsk = pricesDict["pair_b_ask"];
    var bBid = pricesDict["pair_b_bid"];
    var cAsk = pricesDict["pair_c_ask"];
    var cBid = pricesDict["pair_c_bid"];
    // Set directions and loop through
    var directionList = ["forward", "reverse"];
    for (var _i = 0, directionList_1 = directionList; _i < directionList_1.length; _i++) {
        var direction = directionList_1[_i];
        // Set additional variables for swap information
        var swap1 = "";
        var swap2 = "";
        var swap3 = "";
        var swap1Rate = 0;
        var swap2Rate = 0;
        var swap3Rate = 0;
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
        var contract1 = pairA;
        var acquiredCoinT1 = startingAmount * swap1Rate;
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
        var profitLoss = acquiredCoinT3 - startingAmount;
        var profitLossPerc = startingAmount !== 0 ? (profitLoss / startingAmount) * 100 : 0;
        // Trade Descriptions
        var tradeDescription1 = "Start with ".concat(swap1, " of ").concat(startingAmount, ". Swap at ").concat(swap1Rate, " for ").concat(swap2, " acquiring ").concat(acquiredCoinT1, ".");
        var tradeDescription2 = "Swap ".concat(acquiredCoinT1, " of ").concat(swap2, " at ").concat(swap2Rate, " for ").concat(swap3, " acquiring ").concat(acquiredCoinT2, ".");
        var tradeDescription3 = "Swap ".concat(acquiredCoinT2, " of ").concat(swap3, " at ").concat(swap3Rate, " for ").concat(swap1, " acquiring ").concat(acquiredCoinT3, ".");
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
exports.calcTriangularArbSurfaceRate = calcTriangularArbSurfaceRate;
function reformattedOrderbook(prices, cDirection) {
    var priceListMain = [];
    if (cDirection === "base_to_quote") {
        for (var i = 0; i < prices.asks.length; i += 2) {
            var askPrice = parseFloat(prices.asks[i]);
            var adjQuantity = parseFloat(prices.asks[i + 1]);
            var adjPrice = askPrice !== 0 ? 1 / askPrice : 0;
            priceListMain.push([adjPrice, adjQuantity]);
        }
    }
    else if (cDirection === "quote_to_base") {
        for (var i = 0; i < prices.bids.length; i += 2) {
            var bidPrice = parseFloat(prices.bids[i]);
            var adjPrice = bidPrice !== 0 ? bidPrice : 0;
            var adjQuantity = parseFloat(prices.bids[i + 1]);
            priceListMain.push([adjPrice, adjQuantity]);
        }
    }
    return priceListMain;
}
function calculateAcquiredCoin(amountIn, orderbook) {
    var tradingBalance = amountIn;
    var quantityBought = 0;
    var acquiredCoin = 0;
    var counts = 0;
    for (var _i = 0, orderbook_1 = orderbook; _i < orderbook_1.length; _i++) {
        var level = orderbook_1[_i];
        var levelPrice = level[0];
        var levelAvailableQuantity = level[1];
        if (tradingBalance <= levelAvailableQuantity) {
            quantityBought = tradingBalance;
            tradingBalance = 0;
        }
        else {
            quantityBought = levelAvailableQuantity;
            tradingBalance -= quantityBought;
        }
        var amountBought = quantityBought * levelPrice;
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
function getDepthFromOrderbook(surfaceDict) {
    return __awaiter(this, void 0, void 0, function () {
        var swap1, startingAmount, startingAmountDict, contract1, contract2, contract3, contract1Direction, contract2Direction, contract3Direction, tradeDescription1, tradeDescription2, tradeDescription3, depth1Prices, depth1ReformattedPrices, depth2Prices, depth2ReformattedPrices, depth3Prices, depth3ReformattedPrices, acquiredCoinT1, acquiredCoinT2, acquiredCoinT3, profitLoss, realRatePerc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    swap1 = surfaceDict.swap_1;
                    startingAmount = 100;
                    startingAmountDict = {
                        USDT: 100,
                        USDC: 100,
                        BTC: 0.05,
                        ETH: 0.1,
                    };
                    if (swap1 in startingAmountDict) {
                        startingAmount = startingAmountDict[swap1];
                    }
                    contract1 = surfaceDict.contract_1;
                    contract2 = surfaceDict.contract_2;
                    contract3 = surfaceDict.contract_3;
                    contract1Direction = surfaceDict.direction_trade_1;
                    contract2Direction = surfaceDict.direction_trade_2;
                    contract3Direction = surfaceDict.direction_trade_3;
                    tradeDescription1 = surfaceDict.trade_description_1;
                    tradeDescription2 = surfaceDict.trade_description_2;
                    tradeDescription3 = surfaceDict.trade_description_3;
                    return [4 /*yield*/, get("https://api.poloniex.com/markets/".concat(contract1, "/orderBook?limit=20"))];
                case 1:
                    depth1Prices = _a.sent();
                    depth1ReformattedPrices = reformattedOrderbook(depth1Prices, contract1Direction);
                    return [4 /*yield*/, get("https://api.poloniex.com/markets/".concat(contract2, "/orderBook?limit=20"))];
                case 2:
                    depth2Prices = _a.sent();
                    depth2ReformattedPrices = reformattedOrderbook(depth2Prices, contract2Direction);
                    return [4 /*yield*/, get("https://api.poloniex.com/markets/".concat(contract3, "/orderBook?limit=20"))];
                case 3:
                    depth3Prices = _a.sent();
                    depth3ReformattedPrices = reformattedOrderbook(depth3Prices, contract3Direction);
                    acquiredCoinT1 = calculateAcquiredCoin(startingAmount, depth1ReformattedPrices);
                    acquiredCoinT2 = calculateAcquiredCoin(acquiredCoinT1, depth2ReformattedPrices);
                    acquiredCoinT3 = calculateAcquiredCoin(acquiredCoinT2, depth3ReformattedPrices);
                    profitLoss = acquiredCoinT3 - startingAmount;
                    realRatePerc = startingAmount !== 0 ? (profitLoss / startingAmount) * 100 : 0;
                    console.log("realRatePerc", realRatePerc);
                    if (realRatePerc > -1) {
                        console.log("if (realRatePerc > -1)");
                        return [2 /*return*/, {
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
                            }];
                    }
                    else {
                        return [2 /*return*/, { "realRatePerc < -1": "realRatePerc < -1" }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getDepthFromOrderbook = getDepthFromOrderbook;
//# sourceMappingURL=func_arbitrage.js.map