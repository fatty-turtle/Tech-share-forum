import bcrypt from "bcrypt";

const HASH_ROUNDS = 10;

// ─── ACCOUNTS & USERS ────────────────────────────────────────────

async function seedAccounts(conn) {
  const users = [
    {
      email: "alice@techshare.com",
      password: "password123",
      username: "alice_dev",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
      bio: "Full-stack dev. Loves React and Node.",
      role: "USER",
    },
    {
      email: "bob@techshare.com",
      password: "password123",
      username: "bob_codes",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
      bio: "Backend engineer. Go and Rust enthusiast.",
      role: "USER",
    },
    {
      email: "carol@techshare.com",
      password: "password123",
      username: "carol_ui",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol",
      bio: "UI/UX designer who codes. Tailwind forever.",
      role: "USER",
    },
    {
      email: "dan@techshare.com",
      password: "password123",
      username: "dan_devops",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dan",
      bio: "DevOps & cloud infra. AWS certified.",
      role: "USER",
    },
    {
      email: "eva@techshare.com",
      password: "password123",
      username: "eva_ml",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eva",
      bio: "ML engineer. Python, PyTorch, and coffee.",
      role: "USER",
    },
    {
      email: "frank@techshare.com",
      password: "password123",
      username: "frank_mobile",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=frank",
      bio: "React Native & Flutter dev.",
      role: "USER",
    },
    {
      email: "grace@techshare.com",
      password: "password123",
      username: "grace_sec",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace",
      bio: "Security researcher. CTF player.",
      role: "USER",
    },
    {
      email: "henry@techshare.com",
      password: "password123",
      username: "henry_db",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=henry",
      bio: "Database architect. SQL and NoSQL.",
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
      `INSERT INTO users (account_id, username, avatar, bio)
       VALUES (?, ?, ?, ?)`,
      [accountId, u.username, u.avatar, u.bio],
    );
  }

  console.log("[Seed] Accounts & users done.");
}

// ─── TAGS ────────────────────────────────────────────────────────

async function seedTags(conn) {
  const tags = [
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "nodejs",
    "python",
    "docker",
    "kubernetes",
    "aws",
    "sql",
    "mongodb",
    "graphql",
    "tailwindcss",
    "git",
    "rust",
  ];

  console.log("[Seed] Seeding tags...");

  for (const name of tags) {
    await conn.query(
      `INSERT INTO tags (name) VALUES (?)
       ON DUPLICATE KEY UPDATE name = name`,
      [name],
    );
  }

  console.log("[Seed] Tags done.");
}

// ─── POSTS ───────────────────────────────────────────────────────

