// File: src/lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI non definita nelle variabili d’ambiente');
}

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connessione a MongoDB riuscita!");
  } catch (error) {
    console.error("❌ Errore nella connessione a MongoDB:", error);
  }
};

