import { SparkleIcon } from '@sanity/icons/Sparkle'
import { defineField, defineType } from 'sanity'

/**
 * A single "what you'll learn" bullet on a course. `icon` stores a name
 * from a curated set the web layer maps to a lucide-react icon component —
 * kept small so authors can't pick something the UI doesn't render.
 */
export const outcomeType = defineType({
  name: 'outcome',
  title: 'Outcome',
  type: 'object',
  icon: SparkleIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Check', value: 'CheckCircle' },
          { title: 'Target', value: 'Target' },
          { title: 'Layers', value: 'Layers' },
          { title: 'Zap', value: 'Zap' },
          { title: 'Code', value: 'Code2' },
          { title: 'Brain', value: 'Brain' },
          { title: 'Math', value: 'Sigma' },
          { title: 'Network', value: 'Network' },
          { title: 'Book', value: 'BookOpen' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'icon' },
  },
})
