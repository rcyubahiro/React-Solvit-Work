/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Brand */
        primary: "#2563EB",   // blue-600
        secondary: "#7C3AED", // purple-600

        /* UI */
        sidebar: "#FFFFFF",
        surface: "#F9FAFB",
        border: "#E5E7EB",

        /* Status */
        success: "#16A34A",
        warning: "#FACC15",
        danger: "#DC2626",
      },

      borderRadius: {
        xl: "14px",
      },

      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
