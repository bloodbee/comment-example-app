import { mount } from '@vue/test-utils';
import { createRouterMock, injectRouterMock } from 'vue-router-mock';
import ChannelDetailView from '@/Admin/views/Channel.vue';
import store from '@/Shared/store';

describe('Admin Channel View', () => {
  // create one mock instance, pass options
  const router = createRouterMock();

  beforeAll(async () => {
    // set our initials comments
    store.commit('setComments', [
      {
        _id: '1',
        text: 'Lorem ipsum',
        userId: '12345',
        orderId: null,
        georeferenceId: null,
        createdAt: '2021-11-14T17:11:54.647+00:00',
      },
      {
        _id: '2',
        text: 'Lorem ipsum 2',
        userId: '12345',
        orderId: null,
        georeferenceId: '1',
        createdAt: '2021-11-14T17:22:54.647+00:00',
      },
      {
        _id: '3',
        text: 'Lorem ipsum 3',
        userId: '12345',
        orderId: null,
        georeferenceId: '1',
        createdAt: '2021-11-14T17:22:54.647+00:00',
      },
    ]);
  });

  beforeEach(() => {
    // inject it globally to ensure `useRoute()`, `$route`, etc work
    // properly and give you access to test specific functions
    injectRouterMock(router);
  });

  it('renders channel correctly', async () => {
    // mount the component
    const wrapper = mount(ChannelDetailView, {
      global: {
        plugins: [store],
        mocks: {
          // No need for the mocks
        },
      },
      shallow: true,
    });

    // go to the channel specified by id in admin
    await wrapper.vm.$router.push('/admin/channel/1');
    // check it's correclty rendered
    expect(wrapper.find('#admin-channel').exists()).toBeTruthy();
  });

  it('the subcomments are correctly fetched and displayed', async () => {
    // mount the component
    const wrapper = mount(ChannelDetailView, {
      global: {
        plugins: [store],
        mocks: {
          // No need for the mocks
        },
      },
      shallow: true,
    });

    // go to the channel specified by id in admin
    await wrapper.vm.$router.push('/admin/channel/1');
    // check it's correclty rendered
    expect(wrapper.find('#comment-subcomments').exists()).toBeTruthy();
  });
});
