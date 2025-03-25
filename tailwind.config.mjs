/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        fair: ["Playfair Display", "serif"],
        mont: ["Montserrat", "sans-serif"],
        sans: ["Open Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        cardo: ["Cardo", "cardo"],
        jose: ["Josefin Sans", "jose"],
        edu: ["Edu QLD Beginner", "edu"],
        play: ["Playfair Display SC", "play"],
        write: ["Playwrite DE Grund", "write"],
        arsenal: ["Arsenal SC", "arsenal"],
        alata: ["Alata display", "alata"],
      },
      borderRadius: {
        "50px": "50px", // Custom borderRadius for the switch
      },
    },
  },
  plugins: [],
};
