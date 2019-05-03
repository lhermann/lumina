import get from "lodash/get";

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
  passphrase: state => id => get(state.passphrases, id)
};

/*
 * actions
 ************************************/

export const actions = {
  addPassphrase({ dispatch, commit }, payload) {
    commit("addPassphrase", payload);
    dispatch("persist");
  },
  async persist() {
    if (process.browser) {
      const json = JSON.stringify(state.passphrases);
      // console.log({ json });
      await this.$persist.set("passphrases", json);
    }
  },
  async recover({ commit }) {
    if (process.browser) {
      const passphrases = JSON.parse(
        await this.$persist.get("passphrases", {})
      );
      // console.log("recover");
      // console.log({ passphrases });
      commit("setPassphrases", passphrases);
    }
  }
};

/*
 * mutations
 ************************************/

export const mutations = {
  setPassphrases: (state, passphrases) => (state.passphrases = passphrases),
  addPassphrase: (state, payload) =>
    (state.passphrases[payload.id] = payload.passphrase)
};
