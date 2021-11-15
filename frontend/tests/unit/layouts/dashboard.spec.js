import { shallowMount } from '@vue/test-utils';
import DashboardLayout from '@/Admin/layouts/Dashboard.vue';
import store from '@/Shared/store';
import router from '@/Shared/router';

describe('Dashboard Layout', () => {
  const wrapper = shallowMount(DashboardLayout, {
    global: {
      plugins: [router, store],
    },
  });

  it('renders dashboard layout correctly', () => {
    expect(wrapper.find('#dashboard-layout').exists()).toBeTruthy();
  });
});
