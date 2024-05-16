// @generated
// This file is automatically generated from our schemas by the command `pnpm types:generate`. Do not modify manually.

import type { z } from 'zod';

import { invoiceSchema, ticketSchema } from '@sovereign-university/schemas';

export type Invoice = z.infer<typeof invoiceSchema>;
export type Ticket = z.infer<typeof ticketSchema>;
