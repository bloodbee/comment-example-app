import { shallowMount } from '@vue/test-utils';
import ChannelsView from '@/Admin/views/Channels.vue';
import store from '@/Shared/store';
import router from '@/Shared/router';

describe('Admin Channels View', () => {
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
        georeferenceId: null,
        createdAt: '2021-11-14T17:22:54.647+00:00',
      },
      {
        _id: '3',
        text: 'Lorem ipsum 3',
        userId: '12345',
        orderId: null,
        georeferenceId: null,
        createdAt: '2021-11-14T17:22:54.647+00:00',
      },
    ]);
  });

  it('renders channels correctly', async () => {
    // mount the component
    const wrapper = shallowMount(ChannelsView, {
      global: {
        plugins: [router, store],
      },
      shallow: true,
    });

    expect(wrapper.vm.channels).toHaveLength(3);
  });
});
