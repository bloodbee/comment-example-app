import { shallowMount } from '@vue/test-utils';
import EditUserModalComponent from '@/Admin/components/EditUserModal.vue';
import store from '@/Shared/store';
import router from '@/Shared/router';

let url = ''
let body = {}

jest.mock("axios", () => ({
  put: (_url, _body) => { 
    return new Promise((resolve) => {
      url = _url
      body = _body
      resolve(true)
    })
  },
}))

describe('EditUserModal Component', () => {

  const wrapper = shallowMount(EditUserModalComponent, {
    props: {
      modalStatus: false,
      user: { _id: "1", pseudonym: "John Doe", email: "johndoe@email.com", role: "user"}
    },
    global: {
      plugins: [router, store]
    }
  });

  it("doesn't render edit user modal", () => {
    expect(wrapper.find('#edit').exists()).toBeFalsy();
  })

  it('check initial datas', () => {
    expect(wrapper.vm.isOpen).toBeFalsy();
    expect(wrapper.vm.userPseudo).toBe("John Doe");
    expect(wrapper.vm.userEmail).toBe("johndoe@email.com");
    expect(wrapper.vm.userNewPassword).toBeNull();
    expect(wrapper.vm.userConfirmPassword).toBeNull();
    expect(wrapper.vm.userRole).toBe("user");
    expect(wrapper.vm.editUserError).toBeNull();
    expect(wrapper.vm.editUserSuccess).toBeNull();
  });

  it('edit user with password mismatch', async() => {
    wrapper.vm.userEmail = 'johndoe@email.com';
    wrapper.vm.userPseudo = 'John Doe';
    wrapper.vm.userRole = 'user';
    wrapper.vm.userNewPassword = 'aaaaaa';
    wrapper.vm.userConfirmPassword = 'bbbbbb';

    await wrapper.vm.handleEditUser();

    // check if it's a success
    expect(wrapper.vm.editUserError).toBe("Mismatch passwords.");
  })

  it('edit user with good values', async() => {
    wrapper.vm.userEmail = 'johndoe@email.com';
    wrapper.vm.userPseudo = 'John Doe';
    wrapper.vm.userRole = 'admin';
    wrapper.vm.userNewPassword = 'aaaaaa';
    wrapper.vm.userConfirmPassword = 'aaaaaa';

    await wrapper.vm.handleEditUser();

    // check if it's a success
    expect(url).toBe("http://localhost:3000/users/1");
  })
  
});
