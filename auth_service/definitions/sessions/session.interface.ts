import { IUser } from "../users/user.interface"

export interface ISession {
    token: string
    user: string | IUser
}