async function seedNotifications(conn) {
  const notifications = [
    {
      userUsername: "alice_dev",
      type: "COMMENT_REPLY",
      referenceId: 1, // comment_id or post_id
      message: "bob_codes replied to your post 'What's your go-to stack...'",
    },
    {
      userUsername: "bob_codes",
      type: "REACTION",
      referenceId: 2,
      message: "alice_dev liked your comment",
    },
    // Add more sample notifications
  ];

  console.log("[Seed] Seeding notifications...");

  for (const n of notifications) {
    const [[user]] = await conn.query(
      "SELECT user_id FROM users WHERE username = ?",
      [n.userUsername],
    );
    if (!user) continue;

    await conn.query(
      `INSERT INTO notifications (user_id, type, reference_id, message)
       VALUES (?, ?, ?, ?)`,
      [user.user_id, n.type, n.referenceId, n.message],
    );
  }

  console.log("[Seed] Notifications done.");
}

export { seedNotifications };
