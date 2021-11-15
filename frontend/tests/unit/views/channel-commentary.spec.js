import { shallowMount } from '@vue/test-utils';
import ChannelView from '@/Commentary/views/Channel.vue';
import store from '@/Shared/store';
import router from '@/Shared/router';

describe('Commentary Channel View', () => {

  beforeAll(async () => {
    // set our initials comments
    store.commit('setComments', [
      {
        _id: "1",
        text: "Lorem ipsum",
        userId: "12345",
        orderId: null,
        georeferenceId: null,
        createdAt: "2021-11-14T17:11:54.647+00:00"
      },
      {
        _id: "2",
        text: "Lorem ipsum 2",
        userId: "12345",
        orderId: null,
        georeferenceId: "1",
        createdAt: "2021-11-14T17:22:54.647+00:00"
      },
      {
        _id: "3",
        text: "Lorem ipsum 3",
        userId: "12345",
        orderId: null,
        georeferenceId: "1",
        createdAt: "2021-11-14T17:22:54.647+00:00"
      },
    ])

    // go to our channel
    router.push({ name: 'Channel', params: { id: 1 }})
    await router.isReady()
  })

  it('renders channel correctly', async () => {
    // mount the component
    const wrapper = shallowMount(ChannelView, {
      global: {
        plugins: [router, store]
      },
      shallow: true
    });

    expect(wrapper.vm.comment).toHaveProperty('_id', '1'); // the comment computed property shoudl return the good comment
    expect(wrapper.find('#channel').exists()).toBeTruthy();
    expect(wrapper.find('#comment-author').exists()).toBeTruthy();
    expect(wrapper.find('#comment-text').exists()).toBeTruthy();
    expect(wrapper.find('#comment-form').exists()).toBeTruthy();
  });

  it('the subcomments are correctly fetched and displayed', async () => {
    // mount the component
    const wrapper = shallowMount(ChannelView, {
      global: {
        plugins: [router, store]
      },
      shallow: true
    });

    expect(wrapper.vm.subcomments).toHaveLength(2)
    expect(wrapper.find('#comment-subcomments').exists()).toBeTruthy();
  })
});
