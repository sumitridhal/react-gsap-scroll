# UNREAL VESSELS

A modern, animated website built with React, TypeScript, Vite, and GSAP featuring advanced loading animations, scroll-triggered effects, and dynamic text splitting.

## 🌟 Features

- **Advanced Loading Animations**: Two different loading screen styles
  - Simple progress bar with character animations
  - Advanced circular progress with floating particles and loading stages
- **Text Split Animations**: Character-by-character animations using GSAP
- **Scroll Triggers**: Gallery items animate on scroll with stagger effects
- **Interactive Gallery**: Hover effects and image scaling
- **Animated Background**: Floating geometric shapes with continuous motion
- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Dark theme with glass morphism effects

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Vite** - Build tool and development server
- **GSAP (GreenSock)** - Animation library
  - ScrollTrigger plugin
  - TextPlugin
- **CSS3** - Modern styling with animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd gsap-02
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── LoadingScreen.tsx          # Simple loading animation
│   ├── AdvancedLoadingScreen.tsx  # Advanced loading with particles
│   ├── AnimatedBackground.tsx     # Floating shapes background
│   ├── Hero.tsx                   # Main hero section with split text
│   └── Gallery.tsx                # Image gallery with scroll animations
├── App.tsx                        # Main application component
├── App.css                        # Global styles and animations
└── main.tsx                       # Application entry point
```

## 🎨 Animation Details

### Loading Animations

#### Simple Loader

- Character-by-character text reveal
- Linear progress bar animation
- Smooth fade transitions

#### Advanced Loader

- Multiple loading stages with descriptions
- Circular progress indicator
- Floating particle system
- 3D character animations with rotation

### Hero Section

- Split text animation with 3D rotation effects
- Staggered character reveals
- Floating animation on the entire section
- Responsive typography scaling

### Gallery

- Scroll-triggered fade-in animations
- Scale and opacity transitions
- Hover effects with image scaling
- Staggered animation timing

### Background

- Procedurally generated floating shapes
- Three shape types: circles, squares, triangles
- Continuous floating motion with random timing
- Subtle opacity and scale variations

## 🎮 Interactive Features

- **Loader Toggle**: Switch between different loading animations (appears after 8 seconds)
- **Gallery Hover**: Interactive hover effects on gallery items
- **Scroll Animations**: Elements animate as they enter the viewport
- **Responsive Interactions**: Touch-friendly on mobile devices

## 🎯 Performance Optimizations

- Lazy loading for gallery images
- GSAP timeline cleanup on component unmount
- Optimized scroll triggers with proper cleanup
- Minimal reflows and repaints
- Efficient animation techniques using transforms

## 🎨 Customization

### Changing Colors

Modify the CSS custom properties in `App.css`:

```css
:root {
  --primary-color: #ffffff;
  --accent-color: #666666;
  --background-color: #000000;
}
```

### Animation Timing

Adjust animation durations in the component files:

```typescript
// Example: Slower loading animation
duration: 5, // instead of 3
```

### Gallery Content

Update the `artworks` array in `Gallery.tsx` with your own images and descriptions.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check
```

## 🎭 Loading Screen Variations

The project includes two distinct loading experiences:

1. **Simple Loading Screen**: Clean, minimal design with basic progress indication
2. **Advanced Loading Screen**: Cinematic experience with multiple stages and visual effects

Toggle between them using the "Switch Loader" button that appears after the initial load.

## 🌐 Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🎬 Demo

Visit the live demo: [UNREAL VESSELS](your-demo-url-here)

## Recent Technical Resolutions

### Issue: HeroText Character Animation Not Working

**Problem**: Hero text character-by-character animation was not triggering due to React component mounting timing issues.

**Root Cause**:

- `useGSAP` hook was executing before `heroRef.current` was available
- HeroText component mounted before Hero component finished setting up its ref
- Dependencies array with `heroRef.current` was not triggering re-runs properly

**Resolution**:

1. **Implemented Ref Polling**: Added retry mechanism that polls every 100ms until all refs are available
2. **Enhanced Debugging**: Added comprehensive console logging to track ref availability
3. **Proper Cleanup**: Ensured SplitText instances are properly stored and reverted
4. **TypeScript Safety**: Used correct `SplitText | null` typing

**Code Changes**:

```typescript
// Before: Immediate ref check that failed
if (!heroRef.current) return;

// After: Polling mechanism
const checkHeroRef = () => {
  if (!heroRef.current) {
    setTimeout(checkHeroRef, 100);
    return;
  }
  // Setup animations when all refs ready
};
```

**Result**: Character animations now properly trigger with stagger effect, scroll-triggered scaling, and theme transitions work seamlessly.

### Enhancement: Reversed Character Animation Direction

**Change**: Modified character animation to create a more dramatic effect.

**Updates**:

- **Direction**: Changed stagger from `"start"` to `"end"` (right-to-left animation)
- **Entry Point**: Characters now drop from above (`y: -100`) instead of rising from below
- **Visual Impact**: Creates a cascading effect that feels more dynamic and engaging

**Code Changes**:

```typescript
// Before: Left-to-right, rising from below
{ y: 100, from: "start" }

// After: Right-to-left, dropping from above
{ y: -100, from: "end" }
```

---

Built with ❤️ using React, TypeScript, and GSAP
