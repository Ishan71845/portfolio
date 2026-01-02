"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Github,
  Linkedin,
  MapPin,
  ExternalLink,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ishan71845@gmail.com",
    href: "mailto:ishan71845@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "ishanshrivastava1511",
    href: "https://linkedin.com/in/ishanshrivastava1511",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Ishan71845",
    href: "https://github.com/Ishan71845",
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    console.log("Form submitted:", data);

    try {
      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setSubmitStatus("success");
      reset();

      // Auto-hide success message
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-12">
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
            <Mail className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-lg mb-12 max-w-2xl"
        >
          I&apos;m always open to discussing new opportunities, projects, or just
          having a chat about technology and blockchain. Feel free to reach out!
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={info.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
                  >
                    <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="text-foreground font-medium group-hover:text-accent transition-colors">
                        {info.value}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                );
              })}
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-accent/10 to-cyan-500/10 border border-accent/20"
            >
              <MapPin className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-foreground font-medium">Pune, India</p>
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-4 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-sm font-medium text-green-400">
                  Available for opportunities
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Open to internships, freelance projects, and full-time positions
                starting Summer 2026.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
              {/* Success/Error Messages */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                      submitStatus === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <p className="text-sm">
                          Message sent successfully! I&apos;ll get back to you soon.
                        </p>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="text-sm">
                          Something went wrong. Please try again or email me directly.
                        </p>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className={`w-full px-4 py-3 rounded-lg bg-background border text-foreground placeholder:text-muted focus:outline-none transition-colors ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-accent"
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg bg-background border text-foreground placeholder:text-muted focus:outline-none transition-colors ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-accent"
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register("subject", { required: "Subject is required" })}
                    className={`w-full px-4 py-3 rounded-lg bg-background border text-foreground placeholder:text-muted focus:outline-none transition-colors ${
                      errors.subject
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-accent"
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg bg-background border text-foreground placeholder:text-muted focus:outline-none transition-colors resize-none ${
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-accent"
                    }`}
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Mailto Fallback */}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Or email me directly at{" "}
                <a
                  href="mailto:ishan71845@gmail.com"
                  className="text-accent hover:underline"
                >
                  ishan71845@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
