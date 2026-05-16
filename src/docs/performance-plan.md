# Performance & Production Optimization Plan

## 1. Code Splitting & Dynamic Imports
- [x] **Home Page**: Use `dynamic()` for all sections below the fold.
- [ ] **Global Page**: Ensure heavy components like `GCCFeatures` and `GCCIntegrations` are dynamically imported.
- [ ] **Use Cases Page**: Add lazy loading for the grid if it grows larger.

## 2. Memoization & Component Optimization
- [ ] **Sections.tsx**: Memoize `BenefitCard`, `FAQItem`, `MarqueeRow`, `IntegrationRow`.
- [ ] **Shared UI**: Memoize `Label`, `H2`, `Sub`, `GlowingButton`.
- [ ] **Navbar**: Ensure `Navbar` and its sub-menus are memoized to prevent re-renders on scroll.

## 3. Animation & Rendering Performance
- [ ] **GPU Acceleration**: Add `translate3d(0,0,0)` and `will-change` to all continuous animations.
- [ ] **Marquee**: Use CSS animations with `transform` instead of Framer Motion for simple marquees to reduce JS main thread load.
- [ ] **Blur/Filters**: Reduce or remove heavy `backdrop-filter` and `filter: blur` on mobile devices.

## 4. Hydration & Stability
- [ ] **Theme Isolation**: Ensure components that rely on `useTheme` don't cause layout shifts during hydration.
- [ ] **Mobile Detection**: Standardize `useMobile` usage to avoid mismatch between SSR and Client.

## 5. Asset Optimization
- [ ] **Video**: Add `preload="auto"` and `playsInline` to hero video.
- [ ] **Images**: Ensure all images use `next/image` with proper `priority` and `sizes`.

## 6. Cleanup
- [ ] **Console Logs**: Remove any development logs.
- [ ] **TypeScript**: Ensure no `any` types remain in critical paths.
