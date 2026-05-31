/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        accent: {
          500: "#16a34a",
          600: "#15803d",
        },
        ink: "#1f2937",
      },
      boxShadow: {
        soft: "0 12px 40px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top, rgba(249, 115, 22, 0.18), transparent 44%), linear-gradient(180deg, #fffaf5 0%, #ffffff 100%)",
      },
    },
  },
  plugins: [],
}

