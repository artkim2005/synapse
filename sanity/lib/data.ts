import { sanityFetch } from './client'
import {
  CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  COURSES_QUERY,
  COURSE_BY_SLUG_QUERY,
  COURSE_FOR_LESSON_QUERY,
  INSTRUCTOR_BY_SLUG_QUERY,
  INSTRUCTORS_QUERY,
  LESSON_BY_SLUG_QUERY,
  POPULAR_COURSES_QUERY,
} from './queries'
import type {
  CATEGORIES_QUERY_RESULT,
  CATEGORY_BY_SLUG_QUERY_RESULT,
  COURSES_QUERY_RESULT,
  COURSE_BY_SLUG_QUERY_RESULT,
  COURSE_FOR_LESSON_QUERY_RESULT,
  INSTRUCTOR_BY_SLUG_QUERY_RESULT,
  INSTRUCTORS_QUERY_RESULT,
  LESSON_BY_SLUG_QUERY_RESULT,
  POPULAR_COURSES_QUERY_RESULT,
} from '../types'

// Categories -----------------------------------------------------------------

export function getCategories(): Promise<CATEGORIES_QUERY_RESULT> {
  return sanityFetch({ query: CATEGORIES_QUERY })
}

export function getCategoryBySlug(slug: string): Promise<CATEGORY_BY_SLUG_QUERY_RESULT> {
  return sanityFetch({ query: CATEGORY_BY_SLUG_QUERY, params: { slug } })
}

// Instructors ------------------------------------------------------------

export function getInstructors(): Promise<INSTRUCTORS_QUERY_RESULT> {
  return sanityFetch({ query: INSTRUCTORS_QUERY })
}

export function getInstructorBySlug(slug: string): Promise<INSTRUCTOR_BY_SLUG_QUERY_RESULT> {
  return sanityFetch({ query: INSTRUCTOR_BY_SLUG_QUERY, params: { slug } })
}

// Courses ------------------------------------------------------------------

export function getCourses(options: { categorySlug?: string } = {}): Promise<COURSES_QUERY_RESULT> {
  return sanityFetch({
    query: COURSES_QUERY,
    params: { categorySlug: options.categorySlug ?? null },
  })
}

export function getPopularCourses(limit = 3): Promise<POPULAR_COURSES_QUERY_RESULT> {
  return sanityFetch({ query: POPULAR_COURSES_QUERY, params: { limit } })
}

export function getCourseBySlug(slug: string): Promise<COURSE_BY_SLUG_QUERY_RESULT> {
  return sanityFetch({ query: COURSE_BY_SLUG_QUERY, params: { slug } })
}

// Lessons --------------------------------------------------------------------

export function getLessonBySlug(slug: string): Promise<LESSON_BY_SLUG_QUERY_RESULT> {
  return sanityFetch({ query: LESSON_BY_SLUG_QUERY, params: { slug } })
}

/**
 * Lessons don't store their parent course (AGENTS.md section 8), so the
 * course is derived with a reverse reference. Returns the owning course
 * with enough of modules[].lessons[] for a caller to compute the
 * module/lesson index and prev/next lesson.
 */
export function getCourseForLesson(lessonId: string): Promise<COURSE_FOR_LESSON_QUERY_RESULT> {
  return sanityFetch({ query: COURSE_FOR_LESSON_QUERY, params: { lessonId } })
}
