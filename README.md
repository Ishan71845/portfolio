# Ishan Portfolio

A modern portfolio website for a full-stack blockchain developer, built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form

## Features

- Dark theme by default with modern aesthetics
- Fully responsive design
- Smooth animations and transitions
- SEO optimized with proper meta tags
- TypeScript strict mode for type safety
- Custom color scheme with accent colors

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
├── lib/                  # Utility functions
├── public/               # Static assets
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ishan-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Color Scheme

| Color       | Hex       | Usage                    |
|-------------|-----------|--------------------------|
| Background  | `#0a0a0a` | Main background          |
| Foreground  | `#fafafa` | Primary text             |
| Accent      | `#3b82f6` | Links, highlights        |
| Muted       | `#737373` | Secondary text           |
| Card        | `#141414` | Card backgrounds         |
| Border      | `#262626` | Borders, dividers        |

## License

MIT License
