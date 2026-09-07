import { Hero } from "@/components/home/Hero";
import { PopularCourses } from "@/components/home/PopularCourses";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar active="home" />
      <main className="flex-1 bg-white">
        <Hero />
        <PopularCourses />
      </main>
    </>
  );
}
