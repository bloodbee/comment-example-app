/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import axios from 'axios';

export const mutations = {
  /**
   * @param {Object} state
   * @param {Object} user
   */
  setUser(state, user) {
    state.user = user;
  },
  /**
   * @param {Object} state
   * @param {Array} users
   */
  setUsers(state, users) {
    state.users = users;
  },
  /**
   * @param {Object} state
   * @param {Array} comments
   */
  setComments(state, comments) {
    state.comments = comments;
  },
  /**
   * @param {Object} state
   * @param {Object} comment
   */
  addComment(state, comment) {
    state.comments.push(comment);
  },
};

export const actions = {
  /**
   * Make an API call to get all the users stored in our database
   * @param {Object} param0 Commit and state from store to use
   */
  loadUsers({ commit, state }) {
    // save the comments currently in store
    const oldUsers = [...state.users];

    // make api call to get all users and store it
    axios.get('http://localhost:3000/users/', {
      headers: { 'Access-Control-Allow-Origin': '*' },
    }).then((response) => {
      const { data } = response;

      if (data) {
        if ('err' in data) { // internal error
          commit('setUsers', oldUsers);
        } else {
          // add users to our store
          commit('setUsers', response.data.users);
        }
      }
    }).catch((err) => {
      console.log('err', err);
    });
  },
  /**
   * Remove an user from database with an API call
   * @param {Object} param0 State to reuse
   * @param {Object} payload User id to delete
   */
  deleteUser({ state }, payload) {
    const { id } = payload;

    // make api call to delete the channel specified by id
    axios.delete(`http://localhost:3000/users/${id}`, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    }).then(() => {
      // remove the user from our state users list
      /* disable-no-underscore-dangle */
      state.users = state.users.filter((el) => el._id !== id);
    }).catch((err) => {
      console.log('err', err);
    });
  },
  /**
   * Make an API call to get all the comments stored in our database
   * @param {Object} param0 Commit and state from store to use
   */
  loadComments({ commit, state }) {
    // save the comments currently in store
    const oldComments = [...state.comments];

    // make api call to get all comments and store it
    axios.get('http://localhost:3000/comments/', {
      headers: { 'Access-Control-Allow-Origin': '*' },
    }).then((response) => {
      const { data } = response;

      if (data) {
        if ('err' in data) { // internal error
          commit('setComments', oldComments);
        } else {
          // add comments to our store
          commit('setComments', response.data.comments);
        }
      }
    }).catch((err) => {
      console.log('err', err);
    });
  },
  /**
   * Delete a comment and all subcomments georeferenced in database
   * @param {Object} param0 Dispatch action to use
   * @param {Object} payload Comment ID to delete
   */
  deleteChannel({ dispatch }, payload) {
    const { id } = payload;

    // make api call to delete the channel specified by id
    axios.delete(`http://localhost:3000/comments/${id}`, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    }).then(async () => {
      // reload comments data
      await dispatch('loadComments');
    }).catch((err) => {
      console.log('err', err);
    });
  },
};

export default createStore({
  // our initial state
  state: {
    user: null,
    users: [],
    comments: [],
  },
  mutations,
  actions,
  plugins: [createPersistedState()], // persist state
});
