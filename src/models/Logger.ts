// File: src/models/Logger.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface ILogger extends Document {
    user_username: string; // Nel backend originale era una stringa non ObjectId
    log_type: 'upload' | 'download' | 'delete' | 'login' | 'error' | 'other';
    log_message: string;
    created_at: Date;
}

const LoggerSchema = new Schema<ILogger>({
    user_username: { type: String, required: true },
    log_type: {
        type: String,
        enum: ['upload', 'download', 'delete', 'login', 'error', 'other'],
        required: true
    },
    log_message: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Logger || mongoose.model<ILogger>("Logger", LoggerSchema);
