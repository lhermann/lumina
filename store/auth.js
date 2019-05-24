import get from "lodash/get";
import Vue from "vue";

/*
 * initial state
 ************************************/

export const state = () => ({
  passphrases: {}
});

/*
 * getters
 ************************************/

export const getters = {
  passphrase: state => id => get(state.passphrases, id, null)
};

/*
 * actions
 ************************************/

export const actions = {
  addPassphrase({ dispatch, commit }, payload) {
    commit("addPassphrase", payload);
    dispatch("persist");
  },
  async persist({ state }) {
    if (process.browser) {
      const json = JSON.stringify(state.passphrases);
      await this.$persist.set("passphrases", json);
    }
  },
  async recover({ commit }) {
    if (process.browser) {
      const raw = await this.$persist.get("passphrases", {});
      if (raw !== "undefined") {
        const passphrases = JSON.parse(raw);
        commit("setPassphrases", passphrases);
      }
    }
  }
};

/*
 * mutations
 ************************************/

export const mutations = {
  setPassphrases: (state, passphrases) => (state.passphrases = passphrases),
  addPassphrase: (state, payload) =>
    Vue.set(state.passphrases, payload.id, payload.passphrase)
};
