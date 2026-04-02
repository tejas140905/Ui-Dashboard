/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#f0f4ff",
          DEFAULT: "#3b82f6",
          dark: "#1d4ed8",
        },
        purple: {
          soft: "#f3e8ff",
          accent: "#a855f7",
        },
        teal: {
          soft: "#f0fdfa",
          accent: "#14b8a6",
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
