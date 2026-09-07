import { Atom, Brain, Code2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CourseCard } from "@/components/ui/Card";

const courses = [
  {
    title: "React for Modern Web Apps",
    description:
      "Build dynamic, scalable web applications with React. Learn hooks, context, and more.",
    lessons: 12,
    duration: "6h 24m",
    level: "Intermediate",
    videoDuration: "12:45",
    icon: Atom,
    thumbnailClassName: "bg-gradient-to-br from-primary-400 via-primary-500 to-neutral-900",
    href: "/courses/react-for-modern-web-apps",
  },
  {
    title: "Python for Data Science",
    description:
      "Learn Python fundamentals and apply them to real-world data science projects.",
    lessons: 10,
    duration: "4h 12m",
    level: "Beginner",
    videoDuration: "10:32",
    icon: Code2,
    thumbnailClassName: "bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700",
    href: "/courses/python-for-data-science",
  },
  {
    title: "Machine Learning Fundamentals",
    description:
      "Understand core machine learning concepts and build your first model.",
    lessons: 14,
    duration: "8h 36m",
    level: "Intermediate",
    videoDuration: "14:20",
    icon: Brain,
    thumbnailClassName: "bg-gradient-to-br from-primary-300 via-primary-400 to-primary-500",
    href: "/courses/machine-learning-fundamentals",
  },
];

export function PopularCourses() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-6 py-16">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-h1 font-semibold text-neutral-900">
            Popular Courses
          </h2>
          <p className="mt-2 text-body-lg text-neutral-500">
            Explore our most popular courses and start learning today.
          </p>
        </div>
        <Button variant="secondary" withArrow href="/courses">
          View All Courses
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.title} {...course} />
        ))}
      </div>
    </section>
  );
}
