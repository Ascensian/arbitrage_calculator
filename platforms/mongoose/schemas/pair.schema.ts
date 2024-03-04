import { Schema, SchemaType, SchemaTypes } from "mongoose";
import { IPair } from "../../../definitions/pairs";

export const PairSchema = new Schema<IPair>({
    a_base: {
        type: SchemaTypes.String,
        required: true
    },
    b_base: {
        type: SchemaTypes.String,
        required: true
    },
    c_base: {
        type: SchemaTypes.String,
        required: true
    },
    a_quote: {
        type: SchemaTypes.String,
        required: true
    },
    b_quote: {
        type: SchemaTypes.String,
        required: true
    },
    c_quote: {
        type: SchemaTypes.String,
        required: true
    },
    triangular_pair: {
        type: SchemaTypes.String,
        required: false
    },
}, {
    versionKey: false,
    collection: "pairs",
    timestamps: true
})

