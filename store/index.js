import get from "lodash/get";

/*
 * initial state
 ************************************/

export const state = () => ({
  website: {},
  pages: []
});

/*
 * getters
 ************************************/

export const getters = {
  title: state => get(state, "website.title", ""),
  pages: state => state.pages
};

/*
 * actions
 ************************************/

export const actions = {
  async nuxtServerInit({ dispatch, commit }, context) {
    dispatch("localisation/serverInit", context);
    let website = context.app.$contentful.getEntries({
      locale: context.app.$locale,
      content_type: "website"
    });
    let pages = context.app.$contentful.getEntries({
      locale: context.app.$locale,
      content_type: "page"
    });
    [website, pages] = await Promise.all([website, pages]);
    commit("setWebsite", get(website.items[0], "fields", {}));
    commit("setPages", pages.items);
  },
  initImmortalDB({ dispatch }) {
    // console.log("initImmortalDB");
    dispatch("auth/recover");
    dispatch("progress/recover");
  }
};

/*
 * mutations
 ************************************/

export const mutations = {
  setWebsite: (state, website) => (state.website = website),
  setPages: (state, pages) => (state.pages = pages)
};
