# ScalePods Project Design Documentation

## 1. Vision & Identity
ScalePods is a premium, agentic AI automation platform. The design identity is built on **trust, precision, and futuristic efficiency**. It uses a "Developer-First" aesthetic that feels robust yet accessible.

## 2. Global Design System

### A. Color Palette
- **Backgrounds**:
  - Primary: `#0A0A0A` (Deepest Black)
  - Secondary: `#111111` (Section backgrounds, Sidebars)
  - Elevated: `#1E1E1E` (Cards, Table rows, Input fields)
- **Accents**:
  - ScalePods Blue: `#0080FF` (Primary action color)
  - Analytics Cyan: `#00CED1` (Trends, secondary highlights)
  - Soft Purple: `#A855F7` (Gradient overlays, brand depth)
- **Typography Colors**:
  - Primary Text: `#FFFFFF` (Heading white)
  - Secondary Text: `rgba(255, 255, 255, 0.5)` (Muted/Ghost text)
  - Contrast: `#F87171` (System red for warnings/logout)

### B. Typography
- **Primary Typeface**: Inter / Geist Sans
- **Hierarchy**:
  - Main Headlines: 28px - 36px, Bold, Tracking -2%
  - Section Headers: 18px - 22px, Semibold
  - Body Copy: 14px, Medium, Leading 1.5
  - Data/Monospace: 12px (Used for metrics, paths, and IDs)

### C. UI Patterns
- **Full-Screen Takeovers**: Admin and specialized dashboards use `fixed inset-0` to provide an immersive app experience separate from the marketing site.
- **Glassmorphism**: Subtle usage of `backdrop-blur` and low-opacity white borders (`border-white/[0.05]`).
- **Pill-Style Progress**: Data visualization in tables uses rounded-md backgrounds (`bg-[#1E1E1E]`) with colored overlays (`bg-[#2A2A2A]`) to represent weight/percentage.
- **Dynamic Charting**: High-density Recharts area graphs with hidden axes and dual-layered color gradients.

## 3. Component Architecture

### Dashboard Layout
- **Container**: Max-width 5XL (`1280px`), centered, generous top padding (16 - 20 units).
- **KPI Row**: A borderless, horizontal line of metrics using clean "Label-Value" stacks.
- **The Data Grid**: A 2-column responsive grid for tabular data widgets.

### Controls
- **Buttons**: Rounded-LG (8px) or Rounded-Full for project-wide actions.
- **Date Pickers**: Ghost style with `#1E1E1E` backgrounds and icon prefixes.

## 4. Modernist Motion Rules
- **Entry Animations**: Subtle `y: 20` to `y: 0` fade-ins using Framer Motion.
- **Transitions**: 0.2s - 0.4s duration, moderate easing curves for hover states and progress bar growth.
