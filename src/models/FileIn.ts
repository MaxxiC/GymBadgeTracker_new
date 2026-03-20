// File: src/models/FileIn.ts
//
// Represents an uploaded input file (the original Excel from the client).
//
// ── STORAGE STRATEGY ────────────────────────────────────────────────────────
// Currently: file binary is stored in MongoDB as Buffer (simple, works for MVP).
// FUTURE MIGRATION (Phase 5+): switch to Cloudflare R2 (or Vercel Blob).
//   → Set STORAGE_BACKEND=r2 in .env
//   → Stop writing file_data, start writing file_url instead
//   → Only 'file_url' OR 'file_data' will be populated at any time (mutually exclusive)
// ─────────────────────────────────────────────────────────────────────────────

import mongoose, { Schema, Document, Types } from "mongoose";

export type StorageBackend = "mongodb" | "r2" | "vercel_blob";

export interface IFileIn extends Document {
  user_id: Types.ObjectId;

  // ─── Identity ─────────────────────────────────────────────────────────────
  file_name: string;
  file_size_kb: number;

  // ─── Storage (mutually exclusive — only one will be set) ──────────────────
  storage_type: StorageBackend; // Indicates where the file lives
  file_data?: Buffer;           // Used when storage_type = 'mongodb'
  file_url?: string;            // Used when storage_type = 'r2' | 'vercel_blob'

  // ─── Processing Info ──────────────────────────────────────────────────────
  sheet_used_name: string;
  filters_used: string[];         // Array of selected filter values (from the Attività column)
  rows_total: number;             // Total rows read from the sheet (excluding header)
  rows_processed: number;         // Rows that matched the selected filters
  people_processed: number;       // Unique members (Num. Tessera) in the filtered dataset

  // ─── Lifecycle ───────────────────────────────────────────────────────────
  created_at: Date;
  deleted: boolean;
  deleted_at: Date | null;
}

const FileInSchema = new Schema<IFileIn>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },

  file_name:    { type: String, required: true },
  file_size_kb: { type: Number, default: 0 },

  storage_type: { type: String, enum: ["mongodb", "r2", "vercel_blob"], default: "mongodb", required: true },
  file_data:    { type: Buffer },   // Only populated when storage_type === 'mongodb'
  file_url:     { type: String },   // Only populated when storage_type !== 'mongodb'

  sheet_used_name:  { type: String, default: "" },
  filters_used:     { type: [String], default: [] },
  rows_total:       { type: Number, default: 0 },
  rows_processed:   { type: Number, default: 0 },
  people_processed: { type: Number, default: 0 },

  created_at: { type: Date, default: Date.now },
  deleted:    { type: Boolean, default: false },
  deleted_at: { type: Date, default: null },
});

export default mongoose.models.FileIn || mongoose.model<IFileIn>("FileIn", FileInSchema);
