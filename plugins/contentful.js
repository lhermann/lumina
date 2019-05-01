const contentful = require("contentful");

// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js
const config = {
  space: process.env.NUXT_ENV_SPACE_ID,
  accessToken: process.env.NUXT_ENV_ACCESS_TOKEN
};

export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  // app.contentful = contentful.createClient(config);
  inject("contentful", contentful.createClient(config));
};
