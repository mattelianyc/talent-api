import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  }
});

export interface User extends mongoose.Document {
  email: string;
  password: string;
}

// Create and export the User model
export const UserModel = mongoose.model<User>('User', UserSchema);
