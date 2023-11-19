const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "Resources/Private/Layouts/**/*.html",
    "Resources/Private/Partials/**/*.html",
    "Resources/Private/Templates/**/*.html",
    "Resources/Public/JavaScript/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        red: '#ff0000',
      },
      fontFamily: {
        'inter': ['Inter']
      }
    }
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.container': {
          marginLeft: 'var(--max-x)',
          marginRight: 'var(--max-x)',
          '.container': {
            marginLeft: '0',
            marginRight: '0',
          },
          '.container-xl': {
            marginLeft: '0',
            marginRight: '0',
          }
        },
        '.container-xl': {
          marginLeft: 'var(--max-x-xl)',
          marginRight: 'var(--max-x-xl)',
          '.container': {
            marginLeft: '0',
            marginRight: '0',
          },
          '.container-xl': {
            marginLeft: '0',
            marginRight: '0',
          }
        }
      })
    })
  ],
  corePlugins: {
    container: false
  },
  safelist: [
    "container",
    "container-xl",
    "text-left",
    "text-center",
    "text-right",
    "text-justify",
    "ml-0",
    "mr-0",
    "mt-0.5",
    "mt-1",
    "mt-1.5",
    "mt-2",
    "mt-2.5",
    "mt-3",
    "mt-3.5",
    "mt-4",
    "mt-5",
    "mt-6",
    "mt-7",
    "mt-8",
    "mt-9",
    "mt-10",
    "mt-11",
    "mt-12",
    "mt-14",
    "mt-16",
    "mt-20",
    "mt-24",
    "mt-28",
    "mt-32",
    "mt-36",
    "mt-40",
    "mt-44",
    "mt-48",
    "mt-52",
    "mt-56",
    "mt-60",
    "mt-64",
    "mt-72",
    "mt-80",
    "mt-96",
    "mb-0.5",
    "mb-1",
    "mb-1.5",
    "mb-2",
    "mb-2.5",
    "mb-3",
    "mb-3.5",
    "mb-4",
    "mb-5",
    "mb-6",
    "mb-7",
    "mb-8",
    "mb-9",
    "mb-10",
    "mb-11",
    "mb-12",
    "mb-14",
    "mb-16",
    "mb-20",
    "mb-24",
    "mb-28",
    "mb-32",
    "mb-36",
    "mb-40",
    "mb-44",
    "mb-48",
    "mb-52",
    "mb-56",
    "mb-60",
    "mb-64",
    "mb-72",
    "mb-80",
    "mb-96",
    "pt-0.5",
    "pt-1",
    "pt-1.5",
    "pt-2",
    "pt-2.5",
    "pt-3",
    "pt-3.5",
    "pt-4",
    "pt-5",
    "pt-6",
    "pt-7",
    "pt-8",
    "pt-9",
    "pt-10",
    "pt-11",
    "pt-12",
    "pt-14",
    "pt-16",
    "pt-20",
    "pt-24",
    "pt-28",
    "pt-32",
    "pt-36",
    "pt-40",
    "pt-44",
    "pt-48",
    "pt-52",
    "pt-56",
    "pt-60",
    "pt-64",
    "pt-72",
    "pt-80",
    "pt-96",
    "pb-0.5",
    "pb-1",
    "pb-1.5",
    "pb-2",
    "pb-2.5",
    "pb-3",
    "pb-3.5",
    "pb-4",
    "pb-5",
    "pb-6",
    "pb-7",
    "pb-8",
    "pb-9",
    "pb-10",
    "pb-11",
    "pb-12",
    "pb-14",
    "pb-16",
    "pb-20",
    "pb-24",
    "pb-28",
    "pb-32",
    "pb-36",
    "pb-40",
    "pb-44",
    "pb-48",
    "pb-52",
    "pb-56",
    "pb-60",
    "pb-64",
    "pb-72",
    "pb-80",
    "pb-96",
    "sm:mt-0.5",
    "sm:mt-1",
    "sm:mt-1.5",
    "sm:mt-2",
    "sm:mt-2.5",
    "sm:mt-3",
    "sm:mt-3.5",
    "sm:mt-4",
    "sm:mt-5",
    "sm:mt-6",
    "sm:mt-7",
    "sm:mt-8",
    "sm:mt-9",
    "sm:mt-10",
    "sm:mt-11",
    "sm:mt-12",
    "sm:mt-14",
    "sm:mt-16",
    "sm:mt-20",
    "sm:mt-24",
    "sm:mt-28",
    "sm:mt-32",
    "sm:mt-36",
    "sm:mt-40",
    "sm:mt-44",
    "sm:mt-48",
    "sm:mt-52",
    "sm:mt-56",
    "sm:mt-60",
    "sm:mt-64",
    "sm:mt-72",
    "sm:mt-80",
    "sm:mt-96",
    "sm:mb-0.5",
    "sm:mb-1",
    "sm:mb-1.5",
    "sm:mb-2",
    "sm:mb-2.5",
    "sm:mb-3",
    "sm:mb-3.5",
    "sm:mb-4",
    "sm:mb-5",
    "sm:mb-6",
    "sm:mb-7",
    "sm:mb-8",
    "sm:mb-9",
    "sm:mb-10",
    "sm:mb-11",
    "sm:mb-12",
    "sm:mb-14",
    "sm:mb-16",
    "sm:mb-20",
    "sm:mb-24",
    "sm:mb-28",
    "sm:mb-32",
    "sm:mb-36",
    "sm:mb-40",
    "sm:mb-44",
    "sm:mb-48",
    "sm:mb-52",
    "sm:mb-56",
    "sm:mb-60",
    "sm:mb-64",
    "sm:mb-72",
    "sm:mb-80",
    "sm:mb-96",
    "sm:pt-0.5",
    "sm:pt-1",
    "sm:pt-1.5",
    "sm:pt-2",
    "sm:pt-2.5",
    "sm:pt-3",
    "sm:pt-3.5",
    "sm:pt-4",
    "sm:pt-5",
    "sm:pt-6",
    "sm:pt-7",
    "sm:pt-8",
    "sm:pt-9",
    "sm:pt-10",
    "sm:pt-11",
    "sm:pt-12",
    "sm:pt-14",
    "sm:pt-16",
    "sm:pt-20",
    "sm:pt-24",
    "sm:pt-28",
    "sm:pt-32",
    "sm:pt-36",
    "sm:pt-40",
    "sm:pt-44",
    "sm:pt-48",
    "sm:pt-52",
    "sm:pt-56",
    "sm:pt-60",
    "sm:pt-64",
    "sm:pt-72",
    "sm:pt-80",
    "sm:pt-96",
    "sm:pb-0.5",
    "sm:pb-1",
    "sm:pb-1.5",
    "sm:pb-2",
    "sm:pb-2.5",
    "sm:pb-3",
    "sm:pb-3.5",
    "sm:pb-4",
    "sm:pb-5",
    "sm:pb-6",
    "sm:pb-7",
    "sm:pb-8",
    "sm:pb-9",
    "sm:pb-10",
    "sm:pb-11",
    "sm:pb-12",
    "sm:pb-14",
    "sm:pb-16",
    "sm:pb-20",
    "sm:pb-24",
    "sm:pb-28",
    "sm:pb-32",
    "sm:pb-36",
    "sm:pb-40",
    "sm:pb-44",
    "sm:pb-48",
    "sm:pb-52",
    "sm:pb-56",
    "sm:pb-60",
    "sm:pb-64",
    "sm:pb-72",
    "sm:pb-80",
    "sm:pb-96",
    "md:mt-0.5",
    "md:mt-1",
    "md:mt-1.5",
    "md:mt-2",
    "md:mt-2.5",
    "md:mt-3",
    "md:mt-3.5",
    "md:mt-4",
    "md:mt-5",
    "md:mt-6",
    "md:mt-7",
    "md:mt-8",
    "md:mt-9",
    "md:mt-10",
    "md:mt-11",
    "md:mt-12",
    "md:mt-14",
    "md:mt-16",
    "md:mt-20",
    "md:mt-24",
    "md:mt-28",
    "md:mt-32",
    "md:mt-36",
    "md:mt-40",
    "md:mt-44",
    "md:mt-48",
    "md:mt-52",
    "md:mt-56",
    "md:mt-60",
    "md:mt-64",
    "md:mt-72",
    "md:mt-80",
    "md:mt-96",
    "md:mb-0.5",
    "md:mb-1",
    "md:mb-1.5",
    "md:mb-2",
    "md:mb-2.5",
    "md:mb-3",
    "md:mb-3.5",
    "md:mb-4",
    "md:mb-5",
    "md:mb-6",
    "md:mb-7",
    "md:mb-8",
    "md:mb-9",
    "md:mb-10",
    "md:mb-11",
    "md:mb-12",
    "md:mb-14",
    "md:mb-16",
    "md:mb-20",
    "md:mb-24",
    "md:mb-28",
    "md:mb-32",
    "md:mb-36",
    "md:mb-40",
    "md:mb-44",
    "md:mb-48",
    "md:mb-52",
    "md:mb-56",
    "md:mb-60",
    "md:mb-64",
    "md:mb-72",
    "md:mb-80",
    "md:mb-96",
    "md:pt-0.5",
    "md:pt-1",
    "md:pt-1.5",
    "md:pt-2",
    "md:pt-2.5",
    "md:pt-3",
    "md:pt-3.5",
    "md:pt-4",
    "md:pt-5",
    "md:pt-6",
    "md:pt-7",
    "md:pt-8",
    "md:pt-9",
    "md:pt-10",
    "md:pt-11",
    "md:pt-12",
    "md:pt-14",
    "md:pt-16",
    "md:pt-20",
    "md:pt-24",
    "md:pt-28",
    "md:pt-32",
    "md:pt-36",
    "md:pt-40",
    "md:pt-44",
    "md:pt-48",
    "md:pt-52",
    "md:pt-56",
    "md:pt-60",
    "md:pt-64",
    "md:pt-72",
    "md:pt-80",
    "md:pt-96",
    "md:pb-0.5",
    "md:pb-1",
    "md:pb-1.5",
    "md:pb-2",
    "md:pb-2.5",
    "md:pb-3",
    "md:pb-3.5",
    "md:pb-4",
    "md:pb-5",
    "md:pb-6",
    "md:pb-7",
    "md:pb-8",
    "md:pb-9",
    "md:pb-10",
    "md:pb-11",
    "md:pb-12",
    "md:pb-14",
    "md:pb-16",
    "md:pb-20",
    "md:pb-24",
    "md:pb-28",
    "md:pb-32",
    "md:pb-36",
    "md:pb-40",
    "md:pb-44",
    "md:pb-48",
    "md:pb-52",
    "md:pb-56",
    "md:pb-60",
    "md:pb-64",
    "md:pb-72",
    "md:pb-80",
    "md:pb-96",
    "lg:mt-0.5",
    "lg:mt-1",
    "lg:mt-1.5",
    "lg:mt-2",
    "lg:mt-2.5",
    "lg:mt-3",
    "lg:mt-3.5",
    "lg:mt-4",
    "lg:mt-5",
    "lg:mt-6",
    "lg:mt-7",
    "lg:mt-8",
    "lg:mt-9",
    "lg:mt-10",
    "lg:mt-11",
    "lg:mt-12",
    "lg:mt-14",
    "lg:mt-16",
    "lg:mt-20",
    "lg:mt-24",
    "lg:mt-28",
    "lg:mt-32",
    "lg:mt-36",
    "lg:mt-40",
    "lg:mt-44",
    "lg:mt-48",
    "lg:mt-52",
    "lg:mt-56",
    "lg:mt-60",
    "lg:mt-64",
    "lg:mt-72",
    "lg:mt-80",
    "lg:mt-96",
    "lg:mb-0.5",
    "lg:mb-1",
    "lg:mb-1.5",
    "lg:mb-2",
    "lg:mb-2.5",
    "lg:mb-3",
    "lg:mb-3.5",
    "lg:mb-4",
    "lg:mb-5",
    "lg:mb-6",
    "lg:mb-7",
    "lg:mb-8",
    "lg:mb-9",
    "lg:mb-10",
    "lg:mb-11",
    "lg:mb-12",
    "lg:mb-14",
    "lg:mb-16",
    "lg:mb-20",
    "lg:mb-24",
    "lg:mb-28",
    "lg:mb-32",
    "lg:mb-36",
    "lg:mb-40",
    "lg:mb-44",
    "lg:mb-48",
    "lg:mb-52",
    "lg:mb-56",
    "lg:mb-60",
    "lg:mb-64",
    "lg:mb-72",
    "lg:mb-80",
    "lg:mb-96",
    "lg:pt-0.5",
    "lg:pt-1",
    "lg:pt-1.5",
    "lg:pt-2",
    "lg:pt-2.5",
    "lg:pt-3",
    "lg:pt-3.5",
    "lg:pt-4",
    "lg:pt-5",
    "lg:pt-6",
    "lg:pt-7",
    "lg:pt-8",
    "lg:pt-9",
    "lg:pt-10",
    "lg:pt-11",
    "lg:pt-12",
    "lg:pt-14",
    "lg:pt-16",
    "lg:pt-20",
    "lg:pt-24",
    "lg:pt-28",
    "lg:pt-32",
    "lg:pt-36",
    "lg:pt-40",
    "lg:pt-44",
    "lg:pt-48",
    "lg:pt-52",
    "lg:pt-56",
    "lg:pt-60",
    "lg:pt-64",
    "lg:pt-72",
    "lg:pt-80",
    "lg:pt-96",
    "lg:pb-0.5",
    "lg:pb-1",
    "lg:pb-1.5",
    "lg:pb-2",
    "lg:pb-2.5",
    "lg:pb-3",
    "lg:pb-3.5",
    "lg:pb-4",
    "lg:pb-5",
    "lg:pb-6",
    "lg:pb-7",
    "lg:pb-8",
    "lg:pb-9",
    "lg:pb-10",
    "lg:pb-11",
    "lg:pb-12",
    "lg:pb-14",
    "lg:pb-16",
    "lg:pb-20",
    "lg:pb-24",
    "lg:pb-28",
    "lg:pb-32",
    "lg:pb-36",
    "lg:pb-40",
    "lg:pb-44",
    "lg:pb-48",
    "lg:pb-52",
    "lg:pb-56",
    "lg:pb-60",
    "lg:pb-64",
    "lg:pb-72",
    "lg:pb-80",
    "lg:pb-96",
    "xl:mt-0.5",
    "xl:mt-1",
    "xl:mt-1.5",
    "xl:mt-2",
    "xl:mt-2.5",
    "xl:mt-3",
    "xl:mt-3.5",
    "xl:mt-4",
    "xl:mt-5",
    "xl:mt-6",
    "xl:mt-7",
    "xl:mt-8",
    "xl:mt-9",
    "xl:mt-10",
    "xl:mt-11",
    "xl:mt-12",
    "xl:mt-14",
    "xl:mt-16",
    "xl:mt-20",
    "xl:mt-24",
    "xl:mt-28",
    "xl:mt-32",
    "xl:mt-36",
    "xl:mt-40",
    "xl:mt-44",
    "xl:mt-48",
    "xl:mt-52",
    "xl:mt-56",
    "xl:mt-60",
    "xl:mt-64",
    "xl:mt-72",
    "xl:mt-80",
    "xl:mt-96",
    "xl:mb-0.5",
    "xl:mb-1",
    "xl:mb-1.5",
    "xl:mb-2",
    "xl:mb-2.5",
    "xl:mb-3",
    "xl:mb-3.5",
    "xl:mb-4",
    "xl:mb-5",
    "xl:mb-6",
    "xl:mb-7",
    "xl:mb-8",
    "xl:mb-9",
    "xl:mb-10",
    "xl:mb-11",
    "xl:mb-12",
    "xl:mb-14",
    "xl:mb-16",
    "xl:mb-20",
    "xl:mb-24",
    "xl:mb-28",
    "xl:mb-32",
    "xl:mb-36",
    "xl:mb-40",
    "xl:mb-44",
    "xl:mb-48",
    "xl:mb-52",
    "xl:mb-56",
    "xl:mb-60",
    "xl:mb-64",
    "xl:mb-72",
    "xl:mb-80",
    "xl:mb-96",
    "xl:pt-0.5",
    "xl:pt-1",
    "xl:pt-1.5",
    "xl:pt-2",
    "xl:pt-2.5",
    "xl:pt-3",
    "xl:pt-3.5",
    "xl:pt-4",
    "xl:pt-5",
    "xl:pt-6",
    "xl:pt-7",
    "xl:pt-8",
    "xl:pt-9",
    "xl:pt-10",
    "xl:pt-11",
    "xl:pt-12",
    "xl:pt-14",
    "xl:pt-16",
    "xl:pt-20",
    "xl:pt-24",
    "xl:pt-28",
    "xl:pt-32",
    "xl:pt-36",
    "xl:pt-40",
    "xl:pt-44",
    "xl:pt-48",
    "xl:pt-52",
    "xl:pt-56",
    "xl:pt-60",
    "xl:pt-64",
    "xl:pt-72",
    "xl:pt-80",
    "xl:pt-96",
    "xl:pb-0.5",
    "xl:pb-1",
    "xl:pb-1.5",
    "xl:pb-2",
    "xl:pb-2.5",
    "xl:pb-3",
    "xl:pb-3.5",
    "xl:pb-4",
    "xl:pb-5",
    "xl:pb-6",
    "xl:pb-7",
    "xl:pb-8",
    "xl:pb-9",
    "xl:pb-10",
    "xl:pb-11",
    "xl:pb-12",
    "xl:pb-14",
    "xl:pb-16",
    "xl:pb-20",
    "xl:pb-24",
    "xl:pb-28",
    "xl:pb-32",
    "xl:pb-36",
    "xl:pb-40",
    "xl:pb-44",
    "xl:pb-48",
    "xl:pb-52",
    "xl:pb-56",
    "xl:pb-60",
    "xl:pb-64",
    "xl:pb-72",
    "xl:pb-80",
    "xl:pb-96",
    "2xl:mt-0.5",
    "2xl:mt-1",
    "2xl:mt-1.5",
    "2xl:mt-2",
    "2xl:mt-2.5",
    "2xl:mt-3",
    "2xl:mt-3.5",
    "2xl:mt-4",
    "2xl:mt-5",
    "2xl:mt-6",
    "2xl:mt-7",
    "2xl:mt-8",
    "2xl:mt-9",
    "2xl:mt-10",
    "2xl:mt-11",
    "2xl:mt-12",
    "2xl:mt-14",
    "2xl:mt-16",
    "2xl:mt-20",
    "2xl:mt-24",
    "2xl:mt-28",
    "2xl:mt-32",
    "2xl:mt-36",
    "2xl:mt-40",
    "2xl:mt-44",
    "2xl:mt-48",
    "2xl:mt-52",
    "2xl:mt-56",
    "2xl:mt-60",
    "2xl:mt-64",
    "2xl:mt-72",
    "2xl:mt-80",
    "2xl:mt-96",
    "2xl:mb-0.5",
    "2xl:mb-1",
    "2xl:mb-1.5",
    "2xl:mb-2",
    "2xl:mb-2.5",
    "2xl:mb-3",
    "2xl:mb-3.5",
    "2xl:mb-4",
    "2xl:mb-5",
    "2xl:mb-6",
    "2xl:mb-7",
    "2xl:mb-8",
    "2xl:mb-9",
    "2xl:mb-10",
    "2xl:mb-11",
    "2xl:mb-12",
    "2xl:mb-14",
    "2xl:mb-16",
    "2xl:mb-20",
    "2xl:mb-24",
    "2xl:mb-28",
    "2xl:mb-32",
    "2xl:mb-36",
    "2xl:mb-40",
    "2xl:mb-44",
    "2xl:mb-48",
    "2xl:mb-52",
    "2xl:mb-56",
    "2xl:mb-60",
    "2xl:mb-64",
    "2xl:mb-72",
    "2xl:mb-80",
    "2xl:mb-96",
    "2xl:pt-0.5",
    "2xl:pt-1",
    "2xl:pt-1.5",
    "2xl:pt-2",
    "2xl:pt-2.5",
    "2xl:pt-3",
    "2xl:pt-3.5",
    "2xl:pt-4",
    "2xl:pt-5",
    "2xl:pt-6",
    "2xl:pt-7",
    "2xl:pt-8",
    "2xl:pt-9",
    "2xl:pt-10",
    "2xl:pt-11",
    "2xl:pt-12",
    "2xl:pt-14",
    "2xl:pt-16",
    "2xl:pt-20",
    "2xl:pt-24",
    "2xl:pt-28",
    "2xl:pt-32",
    "2xl:pt-36",
    "2xl:pt-40",
    "2xl:pt-44",
    "2xl:pt-48",
    "2xl:pt-52",
    "2xl:pt-56",
    "2xl:pt-60",
    "2xl:pt-64",
    "2xl:pt-72",
    "2xl:pt-80",
    "2xl:pt-96",
    "2xl:pb-0.5",
    "2xl:pb-1",
    "2xl:pb-1.5",
    "2xl:pb-2",
    "2xl:pb-2.5",
    "2xl:pb-3",
    "2xl:pb-3.5",
    "2xl:pb-4",
    "2xl:pb-5",
    "2xl:pb-6",
    "2xl:pb-7",
    "2xl:pb-8",
    "2xl:pb-9",
    "2xl:pb-10",
    "2xl:pb-11",
    "2xl:pb-12",
    "2xl:pb-14",
    "2xl:pb-16",
    "2xl:pb-20",
    "2xl:pb-24",
    "2xl:pb-28",
    "2xl:pb-32",
    "2xl:pb-36",
    "2xl:pb-40",
    "2xl:pb-44",
    "2xl:pb-48",
    "2xl:pb-52",
    "2xl:pb-56",
    "2xl:pb-60",
    "2xl:pb-64",
    "2xl:pb-72",
    "2xl:pb-80",
    "2xl:pb-96"
  ]
}
