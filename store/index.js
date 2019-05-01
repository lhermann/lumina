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
  title: state => state.website.title
};

/*
 * actions
 ************************************/

export const actions = {
  async nuxtServerInit({ commit }) {
    const response = await this.$contentful.getEntries({
      locale: "ms-MY",
      content_type: "website"
    });
    commit("setWebsite", response.items[0].fields);
  }
};

/*
 * mutations
 ************************************/

export const mutations = {
  setWebsite: (state, website) => (state.website = website)
};
