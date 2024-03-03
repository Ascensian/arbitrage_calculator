import { Router, Request, Response, json } from 'express';
import { PoloniexHttpService } from '../../../http/poloniex/poloniex.http.service';
import { PoloniexPairStructure } from '../../../structure/poloniex/pair/poloniex.pair.structure';
import { IPair } from '../../../definitions/pairs';
import { PoloniexTickerStructure } from '../../../structure/poloniex/ticker/poloniex.ticker.structure.V1';
import { PoloniexTickerStructureV2 } from '../../../structure/poloniex/ticker/poloniex.ticker.structure.V2';

export class PoloniexController {


    public constructor() {
    }

    async getPairs(req: Request, res: Response): Promise<void> {
        const pairs = await PoloniexHttpService.getCoins()
        res.json(pairs)
    }

    async getTriangularPairs(req: Request, res: Response): Promise<void> {
        const pairs = await PoloniexHttpService.getCoins()
        if (pairs != undefined) {
            const triangularPairs = PoloniexPairStructure.structureTriangularPairs(pairs)
            res.json(triangularPairs)
        }
    }

    async getPrices(req: Request, res: Response): Promise<void> {
        const tickers = await PoloniexHttpService.getTickers()
        if (tickers != undefined) {
            const prices = PoloniexTickerStructureV2.structurePrices(tickers)
            res.json(prices)
        }

    }

    buildRoutes(): Router {
        const router = Router();
        router.get('/pairs', this.getPairs.bind(this))
        // router.get('/triangularpairs', this.getTriangularPairs.bind(this))
        router.get('/prices', this.getPrices.bind(this))
        return router;
    }
}