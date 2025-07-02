# Ad Unit - Interactive Advertising Unit

Modern, responsive advertising unit created as a web application. The project uses JavaScript ES6+, SCSS and advanced GSAP animations to create an engaging user experience on mobile devices.

## 🚀 Features

- **3-scene system**: Intro → Gallery → Video
- **Mobile responsiveness**: Mobile-first design
- **Orientation lock**: Automatic landscape orientation detection and lock
- **Interactive gallery**: Swiper.js with coverflow effect
- **Video positioning**: Dynamic positioning based on clicked slide
- **Event tracking system**: Complete user interaction logging
- **Smooth animations**: GSAP for professional transitions and effects

## 📁 Project Structure

```
ad-unit-task/
├── content/                    # Assets (images, video)
│   ├── bg.jpg                 # Background
│   ├── headline.png           # Headline
│   ├── cta.png               # CTA button
│   ├── shadow.png            # Shadow
│   ├── shoe1-4.png           # Product images
│   └── video.mp4             # Product video
├── src/
│   ├── js/
│   │   ├── scenes/           # Application scenes
│   │   │   ├── IntroScene.js
│   │   │   ├── GalleryScene.js
│   │   │   └── VideoScene.js
│   │   ├── components/       # Components
│   │   │   ├── Gallery.js
│   │   │   ├── VideoPlayer.js
│   │   │   └── OrientationLock.js
│   │   ├── utils/
│   │   │   └── EventTracker.js
│   │   ├── SceneManager.js   # Scene management
│   │   └── main.js          # Entry point
│   └── scss/
│       ├── components/       # Component styles
│       ├── scenes/          # Scene styles
│       ├── utils/           # Variables, mixins, reset
│       └── main.scss        # Main styles file
├── dist/                    # Production files (generated)
├── index.html              # HTML template
├── package.json
├── webpack.config.js       # Bundler configuration
└── README.md
```

## 🛠️ Technologies

- **JavaScript ES6+**: Modern JavaScript with classes and modules
- **SCSS**: Advanced styles with nested rules and mixins
- **GSAP**: Animation library for smooth transitions
- **Swiper.js**: Gallery library with coverflow effect
- **Webpack**: Bundler for compilation and optimization
- **Babel**: ES6+ transpilation for compatibility

## 📱 Responsiveness

The project uses a **mobile-first** approach with the following breakpoints:

- **Mobile Small**: 320px+
- **Mobile**: 480px+
- **Mobile Large**: 640px+
- **Tablet**: 768px+
- **Desktop**: 1200px+

## 🎮 Application Flow

### Scene 1: Intro (8 seconds)
- Displays headline with animation
- Automatic transition to gallery scene after 8 seconds
- Smooth entry animations with bounce effect

### Scene 2: Gallery
- Interactive gallery of 4 products
- Swiper.js with coverflow effect
- Pulsing CTA button
- Click on slide → transition to video scene

### Scene 3: Video
- Video player positioned according to clicked slide:
  - Slide 1: Top left corner
  - Slide 2: Top right corner
  - Slide 3: Bottom left corner
  - Slide 4: Bottom right corner
- Automatic looped playback

## 📊 Event Tracking System

The application tracks the following events in browser console:

- `ad_load` - Page load
- `window_resize` - Window resize
- `page_hide` - Page leave
- `scene_change:{scene_name}` - Scene change
- `user_interaction:slide_click:{slide_index}` - Gallery slide click
- `user_interaction:cta_click` - CTA button click

## 🚀 Installation and Launch

### Requirements
- Node.js (v14 or newer)
- npm or yarn

### Installation steps

1. **Clone repository**
```bash
git clone https://github.com/Yakubzie/ad-unit-task.git
cd ad-unit-task
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run in development mode**
```bash
npm run dev
# or
yarn dev
```
Application will be available at: `http://localhost:3000`

4. **Build production version**
```bash
npm run build
# or
yarn build
```
Production files will be generated in `dist/` folder with assets in `dist/assets/`

5. **Clean build files**
```bash
npm run clean
# or
yarn clean
```

## 🏗️ Architecture and Technical Decisions

### Design Patterns

**1. Component Architecture**
- Each UI element is a separate class with its own logic
- Separation of responsibilities between scenes and components
- Easy testing and functionality extension

**2. Scene Manager Pattern**
- Central management of transitions between scenes
- Unified API for all scenes
- Easy addition of new scenes

**3. Event Tracking System**
- Unified API for event tracking
- Easy extension with new metrics
- Separation of tracking logic from business logic

### Technical Decisions

**GSAP instead of CSS Animations**
- Better animation control
- Higher performance on mobile devices
- Timeline API for sequential animations

**Swiper.js for gallery**
- Native touch gesture support
- Coverflow effect out-of-the-box
- Excellent responsiveness

**SCSS with modular structure**
- Variables for easy color and size management
- Mixins for repeatable patterns
- Mobile-first media queries

**Webpack for bundling**
- File size optimization
- Automatic SCSS processing
- Hot reload in development
- Asset copying and path management

### Optimizations

- **Lazy loading** - Components loaded on demand
- **Image optimization** - Responsive images
- **Code splitting** - Code division into modules
- **CSS purging** - Removal of unused styles in production
- **Asset management** - Automatic copying and path resolution

## 🎨 Customization

### Changing colors
Edit file `src/scss/utils/_variables.scss`:
```scss
$color-primary: #your-color;
```

### Adding new scene
1. Create class in `src/js/scenes/NewScene.js`
2. Add import in `SceneManager.js`
3. Create styles in `src/scss/scenes/_new-scene.scss`

### Changing animation times
Edit variables in `_variables.scss`:
```scss
$duration-fast: 0.2s;
$duration-normal: 0.3s;
```

### Asset management
- **Development**: Assets are served from `content/` folder via `./assets/` path
- **Production**: Assets are copied to `dist/assets/` folder automatically
- **Path consistency**: Both modes use `./assets/` path for all images and videos

## 🐛 Troubleshooting

**Issue**: Video doesn't autoplay
- **Solution**: Modern browsers block autoplay. Video has `muted` attribute to bypass this limitation.

**Issue**: Orientation is not detected correctly
- **Solution**: Check if device supports Screen Orientation API. Fallback uses window dimensions.

**Issue**: Swiper doesn't work on touch devices
- **Solution**: Make sure Swiper CSS is properly loaded and touchRatio is set to 1.

---

**Author**: Jakub Gietler  
**Date**: 02.07.2025  
**Version**: 1.0.0 