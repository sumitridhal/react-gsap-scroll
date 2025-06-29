# Changelog

All notable changes to the UNREAL MYSTIQUE project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.1] - 2024-12-20

### [FIXED]

- **HeroText Animation Timing**: Resolved critical issue where character animations weren't triggering due to React component mounting order
  - Implemented ref polling mechanism with 100ms retry intervals
  - Added comprehensive debugging logs for ref availability tracking
  - Ensured proper SplitText cleanup with TypeScript safety (`SplitText | null`)
  - Fixed dependency array issues in useGSAP hook

### [ENHANCED]

- **Character Animation Direction**: Reversed animation for more dramatic effect
  - Changed stagger direction from `"start"` to `"end"` (right-to-left cascade)
  - Modified entry point from `y: 100` to `y: -100` (dropping from above)
  - Created more cinematic character entrance animation

## [1.3.0] - 2024-12-20

### [ADDED]

- **Dynamic Image Loading System**: Complete image management with context
  - Created ImageContext for centralized image state management
  - Added ImageLoader component with beautiful loading screen
  - Implemented preloading system to eliminate image flicker
  - Added smooth transition animations for image swaps

### [CHANGED]

- **Image Positioning**: Converted to viewport-based dynamic positioning
  - Replaced fixed pixel values with `window.innerWidth/Height` calculations
  - Implemented proper offscreen positioning logic (beyond viewport edges)
  - Added responsive final positions using percentages
  - Fixed negative coordinate issues for all image positions

### [ENHANCED]

- **Performance Optimization**: Separated components for better animation isolation
  - Split Hero into HeroText and FloatingImages components
  - Eliminated animation conflicts between text and image systems
  - Improved scroll performance with isolated GSAP contexts

## [1.2.0] - 2024-12-20

### [ADDED]

- **Comprehensive Theme System**: 7 unique themes with dynamic content
  - Warm Beige, Cool Grey, Dark Mode, Forest, Sunset, Ocean, Lavender
  - Dynamic title/subtitle system with mystical naming
  - Theme-specific color schemes using CSS custom properties
  - ThemeSelector widget with dropdown interface and localStorage persistence

### [ADDED]

- **Local Image Library**: 24 curated artistic images
  - Organized image library with thematic naming convention
  - Random image selection system (6 images per theme change)
  - Smooth transition animations between image sets
  - Loading indicators for theme/image transitions

### [CHANGED]

- **React Context Architecture**: Migrated from MutationObserver to React Context
  - Implemented ThemeContext for centralized theme management
  - Created useTheme() hook for clean component integration
  - Eliminated DOM watching overhead for better performance
  - Added proper state synchronization across components

## [1.1.0] - 2024-12-20

### [ADDED]

- **Lenis Smooth Scrolling**: Professional smooth scrolling integration
  - Configured with 1.2s duration and exponential easing
  - GSAP ScrollTrigger synchronization for optimal performance
  - Custom scroll progress indicator with gradient design
  - Hardware acceleration and performance optimizations

### [ADDED]

- **Floating Images System**: Dynamic image animations around screen
  - 6 floating images positioned around viewport edges
  - Scroll-triggered movement from offscreen to final positions
  - Continuous rotation and scaling effects throughout scroll
  - Responsive positioning based on screen dimensions

### [ENHANCED]

- **Hero Text Animations**: Advanced GSAP-powered text effects
  - SplitText character-by-character animations with stagger
  - Scroll-triggered title scaling (reduces to 50% minimum)
  - Subtitle fade-out in first 40% of scroll progress
  - Smooth theme transition animations

## [1.0.0] - 2024-12-20

### [ADDED]

- **Initial Project Setup**: React TypeScript foundation with Vite
  - GSAP integration with ScrollTrigger and SplitText plugins
  - @gsap/react for modern React integration
  - TypeScript configuration for type safety
  - CSS custom properties system for theming

### [ADDED]

- **Core Components Architecture**:
  - Hero section with pinned scroll behavior (200vh height)
  - AnimatedBackground with floating geometric shapes
  - ScrollProgress component for visual scroll feedback
  - Responsive design with clamp() typography

### [ADDED]

- **Loading Screen System**: Multiple loading implementations
  - Simple character-by-character loading animation
  - Advanced cinematic loading with circular progress
  - Multi-stage loading states with particle effects
  - Smooth transitions to main content

### [ADDED]

- **Base Styling**: Dark theme foundation
  - Custom scrollbar styling
  - Glass morphism effects and shadows
  - Transform optimizations for performance
  - Mobile-responsive breakpoints

---

## Development Notes

### Performance Optimizations

- Hardware acceleration with `translate3d()` transforms
- `will-change` properties for animation optimization
- Proper GSAP cleanup and ScrollTrigger management
- Component isolation to prevent animation conflicts

### Technical Decisions

- useGSAP over useEffect for all GSAP animations
- React Context over prop drilling for theme management
- Local images over external URLs for reliability
- Viewport-based positioning for true responsiveness

### Future Considerations

- Additional theme variants
- More animation presets
- Mobile gesture optimizations
- Performance monitoring integration
