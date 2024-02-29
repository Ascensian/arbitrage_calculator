import { configDotenv } from "dotenv";
configDotenv()
import { getCoins, getOrderBook } from "./exchange/poloniex/poloniex_get_datas";
import { structureOrderBook, structureTriangularPairs } from "./exchange/poloniex/poloniex_structure_datas";



getCoins().then((list) => {

    if (list !== undefined) {
        const pairList = structureTriangularPairs(list)
        console.log(pairList.length);
        console.log(pairList);

    }
})




// getOrderBook('DASH_BTC')
//     .then((response: Array<number>) => {
//         structureOrderBook(response)
//     })
//     .catch(error => {
//         console.error(error);
//     });









