import { shallowMount } from '@vue/test-utils';
import HomeView from '@/Commentary/views/Home.vue';
import store from '@/Shared/store';

describe('Commentary Home View', () => {
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

  it('renders home correctly', async () => {
    // mount the component
    const wrapper = shallowMount(HomeView, {
      global: {
        plugins: [store],
      },
      shallow: true,
    });

    expect(wrapper.vm.comments).toHaveLength(3);
  });
});
