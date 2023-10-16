-- Path: libs/database/migrations/20231015160801-professors.sql

CREATE TABLE IF NOT EXISTS content.professors (
  id SERIAL PRIMARY KEY,
  path VARCHAR(255) UNIQUE NOT NULL,

  name VARCHAR(255) UNIQUE NOT NULL,
  company VARCHAR(255),
  affiliations VARCHAR(255)[],
  
  -- Links
  website_url TEXT,
  twitter_url TEXT,
  github_url TEXT,
  nostr TEXT,

  -- Tips
  lightning_address TEXT,
  lnurl_pay TEXT,
  paynym TEXT,
  silent_payment TEXT,
  tips_url TEXT,

  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_commit VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS content.professors_localized (
  professor_id INTEGER NOT NULL REFERENCES content.professors(id) ON DELETE CASCADE,
  language VARCHAR(10) NOT NULL,

  bio TEXT,
  short_bio TEXT,

  PRIMARY KEY (professor_id, language)
);

CREATE TABLE IF NOT EXISTS content.professor_tags (
  professor_id INTEGER NOT NULL REFERENCES content.professors(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES content.tags(id) ON DELETE CASCADE,

  PRIMARY KEY (professor_id, tag_id)
);