// File: src/models/FileIn.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFileIn extends Document {
  user_id: Types.ObjectId; // Collegamento al modello User
  file_name: string;
  file_data: Buffer;
  //file_path: string;
  sheet_used_name?: string;
  rows_processed: number;
  tot_row_processed: number;
  people_processed: string | null;
  total_people_processed: number;
  created_at: Date;
  deleted: boolean;
  deleted_date: Date | null;
  filters_used: string | null;
}

const FileInSchema = new Schema<IFileIn>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  file_name: { type: String, required: true },
  file_data: { type: Buffer, required: true },
  //file_path: { type: String, required: true }, // esempio: "/uploads/user123/fileA.xlsx"
  sheet_used_name: { type: String, default: "" },
  rows_processed: { type: Number, default: 0 },
  tot_row_processed: { type: Number, default: 0 },
  people_processed: { type: String, default: null },
  //people_processed: { type: [String], default: [] },
  total_people_processed: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  deleted_date: { type: Date, default: null },
  filters_used: { type: String, default: null },
});

export default mongoose.models.FileIn || mongoose.model<IFileIn>("FileIn", FileInSchema);
