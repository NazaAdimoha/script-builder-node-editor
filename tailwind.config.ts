import type { Config } from "tailwindcss";
import fontFamily  from "tailwindcss/defaultTheme";

console.log("::::", fontFamily);

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        caantin: {
          50: "#f0f8ff",
          100: "#e0f0fe",
          200: "#bae3fd",
          300: "#7ccdfc",
          400: "#36b3f9",
          500: "#0c98ea",
          600: "#0179c8",
          700: "#0262a3",
          800: "#065286",
          900: "#0a4570",
          950: "#072b49",
        },
        "accent-orange": {
          50: "#fff8ed",
          100: "#ffefd3",
          200: "#ffdaa6",
          300: "#ffbe6e",
          400: "#fd9b34",
          500: "#fc7d13",
          600: "#ed5f09",
          700: "#c4440b",
          800: "#9c3611",
          900: "#7e2f12",
          950: "#441407",
        },
        "node-greeting": "#0c98ea",
        "node-question": "#fc7d13",
        "node-information": "#10b981",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        node: "0 4px 14px 0 rgba(0, 0, 0, 0.1)",
        "node-hover": "0 6px 20px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
