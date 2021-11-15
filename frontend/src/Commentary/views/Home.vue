<template>
  <div class="flex flex-1 flex-col px-4 sm:px-20 my-10" id="home">
    <CommentFormComponent v-if="user" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10" id="comments">
      <CommentComponent
        v-for="comment in comments"
        :key="comment._id"
        :comment="comment"
      ></CommentComponent>
    </div>
  </div>

</template>

<script>
import CommentComponent from '@/Commentary/components/Comment.vue';
import CommentFormComponent from '@/Commentary/components/CommentForm.vue';

import baseMixin from '@/Shared/mixins/base';

export default {
  name: 'HomeView',
  components: {
    CommentComponent,
    CommentFormComponent,
  },
  mixins: [baseMixin],
  async mounted() {
    // load all comments into the store
    await this.$store.dispatch('loadComments');
  },
  computed: {
    /**
     * Retrieve the top comments from the store
     */
    comments() {
      return this.$store.state.comments
        .filter((el) => el && !el.georeferenceId)
        .sort((a, b) => { // sort by createdAt DESC
          const aDate = new Date(a.createdAt);
          const bDate = new Date(b.createdAt);

          if (aDate > bDate) return -1;
          return 1;
        });
    },
  },
};
</script>

<style>
</style>
