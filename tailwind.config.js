import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
        keyframes: {
            customAnimation: {
              '0%': {
                transform: 'rotate(10deg) scale(1)'
              },
              '50%': {
                transform: 'rotate(-20deg) scale(1.1)'
              },
              '100%': {
                transform: 'rotate(10deg) scale(1)'
              }
            },
            pulseCustomAnimation: {
              '0%': {
                transform: 'scale(1)'
              },
              '50%': {
                transform: 'scale(1.5)'
              },
              '100%': {
                transform: 'scale(1)'
              }
            },
            'loop-scroll': {
              from: { transform: 'translateX(0)' },
              to: { transform: 'translateX(-100%)' },
            },
            openCoverAnimation: {
              '0%': {
                transform: 'scale(10)'
              },
              '100%': {
                transform: 'scale(1)'
              }
            }
          },
          animation: {
            'rotateZoom': 'customAnimation 10s ease-in-out infinite',
            'pulseAnimation': 'pulseCustomAnimation 10s ease-in-out infinite',
            'openCover': 'openCoverAnimation 0.5s ease',
            'loop-scroll': 'loop-scroll 10s linear infinite',
          }
    },

    plugins: [forms],
};
