# Images Directory

This directory contains the complete local image library for the UNREAL MYSTIQUE website - 24 thematically named PNG images ready for use.

**Note**: The website now features mystical theme-based titles using words like "CHRONICLES", "ECHOES", "PROPHECIES", "SPIRITS", "LEGENDS", "MYSTERIES", and "VISIONS" instead of the original "VESSELS" branding.

## 🎨 Dynamic Theme System

Each theme provides a unique artistic experience with custom titles, subtitles, and random image selections:

### 1. **Warm Beige** (Default)

- **Title**: ARTISAN CHRONICLES
- **Subtitle**: Crafted with Warmth & Soul
- **Colors**: Warm beige background with earthy tones

### 2. **Cool Grey**

- **Title**: MINIMAL ECHOES
- **Subtitle**: Pure Form & Function
- **Colors**: Cool grey palette with modern aesthetics

### 3. **Dark Mode**

- **Title**: SHADOW PROPHECIES
- **Subtitle**: Embracing the Unknown
- **Colors**: Dark background with bright white text

### 4. **Forest**

- **Title**: ORGANIC SPIRITS
- **Subtitle**: Born from Nature's Wisdom
- **Colors**: Green-inspired natural tones

### 5. **Sunset**

- **Title**: GOLDEN LEGENDS
- **Subtitle**: Chasing Endless Horizons
- **Colors**: Warm sunset orange and gold hues

### 6. **Ocean**

- **Title**: FLUID MYSTERIES
- **Subtitle**: Depths of Infinite Blue
- **Colors**: Blue ocean-inspired palette

### 7. **Lavender**

- **Title**: ETHEREAL VISIONS
- **Subtitle**: Dreams in Purple Haze
- **Colors**: Soft lavender and purple tones

## ✅ Image Files (COMPLETED)

The following image files are now properly named and ready to use:

### 1. `abstract-landscape-1.png` ✅

- **Alt Text**: Abstract Digital Landscape
- **Position**: Top-left floating image
- **Current Size**: 1.2MB
- **Format**: PNG
- **Description**: Abstract landscape or digital art piece

### 2. `cosmic-vessel-2.png` ✅

- **Alt Text**: Cosmic Vessel Digital Art
- **Position**: Top-right floating image
- **Current Size**: 1.3MB
- **Format**: PNG
- **Description**: Space/cosmic themed digital art

### 3. `surreal-geometry-3.png` ✅

- **Alt Text**: Surreal Geometric Forms
- **Position**: Bottom-left floating image
- **Current Size**: 1.1MB
- **Format**: PNG
- **Description**: Geometric or surreal digital artwork

### 4. `ethereal-waves-4.png` ✅

- **Alt Text**: Ethereal Wave Patterns
- **Position**: Bottom-right floating image
- **Current Size**: 1.2MB
- **Format**: PNG
- **Description**: Wave patterns or fluid digital art

### 5. `digital-vessel-5.png` ✅

- **Alt Text**: Digital Vessel Creation
- **Position**: Middle-left floating image
- **Current Size**: 1.2MB
- **Format**: PNG
- **Description**: Vessel or container-themed digital art

### 6. `unreal-horizon-6.png` ✅

- **Alt Text**: Unreal Horizon Vista
- **Position**: Middle-right floating image
- **Current Size**: 11MB
- **Format**: PNG
- **Description**: Horizon or landscape vista digital art

## ✅ Image Setup Complete

All 6 required images have been successfully renamed and are ready for use. The Hero component has been updated to use the correct PNG file extensions.

## Current Status

- **Total Images**: 24/24 ✅
- **Active Images**: 6 random images per theme change
- **Themes**: 7 unique theme experiences ✅
- **Dynamic Content**: Title + Subtitle + Images change together ✅
- **Format**: PNG
- **Naming Convention**: Semantic, descriptive names
- **Integration**: Fully integrated with Hero component and ThemeSelector
- **File Sizes**: Range from 843KB to 22MB
- **Animations**: Smooth text and image transitions ✅

## Image Specifications

- **Format**: PNG (current)
- **Style**: Digital art, abstract, surreal, artistic photography
- **Theme**: Matches the "UNREAL MYSTIQUE" concept
- **Usage**: Floating images with scroll-triggered animations

## Additional Thematic Images Available ✅

The following additional images have been renamed and are available for future use:

### Extended Collection (7-24):

7. `ethereal-structures-7.png` (912KB) - Ethereal architectural forms
8. `cosmic-geometry-8.png` (2.0MB) - Cosmic geometric patterns
9. `digital-dreams-9.png` (1.6MB) - Dreamlike digital compositions
10. `surreal-vessels-10.png` (897KB) - Surreal vessel interpretations
11. `abstract-reality-11.png` (2.5MB) - Abstract reality concepts
12. `unreal-dimensions-12.png` (1.1MB) - Dimensional art pieces
13. `floating-forms-13.png` (1.7MB) - Floating geometric forms
14. `mystic-landscapes-14.png` (843KB) - Mystical landscape art
15. `digital-horizons-15.png` (9.9MB) - Digital horizon vistas
16. `cosmic-waves-16.png` (1.4MB) - Cosmic wave patterns
17. `ethereal-visions-17.png` (1.6MB) - Ethereal visual concepts
18. `surreal-depths-18.png` (1.2MB) - Deep surreal compositions
19. `abstract-vessels-19.png` (1000KB) - Abstract vessel designs
20. `digital-realms-20.png` (1.4MB) - Digital realm landscapes
21. `unreal-cosmos-21.png` (1.3MB) - Cosmic unreal scenes
22. `floating-dreams-22.png` (22MB) - Floating dream imagery
23. `mystic-geometry-23.png` (1.2MB) - Mystical geometric art
24. `ethereal-infinity-24.png` (2.6MB) - Infinite ethereal concepts

**Total Images**: 24 ✅  
**All Renamed**: Complete thematic naming system  
**Ready for Use**: All images can be swapped into the Hero component as needed

## 🔧 How Theme Changes Work

### Technical Implementation:

1. **Theme Context**: React Context provides theme state across components
2. **Content Selection**: Each theme has predefined title/subtitle combinations
3. **Image Randomization**: 6 random images selected from the 24-image pool
4. **Smooth Transitions**: GSAP animations for text fade-out/fade-in effects
5. **Loading States**: Visual indicator during content transformation

### Animation Sequence:

1. User selects new theme from ThemeSelector
2. Theme context instantly updates across components
3. "✨ Transforming experience..." indicator appears
4. Current title/subtitle fade out and scale down slightly
5. New random images and text content are selected
6. Title/subtitle fade in with spring animation
7. Images animate in from various directions
8. Complete transformation in ~1.2 seconds

### Benefits:

- **Fresh Experience**: Every theme change feels completely new
- **Content Variety**: 24 images ensure diverse visual experiences
- **Thematic Consistency**: Titles match the mood of each color scheme
- **Smooth UX**: Professional transitions without jarring changes
- **Optimized Performance**: React Context eliminates DOM watching overhead
