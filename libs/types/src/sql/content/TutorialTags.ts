// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { TagsId } from './Tags';
import type { TutorialsId } from './Tutorials';

/** Represents the table content.tutorial_tags */
export default interface TutorialTags {
  tutorial_id: TutorialsId;

  tag_id: TagsId;
}

/** Represents the initializer for the table content.tutorial_tags */
export interface TutorialTagsInitializer {
  tutorial_id: TutorialsId;

  tag_id: TagsId;
}

/** Represents the mutator for the table content.tutorial_tags */
export interface TutorialTagsMutator {
  tutorial_id?: TutorialsId;

  tag_id?: TagsId;
}
