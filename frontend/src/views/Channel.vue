<template>
  <div class="flex flex-1 flex-col px-4 sm:px-20 my-10">
    <div id="comment-author" class="w-full text-yellow-400 text-left text-lg sm:text-xl">
      Created at {{ new Date(comment.createdAt).toLocaleString() }} by <b>{{ comment.userId }}</b>
    </div>
    <div v-if="comment.orderId" id="comment-order" class="w-full text-gray-500 text-left text-md sm:text-lg">
      Order ID : <b>{{ comment.orderId }}</b>
    </div>
    <div id="comment-text" class="mt-4 w-full bg-yellow-50 border-yellow-500 shadow border p-4 rounded-lg text-left text-lg">
      <p>{{ comment.text }}</p>
    </div>
    <div class="border-t border-gray-500 grid grid-cols-1 gap-4 pt-4 mt-4" id="comment-form">
      <CommentFormComponent :position="subcomments ? subcomments.length + 1 : 0" :georeferenceId="comment._id" v-if="user" />
    </div>
    <div class="border-t border-gray-500 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mt-4" id="comment-subcomments">
      <CommentComponent v-for="subcomment in subcomments" :key="subcomment._id" :comment="subcomment"></CommentComponent>
    </div>
  </div>

</template>

<script>
import CommentComponent from '@/components/Comment.vue'
import CommentFormComponent from '@/components/CommentForm.vue'

export default {
  name: 'ChannelView',
  components: {
    CommentComponent,
    CommentFormComponent
  },
  data() {
    return {
      author: null
    }
  },
  computed: {
    /**
     * Retrieve our comment from the store
     */
    comment() {
      return this.$store.state.comments.find(el => el._id === this.$route.params.id)
    },
    /**
     * Retrieve the subcomments and sort by descendant dates
     */
    subcomments() {
      return this.$store.state.comments
      .filter(el => el && el.georeferenceId === this.comment._id)
      .sort((a, b) => {
        const aDate = new Date(a.createdAt);
        const bDate = new Date(b.createdAt);

        if (aDate > bDate) return -1;
        else return 1;
      })
    },
    /**
     * Retrieve the user in our store (connected or not)
     */
    user() {
      return this.$store.state.user
    }
  }
};
</script>

<style>
p { 
  white-space: pre-wrap; 
}
</style>
