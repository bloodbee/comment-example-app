import { shallowMount } from '@vue/test-utils';
import CommentaryLayout from '@/Commentary/layouts/Commentary.vue';
import store from '@/Shared/store';
import router from '@/Shared/router';

describe('Commentary Layout', () => {  
  it('renders commentary layout correctly', () => {
    // shallow mount the component
    const wrapper = shallowMount(CommentaryLayout, {
      global: {
        plugins: [router, store],
      },
    });
    expect(wrapper.find('#commentary-layout').exists()).toBeTruthy();
  });
});
