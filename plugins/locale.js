export default (context, inject) => {
  const locale = process.env.NUXT_ENV_LOCALE || "en-US";
  inject("locale", locale);
};
