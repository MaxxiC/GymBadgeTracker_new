// File: src/models/Logger.ts
//
// Audit log for all significant user actions in the system.
// Admin can query these to see who did what and when.

import mongoose, { Schema, Document, Types } from "mongoose";

export type LogType =
  | "upload"      // User uploaded a file
  | "process"     // User ran an elaboration
  | "download"    // User downloaded a result
  | "delete"      // User or admin deleted a file
  | "login"       // User logged in
  | "logout"      // User logged out
  | "credit_add"  // Admin added credits to a user
  | "error"       // A server-side error occurred
  | "other";

export interface ILogger extends Document {
  // ─── Who ──────────────────────────────────────────────────────────────────
  user_id: Types.ObjectId;     // Ref to User — robust, survives username changes
  user_username: string;       // Denormalized snapshot for fast display (no join needed)

  // ─── What ─────────────────────────────────────────────────────────────────
  log_type: LogType;
  log_message: string;

  // ─── Context (optional) ───────────────────────────────────────────────────
  file_in_id?: Types.ObjectId; // If the action relates to a specific file
  metadata?: Record<string, any>; // Arbitrary extra data (e.g. filters applied, rows count)

  created_at: Date;
}

const LoggerSchema = new Schema<ILogger>({
  user_id:      { type: Schema.Types.ObjectId, ref: "User", required: true },
  user_username: { type: String, required: true },

  log_type: {
    type: String,
    enum: ["upload", "process", "download", "delete", "login", "logout", "credit_add", "error", "other"],
    required: true,
  },
  log_message: { type: String, required: true },

  file_in_id: { type: Schema.Types.ObjectId, ref: "FileIn" },
  metadata:   { type: Schema.Types.Mixed },

  created_at: { type: Date, default: Date.now },
});

// Index for fast admin queries: get all logs for a user sorted by date
LoggerSchema.index({ user_id: 1, created_at: -1 });
LoggerSchema.index({ log_type: 1, created_at: -1 });

export default mongoose.models.Logger || mongoose.model<ILogger>("Logger", LoggerSchema);
