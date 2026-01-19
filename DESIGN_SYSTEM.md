# Tailwind CSS Design System

This document outlines the Tailwind-based design system used throughout the Recipe API Integration project.

## 🎨 Color Palette

### Primary Colors

- **Blue to Purple Gradient**: `from-blue-600 to-purple-600`
- **Extended Gradient**: `from-blue-600 via-purple-600 to-pink-500`

### Semantic Colors

- **Success**: `from-green-500 to-green-600`
- **Error**: `from-red-500 to-red-600` / `border-red-500`
- **Warning**: `from-yellow-500 to-yellow-600`
- **Info**: `from-blue-500 to-blue-600`

### UI Colors

- **Background**: `bg-gray-50` (light gray)
- **Cards**: `bg-white`
- **Borders**: `border-gray-300` / `border-gray-100`
- **Text Primary**: `text-gray-800`
- **Text Secondary**: `text-gray-600`
- **Text Muted**: `text-gray-500`

## 📐 Spacing & Sizing

### Padding

- **Small**: `p-3` / `px-3 py-1`
- **Medium**: `p-5` / `px-5 py-3`
- **Large**: `p-8` / `px-8 py-4`
- **XL**: `p-10`

### Margin

- **Small**: `mb-2` / `mb-3`
- **Medium**: `mb-4` / `mb-6`
- **Large**: `mb-8`

### Gap

- **Grid/Flex**: `gap-2`, `gap-3`, `gap-4`, `gap-6`

## 🔤 Typography

### Font Sizes

- **Hero**: `text-6xl` (60px)
- **H1**: `text-5xl` (48px)
- **H2**: `text-3xl` (30px)
- **H3**: `text-2xl` (24px)
- **H4**: `text-xl` (20px)
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **Tiny**: `text-xs` (12px)

### Font Weights

- **Bold**: `font-bold` (700)
- **Semibold**: `font-semibold` (600)
- **Medium**: `font-medium` (500)
- **Regular**: `font-normal` (400)

## 🎯 Border Radius

### Sizes

- **Small**: `rounded-lg` (8px)
- **Medium**: `rounded-xl` (12px)
- **Large**: `rounded-2xl` (16px)
- **Full**: `rounded-full` (9999px)

## 🌟 Shadows

### Elevation

- **Small**: `shadow-md`
- **Medium**: `shadow-lg`
- **Large**: `shadow-xl`
- **XL**: `shadow-2xl`

### Hover States

- **Button**: `hover:shadow-lg`
- **Card**: `hover:shadow-2xl`

## ✨ Animations (Tailwind CSS 4)

### Custom Utilities

All animations are defined as Tailwind utilities:

```css
@utility slide-in {
  animation: slide-in 0.3s ease-out;
}

@utility fade-in {
  animation: fade-in 0.2s ease-out;
}

@utility scale-in {
  animation: scale-in 0.3s ease-out;
}
```

### Usage

```jsx
<div className="slide-in">Toast notification</div>
<div className="fade-in">Modal backdrop</div>
<div className="scale-in">Modal content</div>
```

## 🎬 Transitions

### Transform

- **Scale on hover**: `hover:scale-105` / `hover:scale-110`
- **Translate on hover**: `hover:-translate-y-2`
- **Disabled**: `disabled:transform-none`

### Transition Classes

- **All**: `transition-all duration-200`
- **Colors**: `transition-colors`
- **Transform**: `transition-transform duration-500`

## 🔘 Button Variants

### Primary (Default)

```jsx
className="bg-gradient-to-r from-blue-600 to-purple-600 text-white
           px-6 py-3 rounded-lg font-semibold shadow-md
           hover:from-blue-700 hover:to-purple-700 hover:shadow-lg
           transform hover:scale-105 transition-all"
```

### Secondary

```jsx
className="bg-gradient-to-r from-gray-600 to-gray-700 text-white
           px-6 py-3 rounded-lg font-semibold shadow-md
           hover:from-gray-700 hover:to-gray-800"
```

### Outline

```jsx
className="border-2 border-blue-600 text-blue-600
           px-6 py-3 rounded-lg font-semibold
           hover:bg-blue-50 transition-all"
```

### Danger

