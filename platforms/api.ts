import express from 'express';
import { PoloniexController } from './poloniex/poloniex.controller';

export function launchAPI() {
    const app = express()
    const port = process.env.PORT

    const poloniexController = new PoloniexController()
    app.use('/', poloniexController.buildRoutes());
    app.listen(port, () => {
        console.log(`Pairs app listening on port ${port}`)
    })

}