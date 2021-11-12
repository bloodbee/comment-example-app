<template>
  <div class="flex flex-1 flex-col px-4 sm:px-20 my-10">
    <CommentFormComponent :position="0" v-if="user" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10" id="comments">
      <CommentComponent v-for="comment in comments" :key="comment._id" :comment="comment"></CommentComponent>
    </div>
  </div>

</template>

<script>
import CommentComponent from '@/components/Comment.vue'
import CommentFormComponent from '@/components/CommentForm.vue'

export default {
  name: 'HomeView',
  components: {
    CommentComponent,
    CommentFormComponent
  },
  mounted() {
    // load all comments into the store
    this.$store.dispatch('loadComments')
  },
  computed: {
    /**
     * Retrieve our comments from the store
     */
    comments() {
      return this.$store.state.comments.filter(el => el && !el.georeferenceId)
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
</style>
