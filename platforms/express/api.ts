import express from 'express'
import { Mongoose } from 'mongoose'
import { AuthController } from './auth.controller';


export function startAPI(connection: Mongoose) {
    const app = express()
    const auth = new AuthController(connection)
    app.use('/', auth.buildRoutes());
    app.listen(process.env.PORT, () => {
        console.log(`Auth service listening on port ${process.env.PORT}`);
    });
}