import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

import axios from "axios"

export const mutations = {
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
};

export const actions = {
  loadUsers({ commit, state }) {
    // save the comments currently in store
    const oldUsers = [...state.users]

    // make api call to get all users and store it
    axios.get('http://localhost:3000/users/', {
      headers: { 'Access-Control-Allow-Origin': '*' }
    }).then(function (response) {
      const data = response.data
      
      if (data) {
        if('err' in data) { // internal error
          commit('setUsers', oldUsers);
        } else {
          // add users to our store
          commit('setUsers', response.data.users);
        }
      }
    }).catch(function(err) {
      console.log('err', err)
    })
  },
  deleteUser({ state }, payload) {
    const { id } = payload
    
    // make api call to delete the channel specified by id
    axios.delete(`http://localhost:3000/users/${id}`, {
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

    // make api call to get all comments and store it
    axios.get('http://localhost:3000/comments/', {
      headers: { 'Access-Control-Allow-Origin': '*' }
    }).then(function (response) {
      const data = response.data
      
      if (data) {
        if ('err' in data) { // internal error
          commit('setComments', oldComments);
        } else {
          // add comments to our store
          commit('setComments', response.data.comments);
        }
      }
    }).catch(function(err) {
      console.log('err', err)
    })
  },
  deleteChannel({ dispatch }, payload) {
    const { id } = payload
    
    // make api call to delete the channel specified by id
    axios.delete(`http://localhost:3000/comments/${id}`, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    }).then(function (response) {
      // reload comments data
      dispatch('loadComments')

    }).catch(function(err) {
      console.log('err', err)
    })
  }
};

export default createStore({
  state: {
    user: null,
    users: [],
    comments: []
  },
  mutations,
  actions,
  plugins: [createPersistedState()],
});
