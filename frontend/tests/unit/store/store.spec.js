import { mutations, actions } from '@/Shared/store';

let url = '';
let body = {}; // disable-no-unused-vars

jest.mock('axios', () => ({
  get: (_url, _body) => new Promise((resolve) => {
    url = _url;
    body = _body;
    resolve(true);
  }),
  post: (_url, _body) => new Promise((resolve) => {
    url = _url;
    body = _body;
    resolve(true);
  }),
  put: (_url, _body) => new Promise((resolve) => {
    url = _url;
    body = _body;
    resolve(true);
  }),
  delete: (_url, _body) => new Promise((resolve) => {
    url = _url;
    body = _body;
    resolve(true);
  }),
}));

describe('Store', () => {
  const {
    setUser, setUsers, setComments, addComment,
  } = mutations;
  const {
    loadUsers, deleteUser, loadComments, deleteChannel,
  } = actions;

  it('setUser mutation', () => {
    // mock state
    const state = { user: null };
    // apply mutation
    setUser(state, 'John Doe');
    // assert result
    expect(state.user).toBe('John Doe');
  });

  it('setUsers mutation', () => {
    // mock state
    const state = { users: [] };
    // apply mutation
    setUsers(state, [{ name: 'John Doe' }, { name: 'Evan Cristie' }]);
    // assert result
    expect(state.users).toHaveLength(2);
  });

  it('setComments mutation', () => {
    // mock state
    const state = { comments: [] };
    // apply mutation
    setComments(state, [{ text: 'First comment' }, { text: 'Lorem ipsum' }]);
    // assert result
    expect(state.comments).toHaveLength(2);
  });

  it('addComment mutation', () => {
    // mock state
    const state = { comments: [{ text: 'First comment' }, { text: 'Lorem ipsum' }] };
    expect(state.comments).toHaveLength(2);
    // apply mutation
    addComment(state, { text: 'An other comment' });
    // assert result
    expect(state.comments).toHaveLength(3);
  });

  it('loadUsers action', async () => {
    // mock state
    const commit = jest.fn();
    const state = { users: [] };

    // do the store actions
    await loadUsers({ commit, state });

    // check if it's a success
    expect(url).toBe('http://localhost:3000/users/');
  });

  it('loadComments action', async () => {
    // mock state
    const commit = jest.fn();
    const state = { comments: [] };

    // do the store actions
    await loadComments({ commit, state });

    // check if it's a success
    expect(url).toBe('http://localhost:3000/comments/');
  });

  it('deleteUser action', async () => {
    // mock state
    const state = { users: [{ _id: '1', name: 'John Doe' }, { _id: '2', name: 'Evan Cristie' }] };

    // do the store actions
    await deleteUser({ state }, { id: '1' });

    // check if it's a success
    expect(url).toBe('http://localhost:3000/users/1');
  });

  it('deleteChannel action', async () => {
    // mock dispatch
    const dispatch = jest.fn();

    // do the store actions
    await deleteChannel({ dispatch }, { id: '1' });

    // check if it's a success
    expect(url).toBe('http://localhost:3000/comments/1');
  });
});
