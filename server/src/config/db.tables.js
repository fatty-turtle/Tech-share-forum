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
        role                ENUM('USER', 'MOD', 'ADMIN') DEFAULT 'USER',
        is_active           BOOLEAN      DEFAULT FALSE,
        verification_token  VARCHAR(255) DEFAULT NULL,
        verification_expire TIMESTAMP    DEFAULT NULL,
        ${basicColumns}
      );
    `,
    // Added: MOD role between USER and ADMIN
  },

  // ─── USERS ───────────────────────────────────────────────────────

  {
    name: "users",
    sql: `
      CREATE TABLE IF NOT EXISTS users (
        user_id     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        account_id  INT UNSIGNED NOT NULL UNIQUE,
        username    VARCHAR(50)  NOT NULL UNIQUE,
        avatar      VARCHAR(255) DEFAULT NULL,
        bio         TEXT         DEFAULT NULL,
        reputation  INT          DEFAULT 0,
        ${basicColumns},

        FOREIGN KEY (account_id)
          REFERENCES accounts(account_id)
          ON DELETE CASCADE
      );
    `,
    // Added: bio, reputation score
  },

  // ─── TAGS ────────────────────────────────────────────────────────

  {
    name: "tags",
    sql: `
      CREATE TABLE IF NOT EXISTS tags (
        tag_id      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name        VARCHAR(50)  NOT NULL UNIQUE,
        slug        VARCHAR(50)  NOT NULL UNIQUE,
        description VARCHAR(255) DEFAULT NULL,
        usage_count INT UNSIGNED DEFAULT 0,
        ${basicColumns}
      );
    `,
    // Added: slug (URL-friendly), description, usage_count (cached for performance)
  },

  // ─── POSTS ───────────────────────────────────────────────────────

  {
    name: "posts",
    sql: `
      CREATE TABLE IF NOT EXISTS posts (
        post_id   INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        author_id INT UNSIGNED NOT NULL,
        title     VARCHAR(255) NOT NULL,
        content   TEXT         NOT NULL,
        status    ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') DEFAULT 'PUBLISHED',
        views     INT UNSIGNED DEFAULT 0,
        is_pinned BOOLEAN      DEFAULT FALSE,
        ${basicColumns},

        FOREIGN KEY (author_id)
          REFERENCES users(user_id)
          ON DELETE CASCADE,

        INDEX idx_posts_author (author_id),
        INDEX idx_posts_status (status),
        FULLTEXT idx_posts_search (title, content)
      );
    `,
    // Added: status, views, is_pinned, FULLTEXT index for search
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
        is_deleted BOOLEAN      DEFAULT FALSE,
        ${basicColumns},

        FOREIGN KEY (post_id)
          REFERENCES posts(post_id)
          ON DELETE CASCADE,

        FOREIGN KEY (author_id)
          REFERENCES users(user_id)
          ON DELETE CASCADE,

        FOREIGN KEY (parent_id)
          REFERENCES comments(comment_id)
          ON DELETE SET NULL,

        INDEX idx_comments_post   (post_id),
        INDEX idx_comments_parent (parent_id)
      );
    `,
    // Added: is_deleted (soft delete so threads don't break),
    //        parent_id now SET NULL instead of CASCADE (preserve thread structure),
    //        index on parent_id for nested reply queries
  },

  // ─── REACTIONS ───────────────────────────────────────────────────

  {
    name: "post_reactions",
    sql: `
      CREATE TABLE IF NOT EXISTS post_reactions (
        post_id       INT UNSIGNED NOT NULL,
        user_id       INT UNSIGNED NOT NULL,
        reaction_type ENUM('LIKE', 'DISLIKE') DEFAULT 'LIKE',
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
    // Renamed post_likes → post_reactions, added reaction_type for upvote/downvote
  },

  {
    name: "comment_reactions",
    sql: `
      CREATE TABLE IF NOT EXISTS comment_reactions (
        comment_id    INT UNSIGNED NOT NULL,
        user_id       INT UNSIGNED NOT NULL,
        reaction_type ENUM('LIKE', 'DISLIKE') DEFAULT 'LIKE',
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
    // New: comments can also be liked/disliked
  },

  // ─── SAVES / BOOKMARKS ───────────────────────────────────────────

  {
    name: "post_saves",
    sql: `
      CREATE TABLE IF NOT EXISTS post_saves (
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
    // New: users can bookmark/save posts
  },

  // ─── NOTIFICATIONS ───────────────────────────────────────────────

  {
    name: "notifications",
    sql: `
      CREATE TABLE IF NOT EXISTS notifications (
        notification_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id         INT UNSIGNED NOT NULL,
        type            ENUM('POST_REPLY', 'COMMENT_REPLY', 'REACTION', 'MENTION', 'SYSTEM') NOT NULL,
        reference_id    INT UNSIGNED DEFAULT NULL,
        message         VARCHAR(255) DEFAULT NULL,
        is_read         BOOLEAN      DEFAULT FALSE,
        ${basicColumns},

        FOREIGN KEY (user_id)
          REFERENCES users(user_id)
          ON DELETE CASCADE,

        INDEX idx_notifications_user   (user_id),
        INDEX idx_notifications_unread (user_id, is_read)
      );
    `,
    // New: notification system for replies, reactions, mentions
  },
];

export default tables;
