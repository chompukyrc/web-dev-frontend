/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],

    theme: {
        extend: {
            fontFamily: {
                Kanit: ['Kanit', 'sans-serif'],
            },
            animation: {
                fade: 'fadeOut 5s ease-in-out',
            },

            keyframes: (theme) => ({
                fadeOut: {
                    '0%': { backgroundColor: theme('colors.red.300') },
                    '100%': { backgroundColor: theme('colors.transparent') },
                },
            }),
            borderRadius: {
                primary: '5rem',
                secondary: '10rem',
            },
            width: {
                primary: '84.75rem',
            },
            height: {
                primary: '53.4375rem',
            },
            padding: {
                primary: '28rem',
            },
            right: {
                primary: '85%',
            },
            keyframes: {
                wave: {
                    '10%': { transform: 'rotate(10deg) translateY(0px)' },
                    '40%': { transform: 'rotate(-4deg) translateY(80px)' },
                    '60%': { transform: 'rotate(-4deg) translateY(80px)' },
                    '90%': { transform: 'rotate(10deg) translateY(0px)' },
                },
                wave2: {
                    '10%': { transform: 'rotate(10deg) translateY(0px)' },
                    '40%': { transform: 'rotate(-4deg) translateY(-80px)' },
                    '60%': { transform: 'rotate(-4deg) translateY(-80px)' },
                    '90%': { transform: 'rotate(10deg) translateY(0px)' },
                },
            },
            animation: {
                waving: 'wave 15s linear infinite',
                waving2: 'wave2 15s linear infinite',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}
