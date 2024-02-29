import axios, { AxiosResponse } from 'axios';

// Poloniex Symbols / All tradable coins
export async function getCoins() {
    try {
        const response: AxiosResponse = await axios.get(`${process.env.POLONIEX_MARKETS_URL}`);
        if (response.status == 200) {
            const coinList: Array<string> = []
            response.data.forEach((element: { symbol: string; state: string }) => {
                if (element.state == "NORMAL") {
                    coinList.push(element.symbol)
                }
            });
            return coinList
        } else {
            console.log(response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

// Poloniex OrderBook
export async function getOrderBook(symbol: string) {
    try {
        const url = process.env.POLONIEX_MARKETS_URL + `/${symbol}/orderBook`
        const response: AxiosResponse = await axios.get(url);
        if (response.status == 200) {
            return response.data['asks']

        } else {
            console.log(response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

