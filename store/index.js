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
  async nuxtServerInit({ commit }, { app }) {
    let website = app.$contentful.getEntries({
      locale: app.$locale,
      content_type: "website"
    });
    let pages = app.$contentful.getEntries({
      locale: app.$locale,
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
