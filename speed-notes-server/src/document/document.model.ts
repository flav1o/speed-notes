import * as mongoose from 'mongoose';

export const DocumentSchema = new mongoose.Schema(
  {
    owner: String,
    content: String,
    isLocked: Boolean,
    isPublic: Boolean,
    ableToEdit: [String],
  },
  { timestamps: true, versionKey: false },
);
