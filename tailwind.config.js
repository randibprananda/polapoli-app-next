module.exports = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      height: {
        '89vh': '89vh',
        '93vh': '93vh',
        '70vh': '70vh'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      },
      maxWidth: {
        1000: '1024px',
        1200: '1200px'
      },
      lineHeight: {
        12: '3.5rem'
      },
      fontSize: {
        '3xl': [
          '1.875rem',
          {
            lineHeight: '3.5rem'
          }
        ],
        '4xl': [
          '2.25rem',
          {
            lineHeight: '3.5rem'
          }
        ]
      },
      zIndex: {
        60: '60'
      }
    },
    colors: {
      primary: '#393885',
      rose: '#FB3B6F',
      logan: '#A8ACCC',
      viola: '#C995B8',
      success: '#5FC790',
      warning: '#FFA600',
      danger: '#FF5630',
      'danger-25': '#FF563040',
      dark: '#2E3A44',
      info: '#1CA7EC',
      'info-25': '#1CA7EC40',
      black: '#2E3A44',
      grey1: '#A0AABF',
      grey2: '#C0C6D4',
      grey3: '#E3E8F1',
      light: '#F9FBFC',
      white: '#FFF',
      transparent: 'transparent'
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
    // ...
  ]
};
