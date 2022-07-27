import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    confirmationCode: String,
    confirmed: Boolean,
  },
  { timestamps: true, versionKey: false },
);
