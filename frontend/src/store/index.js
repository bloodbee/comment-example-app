import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

const axios = require('axios').default;

export default createStore({
  state: {
    user: null,
    comments: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setComments(state, comments) {
      state.comments = comments;
    },
    addComment(state, comment) {
      state.comments.push(comment);
    }
  },
  actions: {
    loadComments({ commit, state }) {
      // save the comments currently in store
      const oldComments = [...state.comments]

      // make api call to get all comments and store it the store
      axios({
        method: 'get',
        url: 'http://localhost:3000/comments/',
        headers: { 'Access-Control-Allow-Origin': '*' }
      }).then(function (response) {
        const data = response.data
        
        if ('err' in data) { // internal error
          commit('setComments', oldComments);
        } else {
          // add comments to our store
          commit('setComments', response.data.comments);
        }
      }).catch(function(err) {
        console.log('err', err)
      })
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],
});
