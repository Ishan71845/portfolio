"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE = `Hi! 👋 I'm Ishan's AI assistant. I can tell you about his projects, skills, experience, or internship availability. What would you like to know?`;

const SUGGESTED_QUESTIONS = [
  "What are your projects?",
  "What's your tech stack?",
  "Are you available for internships?",
  "Tell me about your experience",
];

function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // Projects
  if (message.includes("project") || message.includes("portfolio") || message.includes("built") || message.includes("work")) {
    return `Ishan has worked on some exciting projects! 🚀

**Featured Projects:**
1. **Competitive Analysis Agent** - AI-powered multi-agent system using Google Gemini that reduced analysis time by 96%
2. **Coaching Institute Platform** - Full-stack MERN app with JWT auth and admin dashboard
3. **9Bit Gaming Studio Website** - Animated React site with Three.js 3D graphics

Check out the Projects section above or visit his GitHub for more!`;
  }

  // Skills/Tech Stack
  if (message.includes("skill") || message.includes("tech") || message.includes("stack") || message.includes("language") || message.includes("know")) {
    return `Ishan is proficient in a wide range of technologies! 💻

**Languages:** JavaScript, TypeScript, Python, Solidity, SQL
**Frontend:** React.js, Next.js, Tailwind CSS, Framer Motion
**Backend:** Node.js, Express.js, MongoDB, PostgreSQL
**Blockchain:** Ethereum, Web3.js, Smart Contracts, Hardhat
**Tools:** Git, Docker, Postman, VS Code, Vercel, AWS

He's always learning new technologies too!`;
  }

  // Internship/Availability
  if (message.includes("intern") || message.includes("available") || message.includes("hire") || message.includes("job") || message.includes("position") || message.includes("opportunity")) {
    return `Great question! 🎯

Ishan is **available for Summer 2026 internships** and is open to:
• Full-time positions
• Freelance projects
• Remote opportunities

He's particularly interested in roles involving **blockchain development** and **full-stack web development**.

Feel free to reach out via the contact form or email him at ishan71845@gmail.com!`;
  }

  // Experience
  if (message.includes("experience") || message.includes("work history") || message.includes("job")) {
    return `Here's Ishan's professional experience! 💼

**Frontend Developer @ 9 Bit Studio** (2025)
- Founding core team member & lead frontend developer
- Built animated website with React, Three.js, and Framer Motion

**Full Stack Developer @ Arpita's Coaching Classes** (Jun-Aug 2025)
- Developed full-stack platform with MERN stack
- Implemented JWT authentication and admin dashboard

He's also pursuing B.Tech in CS (Blockchain) at MIT Pune, graduating in 2027.`;
  }

  // Hackathons
  if (message.includes("hackathon") || message.includes("competition") || message.includes("contest")) {
    return `Ishan loves hackathons! 🏆

He has participated in:
• **Google AI Hackathon**
• **Smart India Hackathon (SIH)**
• **Microsoft Imagine Cup**
• **ISRO Hackathon**

These experiences helped him sharpen his problem-solving skills and work effectively in teams under pressure!`;
  }

  // Education
  if (message.includes("education") || message.includes("study") || message.includes("college") || message.includes("university") || message.includes("degree")) {
    return `Ishan is currently pursuing his education! 🎓

**MIT School of Engineering, Pune**
- B.Tech in Computer Science (Blockchain Technology)
- Expected Graduation: September 2027
- CGPA: 7.0/10.0

**Relevant Coursework:**
Blockchain Technology, Distributed Systems, Cloud Computing, Data Structures & Algorithms, DBMS, AI/ML`;
  }

  // Contact
  if (message.includes("contact") || message.includes("email") || message.includes("reach") || message.includes("connect")) {
    return `You can reach Ishan through multiple channels! 📬

**Email:** ishan71845@gmail.com
**LinkedIn:** linkedin.com/in/ishanshrivastava1511
**GitHub:** github.com/Ishan71845

Or use the contact form in the Contact section above. He typically responds within 24 hours!`;
  }

  // Location
  if (message.includes("location") || message.includes("where") || message.includes("based") || message.includes("live")) {
    return `Ishan is based in **Pune, India** 📍

He's open to:
• Remote work opportunities worldwide
• On-site positions in India
• Hybrid arrangements

Time zone: IST (UTC+5:30)`;
  }

  // About/Who
  if (message.includes("who") || message.includes("about") || message.includes("tell me about") || message.includes("introduce")) {
    return `Let me introduce Ishan! 👨‍💻

He's a **Full-Stack Developer & Blockchain Engineer** currently studying at MIT Pune. He's passionate about:

• Building decentralized applications
• Creating beautiful, responsive web experiences
• Working with AI/ML technologies
• Contributing to open source

He's preparing for **Google Summer of Code 2026** and always eager to learn new technologies!`;
  }

  // Hello/Greetings
  if (message.includes("hello") || message.includes("hi") || message.includes("hey") || message.includes("greetings")) {
    return `Hello! 👋 Nice to meet you!

I'm here to help you learn more about Ishan. Feel free to ask about:
• His projects and portfolio
• Technical skills and stack
• Work experience
• Education and certifications
• Internship availability

What would you like to know?`;
  }

  // Thanks
  if (message.includes("thank") || message.includes("thanks") || message.includes("appreciate")) {
    return `You're welcome! 😊

Is there anything else you'd like to know about Ishan? I'm happy to help with any questions about his projects, skills, or experience!`;
  }

  // Default response
  return `That's a great question! 🤔

While I might not have specific information about that, here's what I can tell you about:
• **Projects** - His portfolio and GitHub work
• **Skills** - Technologies he's proficient in
• **Experience** - His work history
• **Availability** - Internship and job opportunities

You can also explore the sections above or contact Ishan directly at ishan71845@gmail.com!`;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: WELCOME_MESSAGE,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = generateResponse(userMessage.content);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-shadow ${
          isOpen ? "hidden" : ""
        }`}
      >
        <MessageCircle className="w-6 h-6" />
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-6rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20">
                  <Bot className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    Ask me about Ishan
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    AI Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-background/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === "user"
                        ? "bg-accent/20"
                        : "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-accent" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-accent" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                      message.role === "user"
                        ? "bg-accent text-white rounded-br-md"
                        : "bg-background border border-border text-foreground rounded-bl-md"
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words prose prose-sm prose-invert max-w-none">
                      {message.content.split("\n").map((line, i) => (
                        <span key={i}>
                          {line.startsWith("**") && line.endsWith("**")
                            ? <strong>{line.slice(2, -2)}</strong>
                            : line.includes("**")
                            ? line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                                part.startsWith("**") && part.endsWith("**")
                                  ? <strong key={j}>{part.slice(2, -2)}</strong>
                                  : part
                              )
                            : line}
                          {i < message.content.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-background border border-border">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggested Questions (only show initially) */}
              {messages.length === 1 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs text-accent hover:bg-accent/20 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-accent text-white hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-[10px] text-muted text-center">
                AI responses are pre-programmed. For detailed inquiries, please use the contact form.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
