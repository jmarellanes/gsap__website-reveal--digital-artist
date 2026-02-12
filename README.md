## Apex Motors - Cinematic GSAP Flip Intro

A luxury car showcase featuring a seamless layout transition using the **GSAP** (GreenSock Animation Platform) Flip plugin. The animation transforms a central hero image from a typographic element into a horizontal scroll gallery, creating a high-end cinematic experience.

## Overview

This project showcases a modern automotive landing page with advanced animations powered by **GSAP**. The experience includes:

- **Seamless Layout Transitions**: Utilizing the GSAP Flip plugin to smoothly transition elements between states.
- **Kinetic Typography**: Split-text animations where the title "Apex Motors" dynamically separates to reveal content.
- **Horizontal Scroll Gallery**: A custom-implemented horizontal scrolling interaction for the vehicle showcase.
- **Responsive Design**: Fluid typography and layout that adapts to various screen sizes.

## Features

✨ **Advanced Animations**

- GSAP Flip plugin for complex layout changes
- Timeline-based orchestration
- Custom easing for premium feel

🎨 **Modern Design**

- Custom typography (Glasgow Grotesk & Protage)
- Minimalist aesthetic
- Interactive gallery elements

⚡ **Performance Optimized**

- Vite build tool
- WebP image format support
- Font preloading

🛠️ **Developer Experience**

- ESLint with modern config
- Hot Module Replacement (HMR)
- Module-based architecture

## Tech Stack

- **Animation**: [GSAP](https://gsap.com/) v3.14.2 (Core + Flip Plugin)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Linting**: ESLint 9.x
- **Package Manager**: pnpm
- **Module System**: ES Modules

## Project Structure

```
.
├── index.html              # Main HTML entry point
├── src/
│   ├── scripts/
│   │   └── main.js        # Animation logic and DOM manipulation
│   ├── styles/
│   │   ├── style.css      # Main stylesheet
│   │   └── fonts.css      # Font imports
│   └── assets/
│       ├── fonts/         # Custom font files
│       └── images/        # Project images (image-1.webp through image-6.webp)
├── public/
│   └── favicon.svg        # Site favicon
├── package.json           # Project dependencies
├── eslint.config.mjs      # ESLint configuration
└── pnpm-lock.yaml         # Dependency lock file
```

## Getting Started

### Prerequisites

- Node.js 18+ (or latest LTS)
- pnpm 8+ (or npm/yarn)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd starter__vanilla
```

2. Install dependencies:

```bash
pnpm install
```

### Development

Start the development server with hot reload:

```bash
pnpm dev
```

The site will be available at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Scripts

| Script          | Purpose                           |
| --------------- | --------------------------------- |
| `pnpm dev`      | Start development server with HMR |
| `pnpm build`    | Create production-optimized build |
| `pnpm preview`  | Preview production build locally  |
| `pnpm lint`     | Run ESLint to check code quality  |
| `pnpm lint:fix` | Auto-fix ESLint issues            |

## How It Works

### Animation Flow

The project uses GSAP Timelines and the Flip plugin to orchestrate the intro sequence:

1. **Typography Reveal**
   - The "APEX MOTORS" title characters reveal with a staggered animation from the bottom.

2. **Split & Expand**
   - The title splits: "APEX" moves left, "MOTORS" moves right.
   - The central hero image (Ferrari F40) scales up and moves from a clipped typographic state to its full gallery position.

3. **Gallery Layout**
   - The layout seamlessly transforms using `Flip.from()`, calculating the start and end states of the DOM elements.
   - Secondary gallery images reveal with a clip-path animation.
   - Text details (title, type) slide in.

4. **Interaction**
   - Once the animation completes, a custom horizontal scroll listener is enabled, allowing users to navigate through the car collection.

### Key Components

**HTML**

- Semantic structure with `<nav>`, `<main>`, and `<article>` tags.
- Data attributes (e.g., `data-main`) used to identify key animation targets.

**CSS**

- Layer-based CSS Reset.
- CSS Variables for consistent theming (`--color-bg`, `--font-primary`, etc.).
- CSS Grid for the main layout structure.

**JavaScript**

- Dynamic generation of gallery items from an array of data.
- Text splitting logic for character-level animations.
- `ResizeObserver` for maintaining correct header height variables.

## Customization

### Content

Edit the `items` array in `src/scripts/main.js` to change the gallery content:

```javascript
const items = [
  { title: "New Car Name", type: "[Engine Type]", img: "./path/to/image.webp" },
  // ...
];
```

### Colors

Edit CSS variables in `src/styles/style.css`:

```css
:root {
  --color-bg: rgb(196, 196, 176);
  --color-text: #000;
}
```

### Animations

Modify animation timing and easing in `src/scripts/main.js`. The main timeline configuration is:

```javascript
gsap.defaults({ duration: 1, ease: "power3.out" });
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## Credits

- Developed by Jose Arellanes
- Animations powered by [GSAP](https://gsap.com/)
- Built with [Vite](https://vitejs.dev/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
