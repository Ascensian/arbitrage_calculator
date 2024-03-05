import { Schema, SchemaTypes } from "mongoose";
import { IUser } from "../../../definitions/users";

export const UserSchema = new Schema<IUser>({
    username: {
        type: SchemaTypes.String,
        required: true
    },
    password: {
        type: SchemaTypes.String,
        required: true
    },
}, {
    versionKey: false,
    timestamps: true
})