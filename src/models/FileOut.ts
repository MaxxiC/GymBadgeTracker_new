// File: src/models/FileOut.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFileOut extends Document {
  user_id: Types.ObjectId; // Collegamento al modello User
  file_id: Types.ObjectId; // Collegamento al modello FileIn
  file_name: string;
  file_data: Buffer;
  //file_path: string;
  n_download: number;
  created_at: Date;
}

const FileOutSchema = new Schema<IFileOut>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  file_id: { type: Schema.Types.ObjectId, ref: 'FileIn', required: true },
  file_name: { type: String, required: true },
  file_data: { type: Buffer, required: true },
  //file_path: { type: String, required: true },
  n_download: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.FileOut || mongoose.model<IFileOut>("FileOut", FileOutSchema);
