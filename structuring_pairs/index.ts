import { configDotenv } from "dotenv";
configDotenv()
import { MongooseUtils } from "./utils/mongoose.utils";
import { startAPI } from "./platforms/api";

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













