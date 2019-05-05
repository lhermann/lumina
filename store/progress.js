// import get from "lodash/get";

/*
 * initial state
 ************************************/

export const state = () => ({
  visited: []
});

/*
 * getters
 ************************************/

export const getters = {
  visited: state => id => state.visited.indexOf(id) >= 0
};

/*
 * actions
 ************************************/

export const actions = {
  addId({ dispatch, commit }, id) {
    commit("addId", id);
    dispatch("persist");
  },
  async persist({ state }) {
    if (process.browser) {
      const json = JSON.stringify(state.visited);
      await this.$persist.set("visited", json);
    }
  },
  async recover({ commit }) {
    if (process.browser) {
      const raw = await this.$persist.get("visited", {});
      if (raw !== "undefined") {
        const visited = JSON.parse(raw);
        commit("setVisited", visited);
      }
    }
  }
};

/*
 * mutations
 ************************************/

export const mutations = {
  setVisited: (state, payload) => (state.visited = payload),
  addId: (state, id) => state.visited.push(id)
};
