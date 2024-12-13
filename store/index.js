export const state = () => ({
  authToken: null,
});

export const mutations = {
  setAuthToken(state, token) {
    state.authToken = token;
  },
};

export const actions = {
  nuxtServerInit({ commit }) {
    const token = process.browser ? localStorage.getItem("authToken") : null;
    if (token) {
      commit("setAuthToken", token);
    }
  },
};
