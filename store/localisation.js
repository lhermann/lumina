import Vue from "vue";
import get from "lodash/get";

/*
 * initial state
 ************************************/

export const state = () => ({
  localisations: {}
});

/*
 * getters
 ************************************/

export const getters = {
  all: state => state.localisations,
  get: state => key => get(state.localisations, key)
};

/*
 * actions
 ************************************/

export const actions = {
  async serverInit({ commit }, { app }) {
    const localisations = await app.$contentful.getEntries({
      locale: app.$locale,
      content_type: "localisation"
    });
    // console.log(get(localisations.items[0], "fields", {}));
    commit("setLocaisation", get(localisations.items[0], "fields", {}));
  }
};

/*
 * mutations
 ************************************/

export const mutations = {
  setLocaisation: (state, payload) => {
    for (const prop in payload) {
      Vue.set(state.localisations, prop, payload[prop]);
    }
  }
};
