export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#1c1c1c',
        'highlight-light':'#2763ea',
        'highlight': '#a455f7',
        'font': '#ffffff',
        'border': '#343434',
        'card': '#232323',
        'footer': '#a0a0a0',
      },
      keyframes: {

        slidein: {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideinRev: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideout: {
          from: {
            opacity: "1",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "0",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slidein: "slidein 0.5s ease var(--slidein-delay, 0) forwards",
        'slidein-rev': "slideinRev 0.5s ease var(--slidein-delay, 0) forwards",
        slideout: "slideout 0.5s ease var(--slidein-delay, 0) forwards",
      }
    },
  },
  plugins: [],
}