"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Github,
  ExternalLink,
  Star,
  GitFork,
  Sparkles,
  Bot,
  GraduationCap,
  Gamepad2,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  github: string;
  liveDemo: string | null;
  icon: React.ComponentType<{ className?: string }>;
  highlight: string;
  gradient: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

const featuredProjects: FeaturedProject[] = [
  {
    id: "competitive-analysis",
    title: "Competitive Analysis Agent",
    description:
      "AI-powered multi-agent system using Google Gemini ADK for automated competitive business analysis with 5 specialized agents working in pipeline. Transforms hours of manual research into minutes of automated insights.",
    techStack: ["Python", "Google Gemini AI", "Streamlit", "SerpAPI", "Multi-Agent System"],
    github: "https://github.com/Ishan71845/competitive-analysis-agent",
    liveDemo: null,
    icon: Bot,
    highlight: "96% time reduction (8 hours → 3 minutes)",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "coaching-platform",
    title: "Coaching Institute Platform",
    description:
      "Full-stack web application with Next.js frontend and Node.js/Express backend, featuring secure authentication, comprehensive admin dashboard, and lead management system for educational institutes.",
    techStack: ["Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/Ishan71845/Coaching-Institute-website",
    liveDemo: null,
    icon: GraduationCap,
    highlight: "JWT Auth • Admin Dashboard • Lead Management",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "gaming-studio",
    title: "9Bit Gaming Studio Website",
    description:
      "Animated portfolio website for gaming studio with 3D graphics rendering using Three.js and complex scroll-triggered animations. Created immersive user experience with smooth transitions.",
    techStack: ["React.js", "Framer Motion", "GSAP", "Three.js", "Tailwind CSS"],
    github: "https://github.com/Ishan71845/9bit-studio",
    liveDemo: null,
    icon: Gamepad2,
    highlight: "Founding Team • Lead Frontend Developer",
    gradient: "from-orange-500/20 to-red-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Projects() {
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/Ishan71845/repos?sort=updated&per_page=10"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const repos: GitHubRepo[] = await response.json();

        // Filter out featured project repos and get top 4
        const featuredNames = ["competitive-analysis-agent", "coaching-platform", "9bit-studio"];
        const filteredRepos = repos
          .filter(
            (repo) =>
              !featuredNames.some((name) =>
                repo.name.toLowerCase().includes(name.toLowerCase())
              ) && !repo.name.includes(".github")
          )
          .slice(0, 4);

        setGithubRepos(filteredRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load repos");
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  const getLanguageColor = (language: string | null): string => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-500",
      Python: "bg-green-500",
      Solidity: "bg-purple-500",
      HTML: "bg-orange-500",
      CSS: "bg-pink-500",
      Java: "bg-red-500",
      Go: "bg-cyan-500",
    };
    return colors[language || ""] || "bg-gray-500";
  };

  return (
    <section id="projects" className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="p-2 rounded-lg bg-accent/10">
            <Rocket className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-lg mb-12 max-w-2xl"
        >
          A collection of projects showcasing my expertise in full-stack development,
          blockchain technology, and AI/ML integration.
        </motion.p>

        {/* Featured Projects */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Featured Projects</h3>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {featuredProjects.map((project) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative h-full rounded-2xl bg-card border border-border overflow-hidden transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-lg group-hover:shadow-accent/10">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    {/* Image Placeholder */}
                    <div className="relative aspect-video bg-gradient-to-br from-card to-background border-b border-border flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
                      <Icon className="w-16 h-16 text-accent/30 group-hover:text-accent/50 group-hover:scale-110 transition-all duration-300" />

                      {/* Overlay gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <div className="relative p-6 space-y-4">
                      {/* Title */}
                      <h4 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                        {project.title}
                      </h4>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Highlight Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                        <Sparkles className="w-3 h-3 text-accent" />
                        <span className="text-xs font-medium text-accent">
                          {project.highlight}
                        </span>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-background border border-border text-xs text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2.5 py-1 rounded-md bg-background border border-border text-xs text-muted-foreground">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                        {project.liveDemo ? (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-card hover:border-accent/50 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        ) : (
                          <button
                            disabled
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-muted font-medium text-sm cursor-not-allowed opacity-50"
                          >
                            <ExternalLink className="w-4 h-4" />
                            No Demo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* More Projects from GitHub */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6"
          >
            <Github className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">More on GitHub</h3>
          </motion.div>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 text-accent animate-spin" />
              <span className="ml-2 text-muted-foreground">Loading repositories...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 md:grid-cols-2"
            >
              {githubRepos.map((repo) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="group p-5 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Github className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                      <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {repo.name}
                      </h4>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {repo.description || "No description available"}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}
                          />
                          <span className="text-xs text-muted-foreground">
                            {repo.language}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {repo.stargazers_count}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* View All on GitHub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center mt-8"
          >
            <a
              href="https://github.com/Ishan71845"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:border-accent/50 hover:bg-card-hover transition-all duration-300"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
              <span className="font-medium text-foreground">View All Repositories</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
