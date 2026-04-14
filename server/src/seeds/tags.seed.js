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
    const [[existing]] = await conn.query(
      "SELECT tag_id FROM tags WHERE name = ?",
      [name],
    );
    if (existing) continue;

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    await conn.query(
      `INSERT INTO tags (name, slug, description) VALUES (?, ?, ?)`,
      [
        name,
        slug,
        `${name.charAt(0).toUpperCase() + name.slice(1)} related discussions and tutorials.`,
      ],
    );
  }

  console.log("[Seed] Tags done.");
}

export { seedTags };
