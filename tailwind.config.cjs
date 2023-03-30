/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            borderRadius: {
                primary: '5rem',
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
    plugins: [],
}
