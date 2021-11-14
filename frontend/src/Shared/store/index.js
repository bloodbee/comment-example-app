import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

const axios = require('axios').default;

export default createStore({
  state: {
    user: null,
    users: [],
    comments: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setComments(state, comments) {
      state.comments = comments;
    },
    addComment(state, comment) {
      state.comments.push(comment);
    }
  },
  actions: {
    loadUsers({ commit, state }) {
      // save the comments currently in store
      const oldUsers = [...state.users]

      // make api call to get all comments and store it the store
      axios({
        method: 'get',
        url: 'http://localhost:3000/users/',
        headers: { 'Access-Control-Allow-Origin': '*' }
      }).then(function (response) {
        const data = response.data
        
        if ('err' in data) { // internal error
          commit('setUsers', oldUsers);
        } else {
          // add users to our store
          commit('setUsers', response.data.users);
        }
      }).catch(function(err) {
        console.log('err', err)
      })
    },
    deleteUser({ commit, state, dispatch}, payload) {
      const { id } = payload
      
      // make api call to delete the channel specified by id
      axios({
        method: 'delete',
        url: `http://localhost:3000/users/${id}`,
        headers: { 'Access-Control-Allow-Origin': '*' }
      }).then(function (response) {
        // remove the user from our state users list
        state.users = state.users.filter(el => el._id !== id)
      }).catch(function(err) {
        console.log('err', err)
      })
    },
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
    },
    deleteChannel({ commit, state, dispatch}, payload) {
      const { id } = payload
      
      // make api call to delete the channel specified by id
      axios({
        method: 'delete',
        url: `http://localhost:3000/comments/${id}`,
        headers: { 'Access-Control-Allow-Origin': '*' }
      }).then(function (response) {
        // reload comments data
        dispatch('loadComments')

      }).catch(function(err) {
        console.log('err', err)
      })
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],
});
