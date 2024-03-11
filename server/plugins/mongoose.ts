import mongoose from "mongoose";
import type { Model, SchemaDefinition, SchemaOptions } from 'mongoose'


export default defineNitroPlugin(async (app) => {
    if (!process.env.MONGODB) {
        throw new Error("Invalid MONGODB variable.");
    }
    await mongoose.connect(process.env.MONGODB);
    console.log(`✔ Connected to MongoDB`)
})

export function defineMongooseModel<T>(modelName: string, schemaDefinition: SchemaDefinition<T>) {
    const schema = new mongoose.Schema<T>(schemaDefinition);
    return mongoose.model(modelName, schema);
}