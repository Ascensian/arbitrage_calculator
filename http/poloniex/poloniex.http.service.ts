import axios, { AxiosResponse } from 'axios';
import { ITicker } from '../../definitions/tickers/ticker.interface';

export class PoloniexHttpService {
    // Poloniex Symbols / All tradable coins
    static async getCoins(): Promise<string[] | undefined> {
        try {
            const url = process.env.POLONIEX_MARKETS_URL
            const response: AxiosResponse = await axios.get(`${url}`);
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

    // Poloniex Tickers
    static async getTickers(): Promise<ITicker[] | undefined> {
        try {
            const url = process.env.POLONIEX_TICKERS_URL
            const response: AxiosResponse = await axios.get(`${url}`);
            if (response.status == 200) {
                return response.data
            } else {
                console.log(response.status);
            }
        } catch (error) {
            console.error(error);
        }
    }
}