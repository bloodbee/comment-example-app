import { shallowMount } from '@vue/test-utils';
import UsersView from '@/Admin/views/Users.vue';
import store from '@/Shared/store';
import router from '@/Shared/router';

describe('Admin Users View', () => {

  beforeAll(async () => {
    // set our initials users
    store.commit('setUsers', [
      {
        _id: "1",
        pseudonym: "John Doe",
        role: "user",
        email: "johndoe@email.com",
      },
      {
        _id: "2",
        pseudonym: "Evan Chris",
        role: "user",
        email: "evanchris@email.com",
      },
      {
        _id: "3",
        pseudonym: "Eva Lovelace",
        role: "admin",
        email: "evalovelace@email.com",
      },
    ])
  })

  // mount the component
  const wrapper = shallowMount(UsersView, {
    props: {
      admin: {
        _id: "3",
        pseudonym: "Eva Lovelace",
        role: "admin",
        email: "evalovelace@email.com",
      }
    },
    global: {
      plugins: [router, store]
    },
    shallow: true
  });

  it('renders users correctly', async () => {
    expect(wrapper.vm.users).toHaveLength(3)
  });

  it('check initial datas', () => {
    expect(wrapper.vm.isAddUserModalOpen).toBeFalsy();
    expect(wrapper.vm.isEditUserModalOpen).toBeFalsy();
    expect(wrapper.vm.userEditing).toBeNull();
    expect(wrapper.vm.admin).toHaveProperty('_id', '3')
  });

  it('check open userAddModal', () => {
    wrapper.vm.openAddUserModal();
    expect(wrapper.vm.isAddUserModalOpen).toBeTruthy();
  });

  it('check close userAddModal', () => {
    wrapper.vm.closeAddUserModal();
    expect(wrapper.vm.isAddUserModalOpen).toBeFalsy();
  });

  it('check open userEditModal', () => {
    wrapper.vm.openEditUserModal(wrapper.vm.users[0]);
    expect(wrapper.vm.isEditUserModalOpen).toBeTruthy();
    expect(wrapper.vm.userEditing).toHaveProperty('_id', '1')
  });

  it('check close userEditModal', () => {
    wrapper.vm.closeEditUserModal();
    expect(wrapper.vm.isEditUserModalOpen).toBeFalsy();
    expect(wrapper.vm.userEditing).toBeNull();
  });
});
