import { shallowMount } from '@vue/test-utils';
import AddUserModalComponent from '@/Admin/components/AddUserModal.vue';
import store from '@/Shared/store';
import router from '@/Shared/router';

let url = ''
let body = {}

jest.mock("axios", () => ({
  post: (_url, _body) => { 
    return new Promise((resolve) => {
      url = _url
      body = _body
      resolve(true)
    })
  },
}))

describe('AddUserModal Component', () => {

  const wrapper = shallowMount(AddUserModalComponent, {
    props: {
      modalStatus: false
    },
    global: {
      plugins: [router, store]
    }
  });

  it("doesn't render add user modal", () => {
    expect(wrapper.find('#add').exists()).toBeFalsy();
  })

  it('check initial datas', () => {
    expect(wrapper.vm.isOpen).toBeFalsy();
    expect(wrapper.vm.userPseudo).toBeNull();
    expect(wrapper.vm.userEmail).toBeNull();
    expect(wrapper.vm.userPassword).toBeNull();
    expect(wrapper.vm.userConfirmPassword).toBeNull();
    expect(wrapper.vm.addUserError).toBeNull();
    expect(wrapper.vm.addUserSuccess).toBeNull();
  });

  it('add user with missing fields', async() => {
    wrapper.vm.userEmail = null;
    wrapper.vm.userPseudo = 'John Doe';
    wrapper.vm.userPassword = null;
    wrapper.vm.userConfirmPassword = 'bbbbbb';

    await wrapper.vm.handleAddUser();

    // check if it's a success
    expect(wrapper.vm.addUserError).toBe("All fields are mandatory.");
  })

  it('add user with password mismatch', async() => {
    wrapper.vm.userEmail = 'johndoe@email.com';
    wrapper.vm.userPseudo = 'John Doe';
    wrapper.vm.userPassword = 'aaaaaa';
    wrapper.vm.userConfirmPassword = 'bbbbbb';

    await wrapper.vm.handleAddUser();

    // check if it's a success
    expect(wrapper.vm.addUserError).toBe("Mismatch passwords.");
  })

  it('add user with good values', async() => {
    wrapper.vm.userEmail = 'johndoe@email.com';
    wrapper.vm.userPseudo = 'John Doe';
    wrapper.vm.userPassword = 'aaaaaa';
    wrapper.vm.userConfirmPassword = 'aaaaaa';

    await wrapper.vm.handleAddUser();

    // check if it's a success
    expect(url).toBe("http://localhost:3000/users/");
  })
  
});
