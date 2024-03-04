"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var func_arbitrage = __importStar(require("./func_arbitrage"));
var axios_1 = __importDefault(require("axios"));
var mongodb_1 = require("mongodb");
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = 3001; // Choisissez le port que vous préférez
// Endpoint pour récupérer l'opportunité réelle
app.get("/real-opportunity", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var real_rate_dict, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, step_1()];
            case 1:
                real_rate_dict = _a.sent();
                if (real_rate_dict &&
                    "real_rate_perc" in real_rate_dict &&
                    real_rate_dict.real_rate_perc > 0) {
                    res.status(200).json(real_rate_dict);
                }
                else {
                    res.status(404).json({ message: "Aucune opportunité réelle trouvée" });
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Erreur lors de la récupération de l'opportunité réelle :", error_1);
                res.status(500).json({
                    error: "Erreur lors de la récupération de l'opportunité réelle",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
var mongoURI = "mongodb://localhost:27017";
var dbName = "mydb";
var client = new mongodb_1.MongoClient(mongoURI);
var structured_pairs_url = "https://notreapi.com/s_p";
var prices_url = "https://notreapi.com/prices";
var structured_pairs;
function step_0() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get(structured_pairs_url)];
                case 1:
                    response = _a.sent();
                    if (response.status === 200) {
                        structured_pairs = response.data;
                        console.log("Structured pairs:", structured_pairs);
                    }
                    else {
                        throw new Error("Failed to fetch structured pairs");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error fetching structured pairs:", error_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// step_0 for stuctured pairs
//const structured_pairs: StructuredPair[] = await step_0();
function step_1() {
    return __awaiter(this, void 0, void 0, function () {
        // Get Latest Surface Prices
        //const prices_json: PricesJson[] | null = await axios.get(prices_url);
        function extractData() {
            return __awaiter(this, void 0, void 0, function () {
                var response_1, result_1, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1.default.get("https://api.poloniex.com/markets/ticker24h")];
                        case 1:
                            response_1 = _a.sent();
                            result_1 = {};
                            response_1.data.forEach(function (element) {
                                var symbol = element.symbol, ask = element.ask, bid = element.bid;
                                result_1[symbol] = {
                                    lowestAsk: ask,
                                    highestBid: bid,
                                };
                            });
                            return [2 /*return*/, result_1];
                        case 2:
                            error_3 = _a.sent();
                            console.error("Erreur lors de la récupération des données :", error_3);
                            return [2 /*return*/, null];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        var response, prices_json, response2, _i, structured_pairs_1, t_pair, prices_dict, surface_dict, real_rate_dict;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("http://localhost:3000/prices")];
                case 1:
                    response = _a.sent();
                    prices_json = response.data;
                    return [4 /*yield*/, axios_1.default.get("http://localhost:3000/triangularpairs")];
                case 2:
                    response2 = _a.sent();
                    structured_pairs = response2.data;
                    _i = 0, structured_pairs_1 = structured_pairs;
                    _a.label = 3;
                case 3:
                    if (!(_i < structured_pairs_1.length)) return [3 /*break*/, 7];
                    t_pair = structured_pairs_1[_i];
                    prices_dict = func_arbitrage.getPriceForTPair(t_pair, prices_json);
                    surface_dict = func_arbitrage.calcTriangularArbSurfaceRate(t_pair, prices_dict);
                    if (!(Object.keys(surface_dict).length > 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, func_arbitrage.getDepthFromOrderbook(surface_dict)];
                case 4:
                    real_rate_dict = _a.sent();
                    if (!(Object.keys(real_rate_dict).length > 1)) return [3 /*break*/, 6];
                    // Insérer dans MongoDB avec un timestamp
                    console.log("real rate", real_rate_dict);
                    return [4 /*yield*/, insertDocument("real_rate_dict_collection", {
                            real_rate_dict: real_rate_dict,
                            timestamp: new Date(),
                        })];
                case 5:
                    _a.sent();
                    return [2 /*return*/, real_rate_dict];
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function insertDocument(collectionName, document) {
    return __awaiter(this, void 0, void 0, function () {
        var db, collection, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 6]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    db = client.db(dbName);
                    collection = db.collection(collectionName);
                    return [4 /*yield*/, collection.insertOne(document)];
                case 2:
                    _a.sent();
                    console.log("Document inserted successfully");
                    return [3 /*break*/, 6];
                case 3:
                    error_4 = _a.sent();
                    console.error("Error inserting document:", error_4);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, client.close()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    // const coin_list = step_0();
    // step_1(coin_list);
    step_1();
    setInterval(step_1, 170);
}
app.listen(port, function () {
    console.log("Serveur d\u00E9marr\u00E9 sur le port ".concat(port));
});
//# sourceMappingURL=index.js.map