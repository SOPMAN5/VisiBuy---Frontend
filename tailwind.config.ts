import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      dropShadow: {
        "3xl": "0 10px 30px rgba(0, 0, 0, 0.05)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        background: "hsl(var(--background))",
        // blue: "hsl(var(--background-blue))",
        foreground: "hsl(var(--foreground))",
        ring: "hsl(var(--ring))",

        nav: {
          foreground: {
            DEFAULT: "hsl(var(--nav-foreground))",
            active: "hsl(var(--nav-foreground-active))",
          },
        },
        blue: {
          DEFAULT: "hsl(var(--background-blue))",
          "200": "hsl(var(--background-blue-200))",
        },
        light: {
          background: "hsl(var(--light-background))",
          gray: {
            DEFAULT: "hsl(var(--light-gray))",
            "600": "hsl(var(--light-gray-600))",
          },
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          "150": "hsl(var(--primary-150))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        Montserrat: ["var(--font-Montserrat)"],
        OpenSans: ["var(--font-OpenSans)"],
      },
    },
  },
  plugins: [],
};
export default config;
