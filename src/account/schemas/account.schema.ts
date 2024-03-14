import * as mongoose from 'mongoose';

const PayoutSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
});

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  // You can include more details specific to the transaction here
});

const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, required: true },
  transactions: [TransactionSchema],
  // Fields specific to talent accounts
  userType: { type: String, enum: ['regular', 'talent'], required: true },
  revenue: { type: Number, default: 0 }, // Specific to talent users
  payouts: [PayoutSchema], // Specific to talent users to manage payouts
});

interface Transaction extends mongoose.Document {
  amount: number;
  date: Date;
  description: string;
}

interface Payout extends mongoose.Document {
  amount: number;
  date: Date;
  description: string;
}

interface Account extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  balance: number;
  transactions: Transaction[];
  userType: 'regular' | 'talent';
  revenue?: number;
  payouts?: Payout[];
}

const AccountModel = mongoose.model<Account>('Account', AccountSchema);

export { AccountSchema, TransactionSchema, PayoutSchema, AccountModel, Transaction, Account, Payout };
