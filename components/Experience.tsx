"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Award,
  Building2,
  Code2,
  BookOpen,
} from "lucide-react";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: "work" | "education";
  highlights: string[];
  icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
}

interface Certification {
  name: string;
  provider: string;
  icon: React.ComponentType<{ className?: string }>;
}

const experiences: ExperienceItem[] = [
  {
    id: "9bit-studio",
    role: "Frontend Developer",
    company: "9 Bit Studio - Gaming Studio",
    location: "Remote",
    period: "2025",
    type: "work",
    icon: Code2,
    current: true,
    highlights: [
      "Founding core team member and lead frontend developer",
      "Developed animated website using React.js with Framer Motion and GSAP",
      "Integrated Three.js for 3D graphics rendering and immersive experiences",
      "Designed responsive UI with Tailwind CSS for cross-device compatibility",
    ],
  },
  {
    id: "arpitas-coaching",
    role: "Full Stack Developer",
    company: "Arpita's Coaching Classes, Pune",
    location: "Remote",
    period: "June 2025 – August 2025",
    type: "work",
    icon: Building2,
    highlights: [
      "Developed full-stack coaching institute website with MERN stack",
      "Built responsive landing page and admin dashboard with lead management",
      "Implemented JWT-based authentication and REST API endpoints",
      "Designed responsive UI with Tailwind CSS, Shadcn UI, and Framer Motion",
    ],
  },
];

const education: ExperienceItem = {
  id: "mit-pune",
  role: "Bachelor of Technology in Computer Science",
  company: "MIT School of Engineering, Pune",
  location: "Pune, India",
  period: "Expected September 2027",
  type: "education",
  icon: GraduationCap,
  highlights: [
    "Specialization in Blockchain Technology",
    "CGPA: 7.0/10.0",
    "Relevant Coursework: Blockchain Technology, Distributed Systems, Cloud Computing, DSA, DBMS, AI/ML",
  ],
};

const certifications: Certification[] = [
  {
    name: "Advanced Blockchain Development",
    provider: "Coursera",
    icon: Award,
  },
  {
    name: "Smart Contract Development",
    provider: "Cyfrin Updraft",
    icon: Award,
  },
  {
    name: "Full Stack Web Development",
    provider: "Udemy",
    icon: Award,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function TimelineCard({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      variants={cardVariants}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0"
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={`absolute left-0 top-0 w-4 h-4 rounded-full border-4 ${
          item.current
            ? "bg-accent border-accent/30"
            : "bg-card border-border"
        }`}
      >
        {item.current && (
          <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
        )}
      </motion.div>

      {/* Content card */}
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        className="group relative p-6 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="hidden sm:flex p-3 rounded-xl bg-accent/10 border border-accent/20">
                <Icon className="w-5 h-5 text-accent" />
              </div>

              <div>
                {/* Role */}
                <h4 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {item.role}
                </h4>

                {/* Company */}
                <p className="text-accent font-medium">{item.company}</p>

                {/* Location */}
                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            {/* Date badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent whitespace-nowrap">
                {item.period}
              </span>
            </div>
          </div>

          {/* Highlights */}
          <ul className="space-y-2">
            {item.highlights.map((highlight, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="p-2 rounded-lg bg-accent/10">
            <Briefcase className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-lg mb-12"
        >
          My professional journey in software development and blockchain technology.
        </motion.p>

        {/* Work Experience Timeline */}
        <div ref={containerRef} className="relative mb-16">
          {/* Animated timeline line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent"
          />

          {/* Static background line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />

          {/* Experience cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {experiences.map((exp, index) => (
              <TimelineCard key={exp.id} item={exp} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-accent" />
            <h3 className="text-xl font-semibold text-foreground">Education</h3>
          </div>

          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="group relative p-6 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex p-3 rounded-xl bg-accent/10 border border-accent/20">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {education.role}
                  </h4>
                  <p className="text-accent font-medium">{education.company}</p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{education.location}</span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {education.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <BookOpen className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-medium text-blue-400 whitespace-nowrap">
                  {education.period}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-accent" />
            <h3 className="text-xl font-semibold text-foreground">
              Certifications
            </h3>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-4"
          >
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, delay: index * 0.1 },
                    },
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group p-4 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                      <Icon className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-tight">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {cert.provider}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
