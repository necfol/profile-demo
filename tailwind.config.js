/*
 * @LastEditors: Necfol
 * @Date: 2024-06-02 09:36:18
 * @LastEditTime: 2024-06-02 11:20:52
 * @FilePath: /blocklet-project/tailwind.config.js
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgb(227, 255, 231) 0%, rgb(217, 231, 255) 100%)',
      },
    },
  },
  plugins: [],
};
