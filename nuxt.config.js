import pkg from "./package";
import * as contentful from "contentful";

const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: ["./**/*.html", "./**/*.vue"],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

export default {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.NUXT_ENV_TITLE || pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description },
      { name: "msapplication-TileColor", content: "#17845e" },
      { name: "theme-color", content: "#ffffff" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#17845e" }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#81defd",
    height: "3px"
  },

  /*
   ** Global CSS
   */
  css: ["~/assets/css/tailwind.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/filters.js",
    "~/plugins/contentful.js",
    "~/plugins/immortal-db.js",
    "~/plugins/locale.js"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // "@bazzite/nuxt-netlify"
    // "@nuxtjs/axios"
  ],

  netlify: { mergeSecurityHeaders: true },

  /*
   ** Build configuration
   */
  build: {
    cache: true,
    postcss: {
      plugins: [
        require("tailwindcss")("tailwind.config.js"),
        require("autoprefixer"),
        ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
      ]
    }
    // extend(config, ctx) {}
  },

  generate: {
    fallback: true,
    interval: 100,
    routes: async function() {
      // Setup contentful
      const api = contentful.createClient({
        space: process.env.NUXT_ENV_SPACE_ID,
        accessToken: process.env.NUXT_ENV_ACCESS_TOKEN
      });

      // fetch lessons
      let lessons = api.getEntries({
        locale: process.env.NUXT_ENV_LOCALE || "en-US",
        content_type: "lesson"
      });

      // fetch pages
      let pages = api.getEntries({
        locale: process.env.NUXT_ENV_LOCALE || "en-US",
        content_type: "page"
      });

      // await both
      [lessons, pages] = await Promise.all([lessons, pages]);

      return [
        ...lessons.items.map(lesson => ({
          route: "/lessons/" + lesson.sys.id,
          payload: lesson
        })),
        ...pages.items.map(page => ({
          route: "/pages/" + page.sys.id,
          payload: page
        }))
      ];
    }
  }
};
