/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     fontFamily:{
      'josefin':'Josefin Sans'
     },
     colors:{
       'hitamPudar':'#111322',
       'hitamPekat':'#090a12',
       'ungu':'#3415af',
       'putihPekat':'#676771',
       'unguBg':'#997af1',
       'putihTerang':'#f3f3f4',
       'biru':'#3317e1',
       'unguHover':'#897cdb'
     }
    }
    
  },
  plugins: [],
}

