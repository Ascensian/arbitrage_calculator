import { Schema, SchemaTypes } from "mongoose";
import { ISession } from "../../../definitions/sessions";

export const SessionSchema = new Schema<ISession>({
    token: {
        type: SchemaTypes.String,
        required: true
    },
    user: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    versionKey: false,
    timestamps: true
})