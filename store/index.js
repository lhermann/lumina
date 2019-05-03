import get from "lodash/get";

/*
 * initial state
 ************************************/

export const state = () => ({
  website: {}
});

/*
 * getters
 ************************************/

export const getters = {
  title: state => get(state, "website.title", "")
};

/*
 * actions
 ************************************/

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    const response = await app.$contentful.getEntries({
      locale: "ms-MY",
      content_type: "website"
    });
    commit("setWebsite", get(response.items[0], "fields", {}));
  },
  initImmortalDB({ dispatch }) {
    // console.log("initImmortalDB");
    dispatch("auth/recover");
  }
};

/*
 * mutations
 ************************************/

export const mutations = {
  setWebsite: (state, website) => (state.website = website)
};
