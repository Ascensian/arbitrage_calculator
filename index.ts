import { configDotenv } from "dotenv";
configDotenv()

import { launchAPI } from "./platforms/api";

async function main() {
    launchAPI()
}

try {
    main()
} catch (error) {
    console.log(error);
}













