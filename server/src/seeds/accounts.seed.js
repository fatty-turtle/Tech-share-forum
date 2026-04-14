import bcrypt from "bcrypt";

const HASH_ROUNDS = 10;

async function seedAccounts(conn) {
  const users = [
    {
      email: "alice@techshare.com",
      password: "password123",
      username: "alice_dev",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
      bio: "Full-stack dev. Loves React and Node.",
      reputation: 420,
      role: "USER",
    },
    {
      email: "bob@techshare.com",
      password: "password123",
      username: "bob_codes",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
      bio: "Backend engineer. Go and Rust enthusiast.",
      reputation: 350,
      role: "USER",
    },
    {
      email: "carol@techshare.com",
      password: "password123",
      username: "carol_ui",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol",
      bio: "UI/UX designer who codes. Tailwind forever.",
      reputation: 280,
      role: "USER",
    },
    {
      email: "dan@techshare.com",
      password: "password123",
      username: "dan_devops",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dan",
      bio: "DevOps & cloud infra. AWS certified.",
      reputation: 510,
      role: "USER",
    },
    {
      email: "eva@techshare.com",
      password: "password123",
      username: "eva_ml",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eva",
      bio: "ML engineer. Python, PyTorch, and coffee.",
      reputation: 290,
      role: "USER",
    },
    {
      email: "frank@techshare.com",
      password: "password123",
      username: "frank_mobile",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=frank",
      bio: "React Native & Flutter dev.",
      reputation: 220,
      role: "USER",
    },
    {
      email: "grace@techshare.com",
      password: "password123",
      username: "grace_sec",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace",
      bio: "Security researcher. CTF player.",
      reputation: 460,
      role: "USER",
    },
    {
      email: "henry@techshare.com",
      password: "password123",
      username: "henry_db",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=henry",
      bio: "Database architect. SQL and NoSQL.",
      reputation: 380,
      role: "USER",
    },
  ];

  console.log("[Seed] Seeding accounts & users...");

  for (const u of users) {
    const [[existing]] = await conn.query(
      "SELECT account_id FROM accounts WHERE email = ?",
      [u.email],
    );
    if (existing) continue;

    const hash = await bcrypt.hash(u.password, HASH_ROUNDS);

    const [{ insertId: accountId }] = await conn.query(
      `INSERT INTO accounts (email, password, role, is_active)
       VALUES (?, ?, ?, true)`,
      [u.email, hash, u.role],
    );

    await conn.query(
      `INSERT INTO users (account_id, username, avatar, bio, reputation)
       VALUES (?, ?, ?, ?, ?)`,
      [accountId, u.username, u.avatar, u.bio, u.reputation],
    );
  }

  console.log("[Seed] Accounts & users done.");
}

export { seedAccounts };
