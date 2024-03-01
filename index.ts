import { configDotenv } from "dotenv";
import { PoloniexHttpService } from "./http/poloniex/poloniex.http.service";
import mongoose from "mongoose";
configDotenv()

import { launchAPI } from "./platforms/api";

async function main() {
    launchAPI()
    // await mongoose.connect()

}

try {
    main()
} catch (error) {
    console.log(error);
}













