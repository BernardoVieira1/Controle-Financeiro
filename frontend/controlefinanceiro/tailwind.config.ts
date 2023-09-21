import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        "primary-gray": "#1E2022",
        "primary-gray-opacity": "rgba(30, 32, 34, 0.40);",
        "secondary-color": "#C9D6DE",
        "blue-color-100": "#F0F5F9",
        "blue-color-hover-100": "#E5EBEF",
        "green-color": "#14FF00",
        "red-color": "#FF0000",
      }
    },
  },
  plugins: [],
}
export default config
