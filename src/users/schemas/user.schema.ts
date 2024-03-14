import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  userType: {
    type: String,
    enum: ['regular', 'talent'], // Defines allowed user types
    required: true,
  },
  talentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Talent', // This assumes you have a Talent model defined elsewhere
    required: false, // This can be optional based on your application logic
  },
});

export interface User extends mongoose.Document {
  email: string;
  password: string;
  accountId?: mongoose.Schema.Types.ObjectId;
  userType: 'regular' | 'talent';
  talentId?: mongoose.Schema.Types.ObjectId;
}

// Create and export the User model
export const UserModel = mongoose.model<User>('User', UserSchema);