async function seedPosts(conn) {
  const posts = [
    {
      username: "alice_dev",
      type: "DISCUSSION",
      title: "What's your go-to stack for a new SaaS project in 2024?",
      content: `Starting a new SaaS and trying to decide between Next.js + Prisma + PostgreSQL vs a more decoupled approach with a separate Express API. Would love to hear what stacks people are using and why. Performance, DX, and scalability are my main concerns.`,
      tags: ["nextjs", "typescript", "sql"],
      views: 312,
      likes: 45,
    },
    {
      username: "bob_codes",
      type: "TUTORIAL",
      title:
        "Building a REST API with Node.js, Express, and TypeScript from scratch",
      content: `In this tutorial we'll set up a production-ready Express API with TypeScript, covering project structure, middleware, error handling, and deployment. We'll also add JWT authentication and connect to a MySQL database using a connection pool.`,
      tags: ["nodejs", "typescript", "sql"],
      views: 890,
      likes: 120,
    },
    {
      username: "dan_devops",
      type: "TUTORIAL",
      title: "Dockerizing a Node.js app — the right way",
      content: `Most Docker tutorials skip the important details: multi-stage builds, non-root users, .dockerignore, and health checks. This guide covers all of them with a real Node.js + Express app as the example.`,
      tags: ["docker", "nodejs", "typescript"],
      views: 654,
      likes: 98,
    },
    {
      username: "eva_ml",
      type: "DISCUSSION",
      title: "PyTorch vs TensorFlow in 2024 — is the gap closing?",
      content: `PyTorch has dominated research for years but TensorFlow/Keras has been catching up in DX. I've been using both on production projects and wanted to share my thoughts and hear from others in the community.`,
      tags: ["python"],
      views: 430,
      likes: 67,
    },
    {
      username: "carol_ui",
      type: "TUTORIAL",
      title: "Mastering Tailwind CSS: from basics to custom design systems",
      content: `Tailwind is more than utility classes. This tutorial covers building a consistent design system with CSS variables, extending the config, creating reusable component patterns, and avoiding the most common pitfalls.`,
      tags: ["tailwindcss", "react", "typescript"],
      views: 720,
      likes: 110,
    },
    {
      username: "grace_sec",
      type: "DISCUSSION",
      title: "Common JWT mistakes that open security vulnerabilities",
      content: `After reviewing dozens of codebases I keep seeing the same JWT mistakes: storing in localStorage, no expiry, weak secrets, and skipping signature verification. Let's talk through each one and how to fix them.`,
      tags: ["javascript", "nodejs"],
      views: 540,
      likes: 89,
    },
    {
      username: "henry_db",
      type: "TUTORIAL",
      title: "SQL indexing explained — stop writing slow queries",
      content: `Indexes are one of the most misunderstood parts of SQL. This guide breaks down B-tree vs hash indexes, composite indexes, when NOT to index, how to read EXPLAIN output, and real before/after query benchmarks.`,
      tags: ["sql", "mongodb"],
      views: 980,
      likes: 145,
    },
    {
      username: "frank_mobile",
      type: "EVENT",
      title: "TechShare Monthly Meetup — React Native deep dive",
      content: `Join us for our monthly virtual meetup! This month we're doing a deep dive into React Native's new architecture (JSI, Fabric, TurboModules). Frank will demo a real app migration and there'll be open Q&A.`,
      tags: ["react"],
      views: 210,
      likes: 34,
    },
    {
      username: "alice_dev",
      type: "DISCUSSION",
      title:
        "How do you manage environment variables across dev, staging, and prod?",
      content: `Been burned too many times by environment config issues. Currently using .env files with dotenv but thinking about moving to something like Doppler or AWS Parameter Store. What are you using?`,
      tags: ["docker", "aws", "nodejs"],
      views: 275,
      likes: 41,
    },
    {
      username: "bob_codes",
      type: "TUTORIAL",
      title: "Getting started with Rust — a guide for JavaScript developers",
      content: `Rust's learning curve is steep but the payoff is huge. This guide is written specifically for JS developers and maps familiar concepts (closures, async, modules) to their Rust equivalents, while explaining ownership in plain English.`,
      tags: ["rust", "javascript"],
      views: 510,
      likes: 76,
    },
  ];

  console.log("[Seed] Seeding posts...");

  for (const p of posts) {
    const [[author]] = await conn.query(
      "SELECT user_id FROM users WHERE username = ?",
      [p.username],
    );
    if (!author) continue;

    const [{ insertId: postId }] = await conn.query(
      `INSERT INTO posts (author_id, type, title, content, view_count, like_count)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [author.user_id, p.type, p.title, p.content, p.views, p.likes],
    );

    // Attach tags
    for (const tagName of p.tags) {
      const [[tag]] = await conn.query(
        "SELECT tag_id FROM tags WHERE name = ?",
        [tagName],
      );
      if (!tag) continue;

      await conn.query(
        `INSERT INTO posts_tags (post_id, tag_id)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE post_id = post_id`,
        [postId, tag.tag_id],
      );

      // Increment tag post_count
      await conn.query(
        "UPDATE tags SET post_count = post_count + 1 WHERE tag_id = ?",
        [tag.tag_id],
      );
    }
  }

  console.log("[Seed] Posts done.");
}

// ─── COMMENTS ────────────────────────────────────────────────────

async function seedComments(conn) {
  const comments = [
    // Post 1 — SaaS stack discussion
    {
      postTitle: "What's your go-to stack for a new SaaS project in 2024?",
      username: "bob_codes",
      content:
        "I've been using Next.js + tRPC + Prisma + PostgreSQL and the DX is incredible. Highly recommend tRPC if you're doing full-stack TypeScript.",
      likes: 12,
    },
    {
      postTitle: "What's your go-to stack for a new SaaS project in 2024?",
      username: "dan_devops",
      content:
        "Separate API is the way to go if you ever want to add a mobile app or third-party integrations. Next.js is great for the frontend though.",
      likes: 8,
    },
    {
      postTitle: "What's your go-to stack for a new SaaS project in 2024?",
      username: "carol_ui",
      content:
        "Don't forget about deployment complexity. A monorepo with Turborepo keeps things manageable when you go decoupled.",
      likes: 5,
    },

    // Post 2 — Express TypeScript tutorial
    {
      postTitle:
        "Building a REST API with Node.js, Express, and TypeScript from scratch",
      username: "alice_dev",
      content:
        "This is exactly the resource I was looking for. One question — are you using zod for request validation or something else?",
      likes: 9,
    },
    {
      postTitle:
        "Building a REST API with Node.js, Express, and TypeScript from scratch",
      username: "frank_mobile",
      content:
        "Great tutorial! Would love a follow-up covering refresh token rotation.",
      likes: 7,
    },
    {
      postTitle:
        "Building a REST API with Node.js, Express, and TypeScript from scratch",
      username: "grace_sec",
      content:
        "Nice guide. One tip — make sure to set the JWT secret to at least 256 bits of entropy in production.",
      likes: 14,
    },

    // Post 3 — Docker tutorial
    {
      postTitle: "Dockerizing a Node.js app — the right way",
      username: "henry_db",
      content:
        "The multi-stage build section saved me so much image bloat. Went from 1.2GB to 180MB.",
      likes: 22,
    },
    {
      postTitle: "Dockerizing a Node.js app — the right way",
      username: "eva_ml",
      content:
        "The non-root user tip is something so many tutorials skip. Really important for production security.",
      likes: 17,
    },

    // Post 6 — JWT security
    {
      postTitle: "Common JWT mistakes that open security vulnerabilities",
      username: "alice_dev",
      content:
        "The localStorage issue is huge. Switched to httpOnly cookies and it made a big difference in our security audit.",
      likes: 18,
    },
    {
      postTitle: "Common JWT mistakes that open security vulnerabilities",
      username: "henry_db",
      content:
        "What's your take on refresh token families to prevent reuse attacks?",
      likes: 6,
    },

    // Post 7 — SQL indexing
    {
      postTitle: "SQL indexing explained — stop writing slow queries",
      username: "bob_codes",
      content:
        "The composite index ordering explanation finally clicked for me. Great breakdown.",
      likes: 11,
    },
    {
      postTitle: "SQL indexing explained — stop writing slow queries",
      username: "dan_devops",
      content:
        "EXPLAIN output section is gold. I use this all the time and still learned something new.",
      likes: 9,
    },
    {
      postTitle: "SQL indexing explained — stop writing slow queries",
      username: "alice_dev",
      content:
        "Would you cover covering indexes in a follow-up? That's where things get really interesting.",
      likes: 8,
    },
  ];

  console.log("[Seed] Seeding comments...");

  for (const c of comments) {
    const [[post]] = await conn.query(
      "SELECT post_id FROM posts WHERE title = ?",
      [c.postTitle],
    );
    const [[author]] = await conn.query(
      "SELECT user_id FROM users WHERE username = ?",
      [c.username],
    );
    if (!post || !author) continue;

    await conn.query(
      `INSERT INTO comments (post_id, author_id, content, like_count)
       VALUES (?, ?, ?, ?)`,
      [post.post_id, author.user_id, c.content, c.likes],
    );
  }

  console.log("[Seed] Comments done.");
}

// ─── POST LIKES ──────────────────────────────────────────────────

async function seedPostLikes(conn) {
  // Map: post title → usernames who liked it
  const likes = [
    {
      postTitle: "What's your go-to stack for a new SaaS project in 2024?",
      usernames: ["bob_codes", "carol_ui", "dan_devops", "eva_ml"],
    },
    {
      postTitle:
        "Building a REST API with Node.js, Express, and TypeScript from scratch",
      usernames: [
        "alice_dev",
        "carol_ui",
        "frank_mobile",
        "grace_sec",
        "henry_db",
      ],
    },
    {
      postTitle: "Dockerizing a Node.js app — the right way",
      usernames: ["alice_dev", "bob_codes", "eva_ml", "henry_db"],
    },
    {
      postTitle: "SQL indexing explained — stop writing slow queries",
      usernames: [
        "alice_dev",
        "bob_codes",
        "carol_ui",
        "dan_devops",
        "frank_mobile",
        "grace_sec",
      ],
    },
    {
      postTitle: "Mastering Tailwind CSS: from basics to custom design systems",
      usernames: ["alice_dev", "bob_codes", "frank_mobile"],
    },
    {
      postTitle: "Common JWT mistakes that open security vulnerabilities",
      usernames: ["alice_dev", "bob_codes", "dan_devops", "henry_db"],
    },
  ];

  console.log("[Seed] Seeding post likes...");

  for (const { postTitle, usernames } of likes) {
    const [[post]] = await conn.query(
      "SELECT post_id FROM posts WHERE title = ?",
      [postTitle],
    );
    if (!post) continue;

    for (const username of usernames) {
      const [[user]] = await conn.query(
        "SELECT user_id FROM users WHERE username = ?",
        [username],
      );
      if (!user) continue;

      await conn.query(
        `INSERT IGNORE INTO post_likes (post_id, user_id) VALUES (?, ?)`,
        [post.post_id, user.user_id],
      );
    }
  }

  console.log("[Seed] Post likes done.");
}

// ─── RUNNER ──────────────────────────────────────────────────────

async function seedAll(conn) {
  await seedAccounts(conn);
  await seedTags(conn);
  await seedPosts(conn);
  await seedComments(conn);
  await seedPostLikes(conn);
  console.log("[Seed] All done ✓");
}

export {
  seedAll,
  seedAccounts,
  seedTags,
  seedPosts,
  seedComments,
  seedPostLikes,
};
