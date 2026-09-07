import { FolderIcon } from '@sanity/icons/Folder'
import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * A module is embedded inside a course, not its own document (AGENTS.md
 * section 8). Module/lesson numbers shown in the UI are derived from
 * array order, so nothing here stores a position.
 */
export const moduleType = defineType({
  name: 'module',
  title: 'Module',
  type: 'object',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'lesson' }] })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'title', lessons: 'lessons' },
    prepare({ title, lessons }) {
      const count = Array.isArray(lessons) ? lessons.length : 0
      return {
        title,
        subtitle: `${count} lesson${count === 1 ? '' : 's'}`,
      }
    },
  },
})
