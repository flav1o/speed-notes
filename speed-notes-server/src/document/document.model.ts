import * as mongoose from 'mongoose';

export const ProblemSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    content: String,
    isLocked: Boolean,
    isPublic: Boolean,
  },
  { timestamps: true, versionKey: false },
);
