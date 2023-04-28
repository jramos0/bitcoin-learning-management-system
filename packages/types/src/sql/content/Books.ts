// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { ResourcesId } from './Resources';

/** Identifier type for content.books */
export type BooksId = number;

/** Represents the table content.books */
export default interface Books {
  id: BooksId;

  resource_id: ResourcesId;

  language: string;

  title: string;

  author: string;

  description: string | null;

  publication_date: Date | null;

  cover: string | null;
}

/** Represents the initializer for the table content.books */
export interface BooksInitializer {
  /** Default value: nextval('content.books_id_seq'::regclass) */
  id?: BooksId;

  resource_id: ResourcesId;

  language: string;

  title: string;

  author: string;

  description?: string | null;

  publication_date?: Date | null;

  cover?: string | null;
}

/** Represents the mutator for the table content.books */
export interface BooksMutator {
  id?: BooksId;

  resource_id?: ResourcesId;

  language?: string;

  title?: string;

  author?: string;

  description?: string | null;

  publication_date?: Date | null;

  cover?: string | null;
}
