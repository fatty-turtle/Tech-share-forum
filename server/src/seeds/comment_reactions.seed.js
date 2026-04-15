async function seedCommentReactions(conn) {
  // Example reactions on comments (similar to post reactions)
  const reactions = [
    {
      commentContentStart: "I've been using Next.js + tRPC",
      username: "alice_dev",
      type: "LIKE",
    },
    {
      commentContentStart: "Separate API is the way to go",
      username: "carol_ui",
      type: "LIKE",
    },
    // Add more
  ];

  console.log("[Seed] Seeding comment reactions...");

  for (const r of reactions) {
    const [[comment]] = await conn.query(
      "SELECT comment_id FROM comments WHERE content LIKE ?",
      [r.commentContentStart + "%"],
    );
    const [[user]] = await conn.query(
      "SELECT user_id FROM users WHERE username = ?",
      [r.username],
    );
    if (!comment || !user) continue;

    await conn.query(
      `INSERT INTO comment_reactions (comment_id, user_id, reaction_type)
       VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE reaction_type = ?`,
      [comment.comment_id, user.user_id, r.type, r.type],
    );
  }

  console.log("[Seed] Comment reactions done.");
}

export { seedCommentReactions };
