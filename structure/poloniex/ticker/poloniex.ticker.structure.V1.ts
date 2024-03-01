import { IPair } from "../../../definitions/pairs";
import { ITicker } from "../../../definitions/tickers/ticker.interface";

export class PoloniexTickerStructure {

    static structurePairsPricing(triangularPairs: Array<IPair>, prices: Array<ITicker>) {

        const arrPrices = []
        for (const pairs of triangularPairs) {
            const pairA = pairs.pair_a
            const pairB = pairs.pair_b
            const pairC = pairs.pair_c
            const aPairAsk = PoloniexTickerStructure.getAsk(pairA, prices)
            const aPairBid = PoloniexTickerStructure.getBid(pairA, prices)
            const bPairAsk = PoloniexTickerStructure.getAsk(pairB, prices)
            const bPairBid = PoloniexTickerStructure.getBid(pairB, prices)
            const cPairAsk = PoloniexTickerStructure.getAsk(pairC, prices)
            const cPairBid = PoloniexTickerStructure.getBid(pairC, prices)

            const jsonPrices = {
                [pairA]: {
                    lowestAsk: aPairAsk,
                    highestBid: aPairBid
                },
                [pairB]: {
                    lowestAsk: bPairAsk,
                    highestBid: bPairBid
                },
                [pairC]: {
                    lowestAsk: cPairAsk,
                    highestBid: cPairBid
                }

            }

            arrPrices.push(jsonPrices)
        }

        return arrPrices

    }

    private static getBid(pair: string, prices: Array<ITicker>) {
        const matchingPair = prices.find((pairs) => pairs.symbol === pair)
        return matchingPair?.bid
    }

    private static getAsk(pair: string, prices: Array<ITicker>) {
        const matchingPair = prices.find((pairs) => pairs.symbol === pair)
        return matchingPair?.ask
    }


}