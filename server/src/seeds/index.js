import { getPool, initDB } from "../config/db.config.js";
import { seedAdmin } from "./admin.seed.js";
import { seedAccounts } from "./accounts.seed.js";
import { seedTags } from "./tags.seed.js";
import { seedPosts } from "./posts.seed.js";
import { seedComments } from "./comments.seed.js";
import { seedPostReactions } from "./post_reactions.seed.js";
import { seedCommentReactions } from "./comment_reactions.seed.js";
import { seedPostSaves } from "./post_saves.seed.js";
import { seedNotifications } from "./notifications.seed.js";

async function runSeeds() {
  try {
    await initDB();
    const pool = getPool();
    const conn = await pool.getConnection();

    await conn.beginTransaction();

    await seedAdmin(conn);
    await seedAccounts(conn);
    await seedTags(conn);
    await seedPosts(conn);
    await seedComments(conn);
    await seedPostReactions(conn);
    await seedCommentReactions(conn);
    await seedPostSaves(conn);
    await seedNotifications(conn);
    await conn.commit();
    console.log("[Server] Seeds completed successfully");
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

runSeeds();
