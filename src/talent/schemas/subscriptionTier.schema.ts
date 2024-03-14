import * as mongoose from 'mongoose';

// Updated SubscriptionTier schema without the talent reference
export const SubscriptionTierSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  benefits: [String], // An array of strings describing the benefits of this tier
});

export interface SubscriptionTier extends mongoose.Document {
  title: string;
  price: number;
  benefits: string[];
}