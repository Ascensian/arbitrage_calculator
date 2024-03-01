import { ITicker } from "../../../definitions/tickers/ticker.interface";

export class PoloniexTickerStructureV2 {
    static structurePrices(prices: Array<ITicker>) {
        const arrPrices = []
        for (const ticker of prices) {
            const symbol: string = ticker.symbol
            const bid: string = ticker.bid
            const ask: string = ticker.ask

            const jsonPrices = {
                [symbol]: {
                    lowestAsk: ask,
                    highestBid: bid
                },
                [symbol]: {
                    lowestAsk: ask,
                    highestBid: bid
                },
                [symbol]: {
                    lowestAsk: ask,
                    highestBid: bid
                }

            }
            arrPrices.push(jsonPrices)
        }
        return arrPrices
    }
}