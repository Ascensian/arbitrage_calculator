import express from 'express';
import { PoloniexController } from './express/poloniex/poloniex.controller';
import { Mongoose } from 'mongoose';

export function startAPI(connection: Mongoose) {
    const app = express()
    const port = process.env.PORT

    const poloniexController = new PoloniexController(connection)
    app.use('/', poloniexController.buildRoutes());
    app.listen(port, () => {
        console.log(`Pairs app listening on port ${port}`)
    })

}