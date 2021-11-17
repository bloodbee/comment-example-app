import { shallowMount, flushPromises } from '@vue/test-utils';
import CommentFormComponent from '@/Commentary/components/CommentForm.vue';
import store from '@/Shared/store';

let url = '';
let body = {}; // disable-no-unused-vars

// mock axios post method
jest.mock('axios', () => ({
  post: (_url, _body) => new Promise((resolve) => {
    url = _url;
    body = _body;
    resolve(true);
  }),
}));

describe('CommentForm Component', () => {
  // shallow mount the component
  const wrapper = shallowMount(CommentFormComponent, {
    props: {
      georeferenceId: '1',
    },
    global: {
      plugins: [store],
    },
  });

  describe('Initialisation', () => {
    it('renders comment correctly', () => {
      expect(wrapper.find('#comment-form').exists()).toBeTruthy();
    });

    it('check initial datas', () => {
      expect(wrapper.vm.comment).toBeNull();
      expect(wrapper.vm.commentError).toBeNull();
      expect(wrapper.vm.commentSuccess).toBeNull();
      expect(wrapper.vm.orderId).toBeNull();
      expect(wrapper.vm.georeferenceId).toBe('1');
    });
  });

  describe('Handle form submit', () => {
    it('check comment is mandatory on handleForm method', () => {
      wrapper.vm.handleCommentForm();
      expect(wrapper.vm.commentError).toBe('The comment is mandatory.');
    });

    it('check handleForm method with good value', async () => {
      // set datas for our new comment
      store.commit('setUser', { _id: '1' });
      wrapper.vm.comment = 'Lorem ipsum';

      wrapper.vm.handleCommentForm();

      // check if it's a success
      expect(url).toBe('http://localhost:3000/comments/');
    });
  });
});
