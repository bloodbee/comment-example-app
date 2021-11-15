import { shallowMount } from '@vue/test-utils';
import CommentComponent from '@/Commentary/components/Comment.vue';
import store from '@/Shared/store';
import router from '@/Shared/router';

describe('Comment Component', () => {

  const wrapper = shallowMount(CommentComponent, {
    props: {
      comment: { _id: 'Comment1', text: 'Lorem ipsum', orderId: 'Order1', georeferenceId: null}
    },
    global: {
      plugins: [router, store]
    }
  });

  it('renders comment correctly', () => {
    expect(wrapper.find('.comment').exists()).toBeTruthy();
  });

  it('check initial datas', () => {
    expect(wrapper.vm.isOpen).toBeFalsy()
    expect(wrapper.vm.comment).toHaveProperty('_id', 'Comment1')
    expect(wrapper.vm.comment).toHaveProperty('text', 'Lorem ipsum')
    expect(wrapper.vm.comment).toHaveProperty('orderId', 'Order1')
    expect(wrapper.vm.comment).toHaveProperty('georeferenceId', null)
    expect(wrapper.vm.user).toBeNull()
    expect(wrapper.vm.getSubcomments).toHaveLength(0)
  });
  
  it('check switch modal method', () => {
    wrapper.vm.switchModal()
    expect(wrapper.vm.isOpen).toBeTruthy();
  })
});
