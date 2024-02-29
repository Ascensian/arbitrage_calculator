import { Router, Request, Response, json } from 'express';
import { PoloniexHttpService } from '../../http/poloniex/poloniex.http.service';
import { PoloniexPairStructure } from '../../structure/poloniex/pair/poloniex.pair.structure';


export class PoloniexController {

    public constructor() {
    }

    async getPairs(req: Request, res: Response): Promise<void> {
        const pairs = await PoloniexHttpService.getCoins()
        if (pairs != undefined) {
            console.log("Structuring Triangular Pairs...");
            const triangularPairs = PoloniexPairStructure.structureTriangularPairs(pairs)
            res.json(triangularPairs)
        }
    }





    buildRoutes(): Router {
        const router = Router();
        router.get('/', this.getPairs.bind(this))
        return router;
    }
}