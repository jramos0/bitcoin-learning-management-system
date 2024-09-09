import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { contentBuilders, contentBuildersLocalized } from '@blms/database';

import { resourceSchema } from './resource.js';

export const builderSchema = createSelectSchema(contentBuilders, {
  languages: z.array(z.string()),
});
export const builderLocalizedSchema = createSelectSchema(
  contentBuildersLocalized,
);

export const joinedBuilderSchema = resourceSchema
  .pick({
    id: true,
    path: true,
    // Todo fix validation
    // lastUpdated: true,
    lastCommit: true,
  })
  .merge(
    builderSchema.pick({
      name: true,
      category: true,
      languages: true,
      websiteUrl: true,
      twitterUrl: true,
      githubUrl: true,
      videoUrl: true,
      nostr: true,
      addressLine1: true,
      addressLine2: true,
      addressLine3: true,
      originalLanguage: true,
    }),
  )
  .merge(
    builderLocalizedSchema.pick({
      language: true,
      description: true,
    }),
  )
  .merge(
    z.object({
      tags: z.array(z.string()).optional(),
    }),
  );
