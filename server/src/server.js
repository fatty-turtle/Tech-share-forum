import dotenv from "dotenv";
import { initDB, getPool, setDB } from "./config/db.config.js";

dotenv.config();

const PORT = process.env.SERVER_PORT;
const APP_URL = process.env.APP_URL;

/**
 * Starts the Express server and initializes the database
 * @returns {Promise<void>}
 */
async function startServer() {
  try {
    await initDB();
    const pool = await getPool();
    await setDB(pool);

    const app = (await import("./app.js")).default;

    app.listen(PORT, () => {
      console.log(`Server running at ${APP_SERVER_URL}:${PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1);
  }
}

startServer();
