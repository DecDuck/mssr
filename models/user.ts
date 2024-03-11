import { Schema, type Types } from "mongoose";
import { defineMongooseModel } from "~/server/plugins/mongoose";

export interface LocalUser {
    email: string;
    passwordHash: string;
    user: Types.ObjectId;
}

export const LocalUserModel = defineMongooseModel<LocalUser>('LocalUser', {
    email: { required: true, type: String },
    passwordHash: { required: true, type: String },
    user: { required: true, type: Schema.Types.ObjectId, ref: 'User' }
});

export interface User {
    // Avatar
    displayName?: string;

    permissions: string[]
}

export const UserModel = defineMongooseModel<User>('User', {
    displayName: String,
    permissions: { required: true, type: [String] }
});