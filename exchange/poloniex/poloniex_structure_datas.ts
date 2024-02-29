// Structure Triangular Pairs
import { TriangularPair } from "../../definitions/triangularPair";

export function structureTriangularPairs(coinlist: Array<string>) {

    const triangularPairsList: Array<TriangularPair> = []
    const removeDuplicatesList: Array<string> = []

    console.log("Structuring Triangular Pairs...");

    for (const pairA of coinlist) {
        const [aBase, aQuote]: string[] = splitPair(pairA)
        for (const pairB of coinlist) {
            const [bBase, bQuote]: string[] = splitPair(pairB)
            if (pairB != pairA) {
                if (bBase == aBase || bBase == aQuote || bQuote == aQuote || bQuote == aBase) {
                    for (const pairC of coinlist) {
                        const [cBase, cQuote]: string[] = splitPair(pairC)
                        if (pairC != pairA && pairC != pairB) {
                            const combineAllPairs: string[] = [pairA, pairB, pairC]
                            const pairBox: string[] = [aBase, aQuote, bBase, bQuote, cBase, cQuote]
                            const cBaseCounter: number = cCounter(pairBox, cBase)
                            const cQuoteCounter: number = cCounter(pairBox, cQuote)

                            // Determining Triangular Match
                            if (cBaseCounter == 2 && cQuoteCounter == 2 && cBase != cQuote) {
                                const uniqueItem: string = combineAllPairs.sort().join(' ')
                                if (!removeDuplicatesList.includes(uniqueItem)) {
                                    const matchObject: TriangularPair = {
                                        "a_base": aBase,
                                        "b_base": bBase,
                                        "c_base": cBase,
                                        "a_quote": aQuote,
                                        "b_quote": bQuote,
                                        "c_quote": cQuote,
                                        "pair_a": pairA,
                                        "pair_b": pairB,
                                        "pair_c": pairC,
                                        "triangular_pair": uniqueItem
                                    }
                                    triangularPairsList.push(matchObject)
                                    removeDuplicatesList.push(uniqueItem)
                                }

                            }

                        }
                    }

                }
            }
        }
    }
    return triangularPairsList
}

function cCounter(pairBox: Array<string>, cBase: string) {
    let counter: number = 0
    for (const symbol of pairBox) {
        if (symbol == cBase) {
            counter += 1
        }
    }
    return counter
}

// Split pair
function splitPair(pairs: string) {
    const pairSplited: string[] = pairs.split('_')
    return pairSplited
}



// Structure Poloniex OrderBook
export function structureOrderBook(orderbook: Array<number>) {
    const asksPrices: Array<number> = []
    const asksSizes: Array<number> = []
    let counter: number = 0
    orderbook.forEach(element => {
        if (counter % 2 == 0) {
            asksPrices.push(element)
        } else {
            asksSizes.push(element)
        }

        counter += 1
    });
    console.log(asksPrices);
    console.log(asksSizes);
}

