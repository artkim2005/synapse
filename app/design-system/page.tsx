import {
  BarChart3,
  Bell,
  Bookmark,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Download,
  ExternalLink,
  GraduationCap,
  Heart,
  Home as HomeIcon,
  Info,
  Lightbulb,
  Link2,
  MoreHorizontal,
  Pause,
  Play,
  PlusCircle,
  Search,
  Settings,
  Share2,
  SquarePen,
  Star,
  User,
  XCircle,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Label, StatusTag, TopicTag } from "@/components/ui/Badge";
import { Select, SearchInput, TextInput, Textarea } from "@/components/ui/Input";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  CourseCard,
  LessonCard,
  ResourceCard,
  VideoResultCard,
} from "@/components/ui/Card";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Logo } from "@/components/layout/Logo";

function Panel({
  number,
  title,
  children,
  className = "",
}: {
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-medium border border-neutral-200 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="mb-5 flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-soft bg-neutral-900 text-[11px] font-semibold text-white">
          {number}
        </span>
        <h2 className="text-xs font-semibold tracking-wide text-neutral-500">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function ColorSwatch({
  name,
  hex,
  desc,
  className,
}: {
  name: string;
  hex: string;
  desc: string;
  className: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-20 rounded-medium ${className}`} />
      <div>
        <p className="text-sm font-medium text-neutral-900">{name}</p>
        <p className="text-xs text-neutral-500">{hex}</p>
        <p className="text-xs text-neutral-500">{desc}</p>
      </div>
    </div>
  );
}

function TypeSpecimen({
  sample,
  className,
  name,
  meta,
}: {
  sample: string;
  className: string;
  name: string;
  meta: string;
}) {
  return (
    <div className="flex items-baseline gap-6 border-b border-neutral-100 py-3 last:border-none">
      <span className={`w-16 shrink-0 text-neutral-900 ${className}`}>
        {sample}
      </span>
      <div>
        <p className="text-sm font-medium text-neutral-900">{name}</p>
        <p className="text-xs text-neutral-500">{meta}</p>
      </div>
    </div>
  );
}

const spacingScale = [
  { px: 4, rem: "0.25rem" },
  { px: 8, rem: "0.5rem" },
  { px: 12, rem: "0.75rem" },
  { px: 16, rem: "1rem" },
  { px: 24, rem: "1.5rem" },
  { px: 32, rem: "2rem" },
  { px: 40, rem: "2.5rem" },
  { px: 48, rem: "3rem" },
  { px: 64, rem: "4rem" },
  { px: 80, rem: "5rem" },
  { px: 96, rem: "6rem" },
];

const iconSet = [
  Search,
  HomeIcon,
  Bookmark,
  Play,
  Pause,
  Settings,
  GraduationCap,
  User,
  Bell,
  Calendar,
  BarChart3,
  Star,
  Link2,
  ChevronRight,
  CheckCircle2,
  PlusCircle,
  XCircle,
  Info,
  Heart,
  Download,
  Share2,
  SquarePen,
  ExternalLink,
  MoreHorizontal,
];

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-6 py-10">
      {/* Hero */}
      <section className="rounded-medium border border-neutral-200 bg-white p-8 shadow-sm">
        <Logo className="mb-6" />
        <h1 className="text-display font-semibold tracking-[-0.01em] text-neutral-900">
          Learn Smarter.
          <br />
          Build What&apos;s Next.
        </h1>
        <p className="mt-4 max-w-lg text-body-lg text-neutral-500">
          Synapse is a modern learning platform that connects ideas, courses,
          and you — helping you learn faster, go deeper, and achieve more.
        </p>
        <p className="mt-6 text-xs font-medium uppercase tracking-wide text-neutral-500">
          Version 1.0 · Design System
        </p>
      </section>

      {/* 01 Colors */}
      <Panel number="01" title="Colors">
        <p className="mb-3 text-sm font-medium text-neutral-700">Primary</p>
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <ColorSwatch name="Primary 500" hex="#10B981" desc="Emerald" className="bg-primary-500" />
          <ColorSwatch name="Primary 400" hex="#34D399" desc="Medium Green" className="bg-primary-400" />
          <ColorSwatch name="Primary 300" hex="#6EE7B7" desc="Light Green" className="bg-primary-300" />
          <ColorSwatch name="Primary 200" hex="#A7F3D0" desc="Pale Green" className="bg-primary-200" />
          <ColorSwatch name="Primary 100" hex="#D1FAE5" desc="Very Pale Green" className="bg-primary-100" />
        </div>
        <p className="mb-3 text-sm font-medium text-neutral-700">Neutrals</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          <ColorSwatch name="Neutral 900" hex="#0F172A" desc="Near Black" className="bg-neutral-900" />
          <ColorSwatch name="Neutral 700" hex="#334155" desc="Dark Gray" className="bg-neutral-700" />
          <ColorSwatch name="Neutral 500" hex="#64748B" desc="Gray" className="bg-neutral-500" />
          <ColorSwatch name="Neutral 300" hex="#CBD5E1" desc="Light Gray" className="bg-neutral-300" />
          <ColorSwatch name="Neutral 200" hex="#E2E8F0" desc="Very Light Gray" className="bg-neutral-200" />
          <ColorSwatch name="Neutral 100" hex="#F1F5F9" desc="Background" className="bg-neutral-100" />
          <ColorSwatch name="White" hex="#FFFFFF" desc="White" className="border border-neutral-200 bg-white" />
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 02 Typography */}
        <Panel number="02" title="Typography" className="lg:col-span-1">
          <TypeSpecimen sample="Ag" className="text-display font-semibold" name="Display" meta="Inter SemiBold · 48/56 · Tracking -1%" />
          <TypeSpecimen sample="Ag" className="text-h1 font-semibold" name="Heading 1" meta="Inter SemiBold · 32/40 · Tracking -0.5%" />
          <TypeSpecimen sample="Ag" className="text-h2 font-semibold" name="Heading 2" meta="Inter SemiBold · 24/32 · Tracking -0.25%" />
          <TypeSpecimen sample="Ag" className="text-h3 font-medium" name="Heading 3" meta="Inter Medium · 20/28 · Tracking 0%" />
          <TypeSpecimen sample="Ag" className="text-body-lg" name="Body Large" meta="Inter Regular · 16/24 · Tracking 0%" />
          <TypeSpecimen sample="Ag" className="text-body" name="Body" meta="Inter Regular · 14/20 · Tracking 0%" />
          <TypeSpecimen sample="Ag" className="text-small" name="Small" meta="Inter Regular · 12/16 · Tracking 0.25%" />
        </Panel>

        {/* 03 Type Scale */}
        <Panel number="03" title="Type Scale">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-neutral-500">
                <th className="pb-2 font-medium">Style</th>
                <th className="pb-2 font-medium">Size / LH</th>
                <th className="pb-2 font-medium">Weight</th>
              </tr>
            </thead>
            <tbody className="text-neutral-900">
              {[
                ["Display 1", "48 / 56", "SemiBold"],
                ["Display 2", "36 / 44", "SemiBold"],
                ["Heading 1", "32 / 40", "SemiBold"],
                ["Heading 2", "24 / 32", "SemiBold"],
                ["Heading 3", "20 / 28", "Medium"],
                ["Body Large", "16 / 24", "Regular"],
                ["Body", "14 / 20", "Regular"],
                ["Small", "12 / 16", "Regular"],
              ].map(([style, size, weight]) => (
                <tr key={style} className="border-t border-neutral-100">
                  <td className="py-2">{style}</td>
                  <td className="py-2">{size}</td>
                  <td className="py-2">{weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        {/* 04 Spacing */}
        <Panel number="04" title="Spacing System">
          <p className="mb-4 text-xs text-neutral-500">Base unit: 4px</p>
          <div className="flex flex-wrap items-end gap-4">
            {spacingScale.map(({ px, rem }) => (
              <div key={px} className="flex flex-col items-center gap-2">
                <div
                  className="rounded-soft bg-primary-200"
                  style={{ width: Math.max(px, 8), height: Math.max(px, 8) }}
                />
                <p className="text-[11px] text-neutral-500">
                  {px}
                  <br />({rem})
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 05 Radius & Shadows */}
        <Panel number="05" title="Radius & Shadows">
          <p className="mb-3 text-sm font-medium text-neutral-700">Radius</p>
          <div className="mb-6 flex flex-wrap gap-4">
            {[
              { label: "4px (soft)", cls: "rounded-soft" },
              { label: "8px (small)", cls: "rounded-small" },
              { label: "12px (medium)", cls: "rounded-medium" },
              { label: "16px (large)", cls: "rounded-large" },
              { label: "24px (xl)", cls: "rounded-xl" },
              { label: "Full (circle)", cls: "rounded-full" },
            ].map(({ label, cls }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className={`size-14 border border-neutral-300 bg-neutral-100 ${cls}`} />
                <p className="text-[11px] text-neutral-500">{label}</p>
              </div>
            ))}
          </div>
          <p className="mb-3 text-sm font-medium text-neutral-700">Shadows</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Sm", cls: "shadow-sm" },
              { label: "Md", cls: "shadow-md" },
              { label: "Lg", cls: "shadow-lg" },
              { label: "Xl", cls: "shadow-xl" },
            ].map(({ label, cls }) => (
              <div
                key={label}
                className={`flex h-16 items-center justify-center rounded-medium bg-white text-xs text-neutral-500 ${cls}`}
              >
                {label}
              </div>
            ))}
          </div>
        </Panel>

        {/* 06 Icons */}
        <Panel number="06" title="Icons">
          <div className="mb-4 grid grid-cols-6 gap-3">
            {iconSet.map((Icon, i) => (
              <span
                key={i}
                className="flex size-9 items-center justify-center rounded-small border border-neutral-200 text-neutral-700"
              >
                <Icon className="size-4" strokeWidth={2} />
              </span>
            ))}
          </div>
          <ul className="space-y-1 text-xs text-neutral-500">
            <li>24px grid</li>
            <li>2px stroke (outline or solid filled)</li>
            <li>Rounded corners, consistent optical balance</li>
          </ul>
        </Panel>

        {/* 07 Buttons */}
        <Panel number="07" title="Buttons">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Get Started</Button>
              <Button variant="secondary">Explore Courses</Button>
              <Button variant="tertiary">View Lesson</Button>
              <Button variant="text" withArrow>
                Watch Video
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" disabled>
                Get Started
              </Button>
              <Button variant="secondary" disabled>
                Explore Courses
              </Button>
              <Button variant="tertiary" disabled>
                View Lesson
              </Button>
              <Button variant="text" disabled withArrow>
                Watch Video
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-neutral-100 pt-4">
              <Button size="lg">Large</Button>
              <Button size="md">Medium</Button>
              <Button size="sm">Small</Button>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 08 Inputs */}
        <Panel number="08" title="Inputs">
          <div className="space-y-4">
            <SearchInput placeholder="Search topics, concepts, or questions..." />
            <TextInput label="Text Input" placeholder="Enter your name" />
            <Select label="Select" defaultValue="">
              <option value="" disabled>
                Choose a subject
              </option>
              <option>React</option>
              <option>Node.js</option>
            </Select>
            <Textarea
              label="Textarea"
              placeholder="Add a note..."
              helperText="Keep it brief and focused. 0/200"
            />
            <TextInput
              label="Focus State"
              defaultValue="Search topics, concepts..."
              className="border-primary-500 ring-2 ring-primary-500/30"
            />
          </div>
        </Panel>

        {/* 09 Badges / Tags */}
        <Panel number="09" title="Badges / Tags">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Label tone="video">Video</Label>
              <Label tone="lesson">Lesson</Label>
              <Label tone="relevant">Relevant</Label>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-neutral-500">Status Tags</p>
              <div className="flex flex-wrap gap-2">
                <StatusTag tone="blue">In Progress</StatusTag>
                <StatusTag tone="green">Completed</StatusTag>
                <StatusTag tone="playing">Now Playing</StatusTag>
                <StatusTag tone="neutral">Saved</StatusTag>
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-neutral-500">Topic Tags</p>
              <div className="flex flex-wrap gap-2">
                <TopicTag>React</TopicTag>
                <TopicTag>Node.js</TopicTag>
                <TopicTag>JavaScript</TopicTag>
                <TopicTag>Data Science</TopicTag>
                <TopicTag>Web Dev</TopicTag>
                <TopicTag>AI</TopicTag>
              </div>
            </div>
          </div>
        </Panel>

        {/* 10 Status / Indicators */}
        <Panel number="10" title="Status / Indicators">
          <div className="space-y-3 text-sm text-neutral-700">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary-400" /> In Progress
            </div>
            <div className="flex items-center gap-2">
              <Check className="size-4 text-primary-500" strokeWidth={2} /> Completed
            </div>
            <div className="flex items-center gap-2">
              <Play className="size-4 text-primary-500" strokeWidth={2} /> Now Playing
            </div>
            <div className="flex items-center gap-2">
              <Bookmark className="size-4 text-neutral-500" strokeWidth={2} /> Saved
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary-500" /> Live
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="size-4 text-neutral-500" strokeWidth={2} /> Needs Attention
            </div>
            <div className="flex items-center gap-2">
              <Info className="size-4 text-neutral-500" strokeWidth={2} /> Info
            </div>
            <div className="space-y-2 border-t border-neutral-100 pt-3">
              <ProgressBar value={68} label="Lesson Completion" valueLabel="68%" />
              <p className="flex items-center gap-1 text-xs text-neutral-500">
                <Clock className="size-3.5" strokeWidth={2} /> Video Duration 12:45 / 48:32
              </p>
              <p className="flex items-center gap-1 text-xs text-neutral-500">
                <Calendar className="size-3.5" strokeWidth={2} /> Last Activity Apr 24, 2025
              </p>
              <p className="flex items-center gap-1 text-xs text-neutral-500">
                <BarChart3 className="size-3.5" strokeWidth={2} /> Difficulty Intermediate
              </p>
            </div>
          </div>
        </Panel>
      </div>

      {/* 11 Progress + 12 Cards */}
      <Panel number="11" title="Progress Bar">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ProgressBar value={68} label="Course Progress" valueLabel="68%" />
          <ProgressBar value={60} label="Lesson Progress" valueLabel="3 / 5" />
        </div>
      </Panel>

      <Panel number="12" title="Cards">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CourseCard
            title="Full Stack Web Development"
            description="Build modern web apps with React, Node.js and more."
            lessons={12}
            duration="6h 24m"
          />
          <VideoResultCard
            title="Data Fetching & Caching"
            description="Learn how to fetch data efficiently and implement caching strategies."
            module="Module 5"
            duration="12m"
            timestamp="12:45"
          />
          <LessonCard
            title="Understanding React Hooks"
            description="Learn the fundamentals of React Hooks and when to use them."
            module="Module 3"
            duration="18m"
          />
          <ResourceCard
            title="Caching Strategies Cheat Sheet"
            fileType="PDF"
            fileSize="1.2 MB"
          />
        </div>
      </Panel>

      {/* 13 Navigation */}
      <Panel number="13" title="Navigation">
        <div className="overflow-hidden rounded-medium border border-neutral-200">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-neutral-100 p-6">
              <div className="mb-3 flex items-center gap-1.5 text-xs text-neutral-500">
                <span>Courses</span>
                <ChevronRight className="size-3.5" strokeWidth={2} />
                <span>React</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-h3 font-medium text-neutral-900">
                    React for Modern Web Apps
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Build dynamic, scalable web applications with React.
                  </p>
                </div>
                <Button>Continue Learning</Button>
              </div>
              <div className="flex gap-6 border-b border-neutral-200 text-sm font-medium text-neutral-500">
                {["Overview", "Lessons", "Resources", "Discussions"].map(
                  (tab, i) => (
                    <span
                      key={tab}
                      className={`-mb-px border-b-2 pb-2 ${
                        i === 0
                          ? "border-primary-500 text-primary-500"
                          : "border-transparent"
                      }`}
                    >
                      {tab}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </Panel>

      {/* 14 Principles */}
      <Panel number="14" title="Principles">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Lightbulb,
              title: "Clarity First",
              desc: "Make the path obvious. Reduce cognitive load with clean, simple interfaces.",
            },
            {
              icon: Link2,
              title: "Consistency",
              desc: "Use the same patterns, components and language across the platform.",
            },
            {
              icon: Search,
              title: "Contextual Search",
              desc: "Help learners find the right content at the right time, with intelligent search and relevance.",
            },
            {
              icon: Compass,
              title: "Focus & Calm",
              desc: "Minimize noise. Create a clean, breathable experience that keeps learners focused.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-3">
              <span className="flex size-9 items-center justify-center rounded-small bg-primary-100 text-primary-500">
                <Icon className="size-4" strokeWidth={2} />
              </span>
              <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
              <p className="text-xs text-neutral-500">{desc}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
