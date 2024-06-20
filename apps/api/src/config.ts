import type { PostgresClientConfig } from '@sovereign-university/database';
import type { RedisClientConfig } from '@sovereign-university/redis';
import type { EnvConfig, GitHubSyncConfig } from '@sovereign-university/types';

function getenv<
  T,
  R = T extends unknown ? string : T extends null ? string | null : T,
>(name: string, fallback?: T): R {
  const value = process.env[name] ?? '';

  // If the value is empty and no fallback is provided, throw an error
  if (!value && fallback === undefined) {
    throw new Error(`Missing mandatory value for "${name}"`);
  }

  // If the value is empty and a fallback is provided, log a warning
  if (!value && fallback !== null) {
    console.warn(
      `No value found for ${name}, defaulting to ${JSON.stringify(fallback)}`,
    );
  }

  // If the value is not empty, parse it to the correct type (inferred from fallback type)
  if (fallback !== null) {
    switch (typeof fallback) {
      case 'boolean': {
        return (value ? value === 'true' : fallback) as R;
      }
      case 'number': {
        return (Number.parseInt(value) || fallback) as R;
      }
    }
  }

  return (value || fallback) as R;
}

/**
 * Real application domain (without trailing slash)
 */
export const domainUrl = getenv('DOMAIN_URL', 'http://localhost:8181');

export const sendgrid: EnvConfig['sendgrid'] = {
  key: getenv('SENDGRID_KEY', null),
  enable: getenv('SENDGRID_ENABLE', false),
  email: getenv('SENDGRID_EMAIL', null),
  templates: {
    emailChange: getenv('SENDGRID_EMAIL_CHANGE_TEMPLATE_ID', null),
    recoverPassword: getenv('SENDGRID_RECOVER_PASSWORD_TEMPLATE_ID', null),
  },
};

export const postgres: PostgresClientConfig = {
  host: getenv('POSTGRES_HOST', 'localhost'),
  port: getenv('POSTGRES_PORT', 5432),
  database: getenv('POSTGRES_DB'),
  username: getenv('POSTGRES_USER'),
  password: getenv('POSTGRES_PASSWORD'),
};

export const redis: RedisClientConfig = {
  host: getenv('REDIS_HOST', 'localhost'),
  port: getenv('REDIS_PORT', 6379),
  database: getenv('REDIS_DB', 0),
  password: process.env['REDIS_PASSWORD'], // We do not use getenv here because
  username: process.env['REDIS_USERNAME'], // these values can be undefined
};

export const sync: GitHubSyncConfig = {
  cdnPath: getenv('CDN_PATH', '/tmp/cdn'),
  syncPath: getenv('SYNC_PATH', '/tmp/sync'),
  publicRepositoryUrl: getenv('DATA_REPOSITORY_URL'),
  publicRepositoryBranch: getenv('DATA_REPOSITORY_BRANCH', 'main'),
  privateRepositoryUrl: getenv('PRIVATE_DATA_REPOSITORY_URL', null),
  privateRepositoryBranch: getenv('PRIVATE_DATA_REPOSITORY_BRANCH', 'main'),
  githubAccessToken: getenv('GITHUB_ACCESS_TOKEN', null),
};
