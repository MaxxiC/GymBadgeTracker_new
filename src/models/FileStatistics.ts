// File: src/models/FileStatistics.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFileStatistics extends Document {
  file_id: Types.ObjectId; // Riferimento al file originale (FileIn)
  total_rows: number;
  processed_rows: number;
  created_at: Date;
}

const FileStatisticsSchema = new Schema<IFileStatistics>({
  file_id: { type: Schema.Types.ObjectId, ref: 'FileIn', required: true },
  total_rows: { type: Number, required: true },
  processed_rows: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.FileStatistics || mongoose.model<IFileStatistics>("FileStatistics", FileStatisticsSchema);
