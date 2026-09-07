import { defineQuery } from 'next-sanity'

// Shared projections -------------------------------------------------------

const instructorSummaryProjection = /* groq */ `
  instructor->{
    _id,
    name,
    slug,
    photo
  }
`

const categorySummaryProjection = /* groq */ `
  category->{
    _id,
    title,
    slug
  }
`

const lessonSummaryProjection = /* groq */ `
  lessons[]->{
    _id,
    title,
    slug,
    duration,
    freePreview,
    posterImage
  }
`

// Categories -----------------------------------------------------------------

export const CATEGORIES_QUERY = defineQuery(/* groq */ `
  *[_type == "category"] | order(title asc)
`)

export const CATEGORY_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "category" && slug.current == $slug][0]
`)

// Instructors ------------------------------------------------------------

export const INSTRUCTORS_QUERY = defineQuery(/* groq */ `
  *[_type == "instructor"] | order(name asc)
`)

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "instructor" && slug.current == $slug][0]{
    ...,
    "courses": *[_type == "course" && references(^._id)]{
      _id,
      title,
      slug,
      coverImage,
      level
    }
  }
`)

// Courses ------------------------------------------------------------------

const courseCardProjection = /* groq */ `
  _id,
  title,
  slug,
  summary,
  coverImage,
  level,
  price,
  popular,
  studentCount,
  ${instructorSummaryProjection},
  ${categorySummaryProjection},
  "lessonCount": count(modules[].lessons[]),
  "totalDurationSeconds": math::sum(modules[].lessons[]->duration)
`

export const COURSES_QUERY = defineQuery(/* groq */ `
  *[
    _type == "course" &&
    (!defined($categorySlug) || category->slug.current == $categorySlug)
  ] | order(title asc) {
    ${courseCardProjection}
  }
`)

export const POPULAR_COURSES_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && popular == true] | order(title asc) [0...$limit] {
    ${courseCardProjection}
  }
`)

export const COURSE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    outcomes,
    ${instructorSummaryProjection},
    ${categorySummaryProjection},
    modules[]{
      title,
      summary,
      ${lessonSummaryProjection}
    }
  }
`)

// Lessons --------------------------------------------------------------------

export const LESSON_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && slug.current == $slug][0]
`)

export const COURSE_FOR_LESSON_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && references($lessonId)][0]{
    _id,
    title,
    slug,
    modules[]{
      title,
      "lessons": lessons[]->{ _id, title, slug }
    }
  }
`)
