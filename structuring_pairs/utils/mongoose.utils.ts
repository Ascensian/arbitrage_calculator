import mongoose, { Mongoose } from "mongoose";

export class MongooseUtils {
    public static async connectDatabase(): Promise<Mongoose> {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}`, {
            autoCreate: true
        });
        return connection
    }
}