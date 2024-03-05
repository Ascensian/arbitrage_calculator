import mongoose, { Mongoose } from "mongoose";

// Global connection
export class MongooseUtils {
    public static async connectDatabase(): Promise<Mongoose> {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}`);
        return connection
    }
}