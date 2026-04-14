async function seedComments(conn) {
  const comments = [
    {
      postTitle: "What's your go-to stack for a new SaaS project in 2024?",
      username: "bob_codes",
      content:
        "I've been using Next.js + tRPC + Prisma + PostgreSQL and the DX is incredible. Highly recommend tRPC if you're doing full-stack TypeScript.",
    },
    {
      postTitle: "What's your go-to stack for a new SaaS project in 2024?",
      username: "dan_devops",
      content:
        "Separate API is the way to go if you ever want to add a mobile app or third-party integrations. Next.js is great for the frontend though.",
    },
    // Add other comments from original major.seed.js
    {
      postTitle:
        "Building a REST API with Node.js, Express, and TypeScript from scratch",
      username: "alice_dev",
      content:
        "This is exactly the resource I was looking for. One question — are you using zod for request validation or something else?",
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
      `INSERT INTO comments (post_id, author_id, content)
       VALUES (?, ?, ?)`,
      [post.post_id, author.user_id, c.content],
    );
  }

  console.log("[Seed] Comments done.");
}

export { seedComments };
