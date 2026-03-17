import bcrypt from "bcrypt";

/**
 * Seeds an admin user account in the database
 * @param {Object} conn - Database connection
 * @returns {Promise<void>}
 */
async function seedAdmin(conn) {
  const { ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log(" Admin env vars not set. Skipping admin seed.");
    return;
  }

  // Check existing admin account
  const [[existing]] = await conn.query(
    "SELECT account_id FROM accounts WHERE email = ?",
    [ADMIN_EMAIL],
  );

  if (existing) {
    console.log(" Admin already exists");
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  // Create account with ADMIN role
  const [accountResult] = await conn.query(
    `INSERT INTO accounts (email, password, role, is_active)
     VALUES (?, ?, 'ADMIN', true)`,
    [ADMIN_EMAIL, passwordHash],
  );

  const accountId = accountResult.insertId;

  // Create user profile linked to account
  await conn.query(
    `INSERT INTO users (account_id, username)
     VALUES (?, ?)`,
    [accountId, ADMIN_USERNAME || "Admin"],
  );

  console.log("[Server] Admin account seeded");
}

export { seedAdmin };
