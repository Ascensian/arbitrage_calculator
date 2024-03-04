import { Router, Request, Response, json } from 'express';
import { PoloniexHttpService } from '../../../http/poloniex/poloniex.http.service';
import { PoloniexPairStructure } from '../../../structure/poloniex/pair/poloniex.pair.structure';
import { IPair } from '../../../definitions/pairs';
import { PoloniexTickerStructureV2 } from '../../../structure/poloniex/ticker/poloniex.ticker.structure.V2';
import { Model, Mongoose } from 'mongoose';
import { PairSchema } from '../../mongoose/schemas';

export class PoloniexController {

    private pairModel: Model<IPair>

    public constructor(connection: Mongoose) {
        this.pairModel = connection.model('Pair', PairSchema)
    }

    async getPairs(req: Request, res: Response): Promise<void> {
        const pairs = await PoloniexHttpService.getCoins()
        res.json(pairs)
    }

    async getTriangularPairs(req: Request, res: Response): Promise<void> {
        const pairs = await PoloniexHttpService.getCoins()
        if (pairs != undefined) {
            const dbPairs = await this.pairModel.find({}).select('-_id -createdAt -updatedAt')
            if (dbPairs.length == 0) {
                await PoloniexPairStructure.structureTriangularPairs(pairs, this.pairModel)
                console.log("Done");
            }
            res.json(dbPairs)
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
        router.get('/triangularpairs', this.getTriangularPairs.bind(this))
        router.get('/prices', this.getPrices.bind(this))
        return router;
    }
}