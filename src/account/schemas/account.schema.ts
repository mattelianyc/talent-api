// src/account/schemas/account.schema.ts
import * as mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balance: { type: Number, required: true },
  transactions: [TransactionSchema], // Embedding the transactions here
});

interface Transaction extends mongoose.Document {
  description: string;
  amount: number;
  date: Date;
}

interface Account extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  balance: number;
  transactions: Transaction[];
}

const AccountModel = mongoose.model<Account>('Account', AccountSchema);

export { AccountSchema, TransactionSchema, AccountModel, Transaction, Account };
