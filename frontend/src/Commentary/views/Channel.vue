<template>
  <div class="flex flex-1 flex-col px-4 sm:px-20 my-10" id="channel">
    <div
      id="comment-author"
      class="w-full text-yellow-400 text-left text-lg sm:text-xl"
      v-if="comment"
    >
      Created at {{ new Date(comment.createdAt).toLocaleString() }} by <b>{{ comment.userId }}</b>
    </div>
    <div
      v-if="comment && comment.orderId"
      id="comment-order"
      class="w-full text-gray-500 text-left text-md sm:text-lg"
    >
      Order ID : <b>{{ comment.orderId }}</b>
    </div>
    <div
      v-if="comment"
      id="comment-text"
      class="mt-4 w-full bg-yellow-50 border-yellow-500
      shadow border p-4 rounded-lg text-left text-lg"
    >
      <p>{{ comment.text }}</p>
    </div>
    <div
      v-if="comment"
      class="border-t border-gray-500 grid grid-cols-1 gap-4 pt-4 mt-4"
      id="comment-form"
    >
      <CommentFormComponent :georeferenceId="comment._id" v-if="user" />
    </div>
    <div
      class="border-t border-gray-500 grid grid-cols-1
      md:grid-cols-2 gap-4 pt-4 mt-4"
      id="comment-subcomments"
    >
      <CommentComponent
        v-for="subcomment in subcomments"
        :key="subcomment._id"
        :comment="subcomment"
      ></CommentComponent>
    </div>
  </div>

</template>

<script>
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import CommentComponent from '@/Commentary/components/Comment.vue';
import CommentFormComponent from '@/Commentary/components/CommentForm.vue';

import baseMixin from '@/Shared/mixins/base';

export default {
  name: 'ChannelView',
  components: {
    CommentComponent,
    CommentFormComponent,
  },
  mixins: [baseMixin],
  computed: {
    /**
     * Retrieve our comment from the store
     */
    comment() {
      return this.$store.state.comments.find((el) => el._id === this.$route.params.id);
    },
    /**
     * Retrieve the subcomments and sort by descendant dates
     */
    subcomments() {
      return this.$store.state.comments
        .filter((el) => el && el.georeferenceId === this.comment._id)
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
p {
  white-space: pre-wrap;
}
</style>