```jsx
className="bg-gradient-to-r from-red-600 to-red-700 text-white
           px-6 py-3 rounded-lg font-semibold shadow-md
           hover:from-red-700 hover:to-red-800"
```

## 📝 Input Fields

```jsx
className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg
           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
           transition-all outline-none bg-white hover:border-gray-400"
```

## 🃏 Cards

### Recipe Card

```jsx
className="bg-white rounded-xl shadow-lg overflow-hidden
           hover:shadow-2xl transition-all duration-300
           transform hover:-translate-y-2 group"
```

### Info Card

```jsx
className = "bg-white p-8 rounded-2xl shadow-xl border border-gray-100";
```

## 🎭 Badge/Tag Styles

### Cuisine Badge

```jsx
className="text-xs bg-gradient-to-r from-blue-500 to-blue-600
           text-white px-3 py-1.5 rounded-full font-medium shadow-sm"
```

### Difficulty Badge

```jsx
className="text-xs bg-gradient-to-r from-green-500 to-green-600
           text-white px-3 py-1.5 rounded-full font-medium shadow-sm"
```

## 🖼️ Image Effects

### Hover Zoom

```jsx
<div className="overflow-hidden">
  <img className="group-hover:scale-110 transition-transform duration-500" />
</div>
```

## 📱 Responsive Design

### Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### Grid Layouts

```jsx
className =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
```

## 🎨 Gradient Text

```jsx
className="bg-gradient-to-r from-blue-600 to-purple-600
           bg-clip-text text-transparent"
```

## 🔄 Loading States

### Spinner

```jsx
<div
  className="inline-block animate-spin rounded-full h-12 w-12 
                border-b-2 border-blue-600"
></div>
```

## ✅ Form Validation

### Error State

```jsx
className="bg-red-50 border-l-4 border-red-500 text-red-800
           px-4 py-3 rounded-lg"
```

### Success State

```jsx
className="bg-green-50 border-l-4 border-green-500 text-green-800
           px-4 py-3 rounded-lg"
```

### Info State

```jsx
className="bg-blue-50 border-l-4 border-blue-500 text-blue-800
           px-4 py-3 rounded-lg"
```

## 🎯 Z-Index Layers

- **Navbar**: `z-50`
- **Toast**: `z-50`
- **Modal**: `z-50`
- **Hero Content**: `z-10`

## 📏 Container Widths

```jsx
className = "container mx-auto px-4"; // Responsive container
className = "max-w-md"; // 448px
className = "max-w-2xl"; // 672px
className = "max-w-4xl"; // 896px
```

## 🎪 Modal/Overlay

### Backdrop

```jsx
className = "fixed inset-0 bg-black bg-opacity-50 fade-in";
```

### Modal Content

```jsx
className = "bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 scale-in";
```

## 🔗 Navigation Links

### With Underline Effect

```jsx
className="text-gray-700 hover:text-blue-600 font-medium
           transition-colors relative group"
<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600
                 transition-all group-hover:w-full"></span>
```

## 📊 Pagination

### Active Page

```jsx
className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600
           text-white scale-110 shadow-lg font-semibold"
```

### Inactive Page

```jsx
className="px-4 py-3 rounded-xl bg-gray-200 text-gray-700
           hover:bg-gray-300 hover:scale-105 font-semibold shadow-md"
```

## 🎨 Best Practices

1. **Always use Tailwind utilities** instead of custom CSS
2. **Use @utility** for custom animations in Tailwind CSS 4
3. **Consistent spacing**: Use the 4px grid (spacing scale)
4. **Gradient consistency**: Always use the same blue-purple gradient
5. **Shadow hierarchy**: md → lg → xl → 2xl for elevation
6. **Hover states**: Add transform scale-105 for interactive elements
7. **Transitions**: Use transition-all for smooth animations
8. **Focus states**: Always include focus:ring and focus:border
9. **Responsive design**: Mobile-first approach
10. **Accessibility**: Use semantic HTML with Tailwind classes

## 🚀 Performance Tips

- Tailwind purges unused CSS in production
- Custom animations are lightweight
- Use transform for GPU-accelerated animations
- Limit animation duration to under 500ms for snappy feel

---

**All styles in this project are 100% Tailwind CSS!** ✨
