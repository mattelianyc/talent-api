// src/talent/schemas/talent.schema.ts
import * as mongoose from 'mongoose';
import { SubscriptionTier, SubscriptionTierSchema } from './subscriptionTier.schema'; // Adjust the path as needed
import { Content, ContentSchema } from './content.schema'; // Adjust the path as needed

export const TalentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  subscriptionTiers: [SubscriptionTierSchema], // Embedding SubscriptionTierSchema directly
  content: [ContentSchema], // Embedding ContentSchema directly
});

// Note the direct use of arrays for the types without 'mongoose.DocumentArray'
export interface Talent extends mongoose.Document {
  name: string;
  description: string;
  subscriptionTiers: SubscriptionTier[]; // Use array type directly
  content: Content[]; // Use array type directly
}

export const TalentModel = mongoose.model<Talent>('Talent', TalentSchema);
