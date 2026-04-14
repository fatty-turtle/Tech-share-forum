async function seedPostReactions(conn) {
  // Example reactions: post title → usernames → reaction_type
  const reactions = [
    {
      postTitle: "What's your go-to stack for a new SaaS project in 2024?",
      reactions: [
        { username: "bob_codes", type: "LIKE" },
        { username: "carol_ui", type: "LIKE" },
        { username: "dan_devops", type: "LIKE" },
        { username: "eva_ml", type: "LIKE" },
      ],
    },
    {
      postTitle:
        "Building a REST API with Node.js, Express, and TypeScript from scratch",
      reactions: [
        { username: "alice_dev", type: "LIKE" },
        { username: "carol_ui", type: "LIKE" },
        { username: "frank_mobile", type: "LIKE" },
        { username: "grace_sec", type: "LIKE" },
        { username: "henry_db", type: "LIKE" },
      ],
    },
    // Add more from original likes
  ];

  console.log("[Seed] Seeding post reactions...");

  for (const { postTitle, reactions: userReactions } of reactions) {
    const [[post]] = await conn.query(
      "SELECT post_id FROM posts WHERE title = ?",
      [postTitle],
    );
    if (!post) continue;

    for (const { username, type } of userReactions) {
      const [[user]] = await conn.query(
        "SELECT user_id FROM users WHERE username = ?",
        [username],
      );
      if (!user) continue;

      await conn.query(
        `INSERT INTO post_reactions (post_id, user_id, reaction_type)
         VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE reaction_type = ?`,
        [post.post_id, user.user_id, type, type],
      );
    }
  }

  console.log("[Seed] Post reactions done.");
}

export { seedPostReactions };
