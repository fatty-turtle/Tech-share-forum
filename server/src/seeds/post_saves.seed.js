async function seedPostSaves(conn) {
  const saves = [
    {
      postTitle:
        "Building a REST API with Node.js, Express, and TypeScript from scratch",
      username: "alice_dev",
    },
    {
      postTitle: "SQL indexing explained — stop writing slow queries",
      username: "bob_codes",
    },
    {
      postTitle: "Dockerizing a Node.js app — the right way",
      username: "dan_devops",
    },
    // Add more examples
  ];

  console.log("[Seed] Seeding post saves/bookmarks...");

  for (const s of saves) {
    const [[post]] = await conn.query(
      "SELECT post_id FROM posts WHERE title = ?",
      [s.postTitle],
    );
    const [[user]] = await conn.query(
      "SELECT user_id FROM users WHERE username = ?",
      [s.username],
    );
    if (!post || !user) continue;

    await conn.query(
      `INSERT INTO post_saves (post_id, user_id)
       VALUES (?, ?) ON DUPLICATE KEY UPDATE post_id = post_id`,
      [post.post_id, user.user_id],
    );
  }

  console.log("[Seed] Post saves done.");
}

export { seedPostSaves };
