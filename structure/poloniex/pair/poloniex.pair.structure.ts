import { IPair } from "../../../definitions/pairs";

export class PoloniexPairStructure {

    static structureTriangularPairs(coinlist: Array<string>): Array<IPair> {
        const triangularPairsList: Array<IPair> = []
        const removeDuplicatesList: Array<string> = []

        for (const pairA of coinlist) {
            const [aBase, aQuote]: string[] = PoloniexPairStructure.splitPair(pairA)
            for (const pairB of coinlist) {
                const [bBase, bQuote]: string[] = PoloniexPairStructure.splitPair(pairB)
                if (pairB != pairA) {
                    if (bBase == aBase || bBase == aQuote || bQuote == aQuote || bQuote == aBase) {
                        for (const pairC of coinlist) {
                            const [cBase, cQuote]: string[] = PoloniexPairStructure.splitPair(pairC)
                            if (pairC != pairA && pairC != pairB) {
                                const combineAllPairs: string[] = [pairA, pairB, pairC]
                                const pairBox: string[] = [aBase, aQuote, bBase, bQuote, cBase, cQuote]
                                const cBaseCounter: number = PoloniexPairStructure.cCounter(pairBox, cBase)
                                const cQuoteCounter: number = PoloniexPairStructure.cCounter(pairBox, cQuote)

                                // Determining Triangular Match
                                if (cBaseCounter == 2 && cQuoteCounter == 2 && cBase != cQuote) {
                                    const uniqueItem: string = combineAllPairs.sort().join(' ')
                                    if (!removeDuplicatesList.includes(uniqueItem)) {
                                        const matchObject: IPair = {
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

    private static splitPair(pairs: string): Array<string> {
        const pairSplited: string[] = pairs.split('_')
        return pairSplited
    }

    private static cCounter(pairBox: Array<string>, cBase: string): number {
        let counter: number = 0
        for (const symbol of pairBox) {
            if (symbol == cBase) {
                counter += 1
            }
        }
        return counter
    }
}


