import Logger from "@/models/Logger"; // Assicurati che il model Logger sia tipizzato correttamente
import { connectToDatabase } from "@/lib/mongodb"; // Se necessario, per sicurezza

export async function createLogDB(
  userUsername: string,
  logType: "upload" | "download" | "delete" | "login" | "error" | "other",
  logMessage: string
): Promise<void> {
  try {
    await connectToDatabase(); // Potresti ometterlo se già connesso in precedenza

    const newLog = new Logger({
      user_username: userUsername,
      log_type: logType,
      log_message: logMessage,
      created_at: new Date(),
    });

    await newLog.save();
    console.log(`📄 Log creato: ${userUsername} - ${logType} - ${logMessage}`);
  } catch (error) {
    console.error("❌ Errore durante la creazione del log:", error);
  }
}
