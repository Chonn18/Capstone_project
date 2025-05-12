/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'roboto'],
        exo2: ['Exo+2', 'roboto'],
        nationpark: ['National+Park', 'roboto'],
        lilita: ['Lilita+One', 'roboto'],
      },
      height: {
        'screen-chat': '96vh',
      },
      colors: {
        headercolor: '#eb8619', //
        texthover: '#fed101',
        background: '#fffef2',
        xanhngoc: '#28b6ca'
      },
    },
  },
  plugins: [],
};
