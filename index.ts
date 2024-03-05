import { configDotenv } from "dotenv";
configDotenv()
import { startAPI } from "./platforms/express/api";
import { MongooseUtils } from "./utils/mongoose.utils";
import mongoose, { Mongoose } from "mongoose";

async function main() {
    try {
        const connection = await MongooseUtils.connectDatabase()
        if (connection) {
            startAPI(connection)
        }
    } catch (error) {
        console.log(error);
    }
}

main()