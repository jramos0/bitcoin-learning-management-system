import { TRPCError } from '@trpc/server';
import { verify as verifyHash } from 'argon2';
import { z } from 'zod';

import { loginResponseSchema } from '@blms/schemas';
import { createGetUser, createNewCredentialsUser } from '@blms/service-user';
import type { LoginResponse } from '@blms/types';

import type { Parser } from '#src/trpc/types.js';

import { publicProcedure } from '../../procedures/index.js';
import { createTRPCRouter } from '../../trpc/index.js';
import { contributorIdSchema } from '../../utils/validators.js';

const registerCredentialsSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(8),
  email: z.string().email().optional(),
  contributor_id: contributorIdSchema.optional(),
});

const loginCredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const credentialsAuthRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerCredentialsSchema)
    .output<Parser<LoginResponse>>(loginResponseSchema)
    .mutation(async ({ ctx, input }) => {
      const { dependencies } = ctx;

      const getUser = createGetUser(dependencies);

      // TODO: move this to service once we have the custom errors
      if (await getUser({ username: input.username })) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Username already exists',
        });
      }

      const newCredentialsUser = createNewCredentialsUser(dependencies);
      const user = await newCredentialsUser({
        username: input.username,
        password: input.password,
        contributorId: input.contributor_id,
        email: input.email,
      });

      return {
        status: 201,
        message: 'User created',
        user: {
          uid: user.uid,
          username: user.username,
          email: user.email ?? undefined,
        },
      };
    }),
  login: publicProcedure
    .input(loginCredentialsSchema)
    .output<Parser<LoginResponse>>(loginResponseSchema)
    .mutation(async ({ ctx, input }) => {
      const { dependencies, req } = ctx;

      const getUser = createGetUser(dependencies);

      // Check if a session exists and if it is valid
      if (req.session.uid) {
        console.log('----- User is already logged in');
        console.log('----- Clear user session');
        req.session.destroy((err) => {
          if (err)
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to clear session',
            });
        });
      }

      const user = await getUser({
        username: input.username,
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }

      if (!user.passwordHash) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'This user has no password, try another login method',
        });
      }

      if (!(await verifyHash(user.passwordHash, input.password))) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }

      req.session.uid = user.uid;
      req.session.role = user.role;
      req.session.professorId = user.professorId;
      req.session.professorCourses = user.professorCourses;
      req.session.professorTutorials = user.professorTutorials;

      return {
        status: 200,
        message: 'Logged in',
        user: {
          uid: user.uid,
          username: user.username,
          email: user.email ?? undefined,
        },
      };
    }),
});
