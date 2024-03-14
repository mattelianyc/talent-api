// src/content/schemas/content.schema.ts
import * as mongoose from 'mongoose';

export const ContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface Content extends mongoose.Document {
  title: string;
  description: string;
  url: string;
  price: number;
}
