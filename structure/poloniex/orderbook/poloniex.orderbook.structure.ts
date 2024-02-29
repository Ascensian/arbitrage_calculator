export class PoloniexOrderbookStructure {

    structureOrderBook(orderbook: Array<number>) {

        const asksPrices: Array<number> = []
        const asksSizes: Array<number> = []
        const newOrderBook = []
        let counter: number = 0

        orderbook.forEach(element => {
            if (counter % 2 == 0) {
                asksPrices.push(element)
            } else {
                asksSizes.push(element)
            }
            counter += 1
        });
        // return 

    }
}