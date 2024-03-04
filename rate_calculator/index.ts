import * as func_arbitrage from "./func_arbitrage";
import axios from "axios";
import { TPair, DepthInfo } from "./func_arbitrage";
import { PricesJson } from "./func_arbitrage";
import { MongoClient } from "mongodb";
import express, { Request, Response } from "express";

const app = express();
const port = 3001; // Choisissez le port que vous préférez

// Endpoint pour récupérer l'opportunité réelle
app.get("/real-opportunity", async (req: Request, res: Response) => {
  try {
    const real_rate_dict = await step_1();
    if (
      real_rate_dict &&
      "real_rate_perc" in real_rate_dict &&
      real_rate_dict.real_rate_perc > 0
    ) {
      res.status(200).json(real_rate_dict);
    } else {
      res.status(404).json({ message: "Aucune opportunité réelle trouvée" });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'opportunité réelle :",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la récupération de l'opportunité réelle",
    });
  }
});

const mongoURI = "mongodb://localhost:27017";
const dbName = "mydb";
const client = new MongoClient(mongoURI);

const structured_pairs_url: string = "https://notreapi.com/s_p";
const prices_url: string = "https://notreapi.com/prices";
let structured_pairs: any[];

async function step_0(): Promise<void> {
  try {
    const response = await axios.get(structured_pairs_url);
    if (response.status === 200) {
      structured_pairs = response.data;
      console.log("Structured pairs:", structured_pairs);
    } else {
      throw new Error("Failed to fetch structured pairs");
    }
  } catch (error: any) {
    console.error("Error fetching structured pairs:", error.message);
  }
}

// step_0 for stuctured pairs
//const structured_pairs: StructuredPair[] = await step_0();

async function step_1(): Promise<
  DepthInfo | { "realRatePerc < -1": string } | undefined
> {
  // Get Latest Surface Prices
  //const prices_json: PricesJson[] | null = await axios.get(prices_url);
  async function extractData(): Promise<any> {
    try {
      const response = await axios.get(
        "https://api.poloniex.com/markets/ticker24h"
      );

      const result: any = {};

      response.data.forEach((element: any) => {
        const { symbol, ask, bid } = element;

        result[symbol] = {
          lowestAsk: ask,
          highestBid: bid,
        };
      });

      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      return null;
    }
  }
  //const prices_json = await extractData();
  const response = await axios.get<PricesJson>("http://localhost:3000/prices");
  const prices_json = response.data;
  //console.log("prices_json =", prices_json);
  const response2 = await axios.get<TPair[]>(
    "http://localhost:3000/triangularpairs"
  );
  structured_pairs = response2.data;
  for (const t_pair of structured_pairs) {
    const prices_dict = func_arbitrage.getPriceForTPair(t_pair, prices_json);
    const surface_dict = func_arbitrage.calcTriangularArbSurfaceRate(
      t_pair,
      prices_dict
    );
    //console.log("surfacearb1", surface_arb);

    if (Object.keys(surface_dict).length > 0) {
      //console.log("surfacearb2", surface_arb);
      //console.log("surfacedict>0");

      const real_rate_dict = await func_arbitrage.getDepthFromOrderbook(
        surface_dict
      );
      if (Object.keys(real_rate_dict).length > 1) {
        // Insérer dans MongoDB avec un timestamp
        console.log("real rate", real_rate_dict);
        await insertDocument("real_rate_dict_collection", {
          real_rate_dict,
          timestamp: new Date(),
        });
        return real_rate_dict;
      }
    }
  }
}

async function insertDocument(
  collectionName: string,
  document: any
): Promise<void> {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.insertOne(document);
    console.log("Document inserted successfully");
  } catch (error) {
    console.error("Error inserting document:", error);
  } finally {
    await client.close();
  }
}

if (require.main === module) {
  // const coin_list = step_0();
  // step_1(coin_list);

  step_1();
  //setInterval(step_1, 170);
}
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
