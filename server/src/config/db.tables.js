const basicColumns = `
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
`;

const tables = [
  // ─── AUTH ────────────────────────────────────────────────────────

  {
    name: "accounts",
    sql: `
      CREATE TABLE IF NOT EXISTS accounts (
        account_id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email               VARCHAR(100) NOT NULL UNIQUE,
        password            VARCHAR(255) NOT NULL,
        role                ENUM('USER', 'ADMIN') DEFAULT 'USER',
        is_active           BOOLEAN      DEFAULT FALSE,
        verification_token  VARCHAR(255) DEFAULT NULL,
        verification_expire TIMESTAMP    DEFAULT NULL,
        ${basicColumns}
      );
    `,
  },

  // ─── USERS ───────────────────────────────────────────────────────

  {
    name: "users",
    sql: `
      CREATE TABLE IF NOT EXISTS users (
        user_id    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        account_id INT UNSIGNED NOT NULL UNIQUE,
        username   VARCHAR(50)  NOT NULL UNIQUE,
        avatar     VARCHAR(255) DEFAULT NULL,
        bio        TEXT         DEFAULT NULL,
        ${basicColumns},

        FOREIGN KEY (account_id)
          REFERENCES accounts(account_id)
          ON DELETE CASCADE
      );
    `,
  },

  // ─── TAGS ────────────────────────────────────────────────────────

  {
    name: "tags",
    sql: `
      CREATE TABLE IF NOT EXISTS tags (
        tag_id     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name       VARCHAR(50)  NOT NULL UNIQUE,
        post_count INT UNSIGNED DEFAULT 0,
        ${basicColumns}
      );
    `,
  },

  // ─── POSTS ───────────────────────────────────────────────────────

  {
    name: "posts",
    sql: `
      CREATE TABLE IF NOT EXISTS posts (
        post_id    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        author_id  INT UNSIGNED NOT NULL,
        type       ENUM('DISCUSSION', 'TUTORIAL', 'EVENT') NOT NULL DEFAULT 'DISCUSSION',
        title      VARCHAR(255) NOT NULL,
        content    LONGTEXT     NOT NULL,
        view_count INT UNSIGNED DEFAULT 0,
        like_count INT UNSIGNED DEFAULT 0,
        ${basicColumns},

        FOREIGN KEY (author_id)
          REFERENCES users(user_id)
          ON DELETE CASCADE,

        INDEX idx_posts_author (author_id),
        INDEX idx_posts_type   (type)
      );
    `,
  },

  {
    name: "posts_tags",
    sql: `
      CREATE TABLE IF NOT EXISTS posts_tags (
        post_id INT UNSIGNED NOT NULL,
        tag_id  INT UNSIGNED NOT NULL,

        PRIMARY KEY (post_id, tag_id),

        FOREIGN KEY (post_id)
          REFERENCES posts(post_id)
          ON DELETE CASCADE,

        FOREIGN KEY (tag_id)
          REFERENCES tags(tag_id)
          ON DELETE CASCADE
      );
    `,
  },

  // ─── COMMENTS ────────────────────────────────────────────────────

  {
    name: "comments",
    sql: `
      CREATE TABLE IF NOT EXISTS comments (
        comment_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        post_id    INT UNSIGNED NOT NULL,
        author_id  INT UNSIGNED NOT NULL,
        parent_id  INT UNSIGNED DEFAULT NULL,
        content    TEXT         NOT NULL,
        like_count INT UNSIGNED DEFAULT 0,
        ${basicColumns},

        FOREIGN KEY (post_id)
          REFERENCES posts(post_id)
          ON DELETE CASCADE,

        FOREIGN KEY (author_id)
          REFERENCES users(user_id)
          ON DELETE CASCADE,

        FOREIGN KEY (parent_id)
          REFERENCES comments(comment_id)
          ON DELETE CASCADE,

        INDEX idx_comments_post (post_id)
      );
    `,
  },

  // ─── LIKES ───────────────────────────────────────────────────────

  {
    name: "post_likes",
    sql: `
      CREATE TABLE IF NOT EXISTS post_likes (
        post_id INT UNSIGNED NOT NULL,
        user_id INT UNSIGNED NOT NULL,
        ${basicColumns},

        PRIMARY KEY (post_id, user_id),

        FOREIGN KEY (post_id)
          REFERENCES posts(post_id)
          ON DELETE CASCADE,

        FOREIGN KEY (user_id)
          REFERENCES users(user_id)
          ON DELETE CASCADE
      );
    `,
  },

  {
    name: "comment_likes",
    sql: `
      CREATE TABLE IF NOT EXISTS comment_likes (
        comment_id INT UNSIGNED NOT NULL,
        user_id    INT UNSIGNED NOT NULL,
        ${basicColumns},

        PRIMARY KEY (comment_id, user_id),

        FOREIGN KEY (comment_id)
          REFERENCES comments(comment_id)
          ON DELETE CASCADE,

        FOREIGN KEY (user_id)
          REFERENCES users(user_id)
          ON DELETE CASCADE
      );
    `,
  },
];

export default tables;
