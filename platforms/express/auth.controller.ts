import { Model, Mongoose } from "mongoose";
import { IUser } from "../../definitions/users";
import { UserSchema } from "../mongoose/schemas/account.schema";
import { Request, Response, Router, json } from "express";
import { CryptoUtils } from "../../utils/crypto.utils";
import { ISession } from "../../definitions/sessions";
import { SessionSchema } from "../mongoose/schemas/session.schema";

export class AuthController {

    private connection: Mongoose
    private modelUser: Model<IUser>
    private modelSession: Model<ISession>

    public constructor(connection: Mongoose) {
        this.connection = connection
        this.modelUser = this.connection.model('User', UserSchema)
        this.modelSession = this.connection.model('Session', SessionSchema)
    }

    async registerUser(req: Request, res: Response): Promise<void> {
        if (!req.body.username || !req.body.password) {
            res.status(400).end(); // error client side
            return;
        }
        try {
            const username = await this.modelUser.find({ username: req.body.username })
            if (username.length == 0) {
                await this.modelUser.create({
                    username: req.body.username,
                    password: CryptoUtils.sha256(req.body.password)
                })
                res.status(201).end();
            } else {
                res.status(409).end() // conflict with current state of target ressource
            }
        } catch (error) {
            console.log(error);
        }
    }

    async connectUser(req: Request, res: Response): Promise<void> {
        if (!req.body.username || !req.body.password) {
            res.status(400).end();
            return;
        }

        const user = await this.modelUser.findOne(
            {
                username: req.body.username,
                password: CryptoUtils.sha256(req.body.password)
            }
        )

        if (user == null) {
            res.status(401).end();
            return;
        } else {
            const token = CryptoUtils.randomToken();
            const session = await this.modelSession.create({
                token: token,
                user: user
            });
            res.status(201).json(session);
        }
    }




    buildRoutes(): Router {
        const router = Router();
        router.post('/register', json(), this.registerUser.bind(this))
        router.post('/signin', json(), this.connectUser.bind(this))
        return router;
    }




}