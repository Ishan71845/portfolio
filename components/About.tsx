"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  GraduationCap,
  Trophy,
  Target,
  Code2,
  Layout,
  Server,
  Blocks,
  Wrench,
} from "lucide-react";

const skillCategories = [
  {
    name: "Languages",
    icon: Code2,
    skills: ["JavaScript", "TypeScript", "Python", "Solidity", "SQL"],
  },
  {
    name: "Frontend",
    icon: Layout,
    skills: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
  },
  {
    name: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "RESTful APIs"],
  },
  {
    name: "Blockchain",
    icon: Blocks,
    skills: ["Ethereum", "Solidity", "Web3.js", "Smart Contracts", "Hardhat"],
  },
  {
    name: "Tools",
    icon: Wrench,
    skills: ["Git", "GitHub", "Docker", "Postman", "VS Code", "Vercel", "AWS"],
  },
];

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "B.Tech in Computer Science (Blockchain Technology)",
  },
  {
    icon: Trophy,
    title: "Hackathons",
    description: "Google AI, SIH, Microsoft Imagine Cup, ISRO",
  },
  {
    icon: Target,
    title: "Goal",
    description: "Google Summer of Code 2026",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function About() {
  return (
    <section id="about" className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="p-2 rounded-lg bg-accent/10">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Bio Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I&apos;m currently pursuing my{" "}
                <span className="text-foreground font-medium">
                  B.Tech in Computer Science
                </span>{" "}
                with a specialization in{" "}
                <span className="text-accent font-medium">
                  Blockchain Technology
                </span>{" "}
                at MIT School of Engineering, Pune. My passion lies in building
                innovative decentralized applications and robust full-stack web
                solutions.
              </p>

              <p>
                With hands-on experience in the{" "}
                <span className="text-foreground font-medium">MERN stack</span>,
                blockchain development, and emerging AI/ML technologies, I enjoy
                tackling complex problems and transforming ideas into scalable,
                production-ready applications.
              </p>

              <p>
                I actively participate in hackathons to challenge myself and
                collaborate with talented developers. I&apos;ve competed in prestigious
                events including{" "}
                <span className="text-foreground font-medium">
                  Google AI Hackathon
                </span>
                ,{" "}
                <span className="text-foreground font-medium">
                  Smart India Hackathon
                </span>
                ,{" "}
                <span className="text-foreground font-medium">
                  Microsoft Imagine Cup
                </span>
                , and{" "}
                <span className="text-foreground font-medium">
                  ISRO Hackathon
                </span>
                . Currently, I&apos;m preparing for{" "}
                <span className="text-accent font-medium">
                  Google Summer of Code 2026
                </span>
                .
              </p>
            </div>

            {/* Highlight Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4"
            >
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors group"
                  >
                    <Icon className="w-5 h-5 text-accent mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {highlight.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {highlight.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Skills Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-xl font-semibold text-foreground">
                Technical Skills
              </h3>
              <div className="flex-1 h-px bg-border" />
            </div>

            {skillCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-accent" />
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      {category.name}
                    </h4>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2"
                  >
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                        }}
                        transition={{ duration: 0.2 }}
                        className="px-3 py-1.5 rounded-full bg-card border border-border text-sm text-foreground hover:border-accent/50 hover:text-accent cursor-default transition-colors"
                        style={{
                          transitionDelay: `${skillIndex * 50}ms`,
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Stats or additional info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 p-4 rounded-xl bg-gradient-to-r from-accent/10 to-cyan-500/10 border border-accent/20"
            >
              <p className="text-sm text-muted-foreground">
                <span className="text-accent font-semibold">Always learning:</span>{" "}
                Currently exploring advanced smart contract patterns, ZK proofs,
                and AI integration in Web3 applications.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
