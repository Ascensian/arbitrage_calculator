import { configDotenv } from "dotenv";
configDotenv()
import { PoloniexHttpService } from "./http/poloniex/poloniex.http.service";
import { startAPI } from "./platforms/api";
import { MongooseUtils } from "./utils/mongoose.utils";

async function main() {
    startAPI()

}

main()













