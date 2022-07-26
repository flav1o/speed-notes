import * as mongoose from 'mongoose';

export const ProblemSchema = new mongoose.Schema(
  {
    content: String,
    isLocked: Boolean,
    isPublic: Boolean,
  },
  { timestamps: true, versionKey: false },
);
