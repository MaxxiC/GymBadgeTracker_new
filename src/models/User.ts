// File: src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password_hash: string;
  profile_image?: Buffer;
  created_at: Date;
  first_login: Date | null;
  latest_login: Date | null;
  total_login: number;
  n_usage_total: number;
  user_type?: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  profile_image: { type: Buffer },
  created_at: { type: Date, default: Date.now },
  first_login: { type: Date, default: null },
  latest_login: { type: Date, default: null },
  total_login: { type: Number, default: 0 },
  n_usage_total: { type: Number, default: 0 },
  user_type: { type: String },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
