"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  FolderKanban,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Menu,
  X,
  MapPin,
} from "lucide-react";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: FolderKanban },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Ishan71845",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/ishanshrivastava1511",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:ishan71845@gmail.com",
    icon: Mail,
  },
];

const sidebarVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setIsOpen(false);
  };

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 p-3 rounded-lg bg-card border border-border text-foreground lg:hidden hover:bg-card-hover transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Desktop Sidebar */}
      <motion.aside
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        className="hidden lg:flex fixed left-0 top-0 h-screen w-[280px] bg-[#111111] border-r border-border flex-col z-40"
        role="complementary"
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col h-full py-8 px-6">
          {/* Profile Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center text-center mb-8"
          >
            {/* Avatar with gradient border */}
            <div className="relative w-[150px] h-[150px] mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 animate-pulse opacity-50 blur-md" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-[3px]">
                <div className="w-full h-full rounded-full bg-[#111111] flex items-center justify-center">
                  <span className="text-4xl font-bold bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    IS
                  </span>
                </div>
              </div>
            </div>

            {/* Name */}
            <h1 className="text-xl font-bold text-foreground mb-1">
              Ishan Shrivastava
            </h1>

            {/* Tagline */}
            <p className="text-sm text-muted-foreground mb-2">
              Full Stack Engineer | Blockchain Engineer
            </p>

            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-muted">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Pune, India</span>
            </div>
          </motion.div>

          {/* Navigation Menu */}
          <nav className="flex-1" role="navigation" aria-label="Main navigation">
            <ul className="space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.substring(1);

                return (
                  <motion.li key={item.name} variants={itemVariants} custom={index}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? "bg-accent/10 text-accent"
                          : "text-muted-foreground hover:bg-card hover:text-foreground"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                          isActive ? "text-accent" : ""
                        }`}
                        aria-hidden="true"
                      />
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                        />
                      )}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="pt-6 border-t border-border">
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={
                      link.href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-card transition-all duration-200 group"
                    aria-label={`Visit ${link.name}`}
                  >
                    <Icon
                      className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-screen w-[280px] bg-[#111111] border-r border-border z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            <div className="flex flex-col h-full py-8 px-6">
              {/* Profile Section */}
              <div className="flex flex-col items-center text-center mb-8">
                {/* Avatar with gradient border */}
                <div className="relative w-[150px] h-[150px] mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 animate-pulse opacity-50 blur-md" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-[3px]">
                    <div className="w-full h-full rounded-full bg-[#111111] flex items-center justify-center">
                      <span className="text-4xl font-bold bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        IS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <h1 className="text-xl font-bold text-foreground mb-1">
                  Ishan Shrivastava
                </h1>

                {/* Tagline */}
                <p className="text-sm text-muted-foreground mb-2">
                  Full Stack Engineer | Blockchain Engineer
                </p>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-muted">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>Pune, India</span>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="flex-1" role="navigation" aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.href.substring(1);

                    return (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          aria-current={isActive ? "page" : undefined}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                            isActive
                              ? "bg-accent/10 text-accent"
                              : "text-muted-foreground hover:bg-card hover:text-foreground"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                              isActive ? "text-accent" : ""
                            }`}
                            aria-hidden="true"
                          />
                          <span className="font-medium">{item.name}</span>
                          {isActive && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Social Links */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-center gap-4">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target={link.href.startsWith("mailto") ? undefined : "_blank"}
                        rel={
                          link.href.startsWith("mailto")
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-card transition-all duration-200 group"
                        aria-label={`Visit ${link.name}`}
                      >
                        <Icon
                          className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                          aria-hidden="true"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
