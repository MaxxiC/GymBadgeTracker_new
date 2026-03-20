// File: src/models/FileStatistics.ts
//
// ⚠️  DEPRECATED — This model is no longer in use.
//
// All statistics (rows_total, rows_processed, people_processed) have been
// merged directly into FileIn.ts for simplicity.
//
// This file is kept as a placeholder to avoid breaking any potential old
// references, but no new documents should be written to this collection.
//
// Safe to delete once you've confirmed no old data relies on it.

import mongoose, { Schema } from "mongoose";

const FileStatisticsSchema = new Schema({
  _deprecated: { type: Boolean, default: true },
});

export default mongoose.models.FileStatistics ||
  mongoose.model("FileStatistics", FileStatisticsSchema);
