import type { Config } from 'tailwindcss'

export default {
  content: ['./src/design/Home.html', './index.html', './src/**/*.{vue, js, ts, jsx, tsx, html}'],
  theme: {
    extend: {
      colors: {
        w1: '#f8f8f9',
        hover: '#20242c',
        click: '#f8f9fa'
      },
      spacing: {
        '4/5screen': '80vh'
      }
    }
  },
  plugins: [require('daisyui'), require('@tailwindcss/forms')],

  daisyui: {
    themes: ['sunset', 'dim', 'cupcake']
  }
} satisfies Config
