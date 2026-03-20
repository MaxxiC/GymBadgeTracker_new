// File: src/models/FileOut.ts
//
// Represents the processed output file generated from a FileIn elaboration.
//
// ── STORAGE STRATEGY ────────────────────────────────────────────────────────
// Same strategy as FileIn: storage_type discriminator allows easy migration
// from MongoDB Buffer → Cloudflare R2 URL without changing the schema shape.
// ─────────────────────────────────────────────────────────────────────────────

import mongoose, { Schema, Document, Types } from "mongoose";
import type { StorageBackend } from "./FileIn";

export interface IFileOut extends Document {
  user_id: Types.ObjectId;
  file_in_id: Types.ObjectId; // Reference to the originating FileIn document

  // ─── Identity ─────────────────────────────────────────────────────────────
  file_name: string;
  file_size_kb: number;

  // ─── Storage (mutually exclusive) ─────────────────────────────────────────
  storage_type: StorageBackend;
  file_data?: Buffer;  // Used when storage_type = 'mongodb'
  file_url?: string;   // Used when storage_type = 'r2' | 'vercel_blob'

  // ─── Usage Tracking ───────────────────────────────────────────────────────
  n_downloads: number;
  created_at: Date;
}

const FileOutSchema = new Schema<IFileOut>({
  user_id:    { type: Schema.Types.ObjectId, ref: "User", required: true },
  file_in_id: { type: Schema.Types.ObjectId, ref: "FileIn", required: true },

  file_name:    { type: String, required: true },
  file_size_kb: { type: Number, default: 0 },

  storage_type: { type: String, enum: ["mongodb", "r2", "vercel_blob"], default: "mongodb", required: true },
  file_data:    { type: Buffer },
  file_url:     { type: String },

  n_downloads: { type: Number, default: 0 },
  created_at:  { type: Date, default: Date.now },
});

export default mongoose.models.FileOut || mongoose.model<IFileOut>("FileOut", FileOutSchema);
