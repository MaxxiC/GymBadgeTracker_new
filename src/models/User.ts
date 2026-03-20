// File: src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password_hash: string;

  // ─── Auth & Roles ─────────────────────────────────────────────────────────
  // NOTE: role is also embedded in the JWT payload.
  // Values: 'admin' (full access) | 'user' (standard client/palestra)
  role: "admin" | "user";

  // ─── Credit System ────────────────────────────────────────────────────────
  // n_usage_remaining: credits left to use (decremented on each successful elaboration)
  // n_usage_total: lifetime total elaborations performed (never decremented)
  n_usage_remaining: number;
  n_usage_total: number;

  // ─── Profile ──────────────────────────────────────────────────────────────
  profile_image?: Buffer; // TODO: migrate to external URL (Cloudflare R2) in Phase 5+

  // ─── Session Tracking ─────────────────────────────────────────────────────
  created_at: Date;
  first_login: Date | null;
  latest_login: Date | null;
  total_login: number;

  // ─── Optional metadata ────────────────────────────────────────────────────
  // e.g. company name of the palestra
  company_name?: string;
}

const UserSchema = new Schema<IUser>({
  username:       { type: String, required: true, unique: true },
  email:          { type: String, required: true, unique: true },
  password_hash:  { type: String, required: true },

  role:               { type: String, enum: ["admin", "user"], default: "user", required: true },
  n_usage_remaining:  { type: Number, default: 0 },
  n_usage_total:      { type: Number, default: 0 },

  profile_image: { type: Buffer },

  created_at:   { type: Date, default: Date.now },
  first_login:  { type: Date, default: null },
  latest_login: { type: Date, default: null },
  total_login:  { type: Number, default: 0 },

  company_name: { type: String },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
