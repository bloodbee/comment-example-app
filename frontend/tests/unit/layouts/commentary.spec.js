import { shallowMount } from '@vue/test-utils';
import CommentaryLayout from '@/Commentary/layouts/Commentary.vue';
import store from '@/Shared/store';
import router from '@/Shared/router';

describe('Commentary Layout', () => {

  const wrapper = shallowMount(CommentaryLayout, {
    global: {
      plugins: [router, store]
    }
  });

  it('renders commentary layout correctly', () => {
    expect(wrapper.find('#commentary-layout').exists()).toBeTruthy();
  });
});
