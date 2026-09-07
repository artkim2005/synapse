import type { SchemaTypeDefinition } from 'sanity'

import { categoryType } from './documents/categoryType'
import { courseType } from './documents/courseType'
import { instructorType } from './documents/instructorType'
import { lessonType } from './documents/lessonType'
import { blockContentType } from './objects/blockContentType'
import { moduleType } from './objects/moduleType'
import { outcomeType } from './objects/outcomeType'
import { resourceType } from './objects/resourceType'

export const schemaTypes: SchemaTypeDefinition[] = [
  // documents
  courseType,
  lessonType,
  instructorType,
  categoryType,
  // objects
  moduleType,
  outcomeType,
  resourceType,
  blockContentType,
]
