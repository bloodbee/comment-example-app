import { shallowMount } from '@vue/test-utils';
import AuthModalComponent from '@/Commentary/components/AuthModal.vue';
import store from '@/Shared/store';
import router from '@/Shared/router';

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

describe('AuthModal Component', () => {
  // shallow mount the component
  const wrapper = shallowMount(AuthModalComponent, {
    props: {
      modalStatus: false,
    },
    global: {
      plugins: [router, store],
    },
  });

  describe('Initialisation', () => {
    it("doesn't render auth modal", () => {
      expect(wrapper.find('#login').exists()).toBeFalsy();
      expect(wrapper.find('#register').exists()).toBeFalsy();
    });

    it('check initial datas', () => {
      expect(wrapper.vm.isOpen).toBeFalsy();
      expect(wrapper.vm.loginEmail).toBeNull();
      expect(wrapper.vm.loginPassword).toBeNull();
      expect(wrapper.vm.loginError).toBeNull();
      expect(wrapper.vm.loginSuccess).toBeNull();
      expect(wrapper.vm.registerPseudo).toBeNull();
      expect(wrapper.vm.registerEmail).toBeNull();
      expect(wrapper.vm.registerPassword).toBeNull();
      expect(wrapper.vm.registerConfirmPassword).toBeNull();
      expect(wrapper.vm.registerError).toBeNull();
      expect(wrapper.vm.registerSuccess).toBeNull();
    });
  });

  describe('Login', () => {
    it('login user with missing fields', async () => {
      wrapper.vm.loginEmail = null;
      wrapper.vm.loginPassword = null;

      await wrapper.vm.handleLogin();

      // check if it's a success
      expect(wrapper.vm.loginError).toBe('All fields are mandatory.');
    });

    it('login user with good values', async () => {
      wrapper.vm.loginEmail = 'johndoe@email.com';
      wrapper.vm.loginPassword = 'aaaaaa';

      await wrapper.vm.handleLogin();

      // check if it's a success
      expect(url).toBe('http://localhost:3000/users/login/');
    });
  });

  describe('Register', () => {
    it('register user with missing fields', async () => {
      wrapper.vm.registerEmail = null;
      wrapper.vm.registerPseudo = 'John Doe';
      wrapper.vm.registerPassword = null;
      wrapper.vm.registerConfirmPassword = 'bbbbbb';

      await wrapper.vm.handleRegister();

      // check if it's a success
      expect(wrapper.vm.registerError).toBe('All fields are mandatory.');
    });

    it('register user with password mismatch', async () => {
      wrapper.vm.registerEmail = 'johndoe@email.com';
      wrapper.vm.registerPseudo = 'John Doe';
      wrapper.vm.registerPassword = 'aaaaaa';
      wrapper.vm.registerConfirmPassword = 'bbbbbb';

      await wrapper.vm.handleRegister();

      // check if it's a success
      expect(wrapper.vm.registerError).toBe('Mismatch passwords.');
    });

    it('register user with good values', async () => {
      wrapper.vm.registerEmail = 'johndoe@email.com';
      wrapper.vm.registerPseudo = 'John Doe';
      wrapper.vm.registerPassword = 'aaaaaa';
      wrapper.vm.registerConfirmPassword = 'aaaaaa';

      await wrapper.vm.handleRegister();

      // check if it's a success
      expect(url).toBe('http://localhost:3000/users/');
    });
  });
});
