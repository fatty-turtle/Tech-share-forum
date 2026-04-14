async function seedPosts(conn) {
  const posts = [
    {
      username: "alice_dev",
      title: "What's your go-to stack for a new SaaS project in 2024?",
      content: `Starting a new SaaS and trying to decide between Next.js + Prisma + PostgreSQL vs a more decoupled approach with a separate Express API. Would love to hear what stacks people are using and why. Performance, DX, and scalability are my main concerns.`,
      tags: ["nextjs", "typescript", "sql"],
      status: "PUBLISHED",
      is_pinned: false,
    },
    {
      username: "bob_codes",
      title:
        "Building a REST API with Node.js, Express, and TypeScript from scratch",
      content: `In this tutorial we'll set up a production-ready Express API with TypeScript, covering project structure, middleware, error handling, and deployment. We'll also add JWT authentication and connect to a MySQL database using a connection pool.`,
      tags: ["nodejs", "typescript", "sql"],
      status: "PUBLISHED",
      is_pinned: false,
    },
    {
      username: "dan_devops",
      title: "Dockerizing a Node.js app — the right way",
      content: `Most Docker tutorials skip the important details: multi-stage builds, non-root users, .dockerignore, and health checks. This guide covers all of them with a real Node.js + Express app as the example.`,
      tags: ["docker", "nodejs", "typescript"],
      status: "PUBLISHED",
      is_pinned: false,
    },
    {
      username: "eva_ml",
      title: "PyTorch vs TensorFlow in 2024 — is the gap closing?",
      content: `PyTorch has dominated research for years but TensorFlow/Keras has been catching up in DX. I've been using both on production projects and wanted to share my thoughts and hear from others in the community.`,
      tags: ["python"],
      status: "PUBLISHED",
      is_pinned: false,
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
      `INSERT INTO posts (author_id, title, content, status, is_pinned)
       VALUES (?, ?, ?, ?, ?)`,
      [author.user_id, p.title, p.content, p.status, p.is_pinned],
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
         VALUES (?, ?) ON DUPLICATE KEY UPDATE post_id = post_id`,
        [postId, tag.tag_id],
      );

      await conn.query(
        "UPDATE tags SET usage_count = usage_count + 1 WHERE tag_id = ?",
        [tag.tag_id],
      );
    }
  }

  console.log("[Seed] Posts done.");
}

export { seedPosts };
