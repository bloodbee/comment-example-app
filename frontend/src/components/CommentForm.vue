<template>
  <div :class="['border border-gray-500 rounded-lg shadow overflow-hidden sm:rounded-md h-64', dense ? 'p-2' : 'p-4']">
    <label for="new-comment" :class="['block font-medium text-gray-700 text-left', dense ? 'text-lg mb-2' : 'text-xl mb-4']">New comment</label>
    <textarea v-model="comment" class="comment-textarea w-full bg-gray-100 border-none rounded-lg h-3/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400" wrap="soft" maxlength="300" cols="100" rows="5" name="new-comment" id="new-comment">
    </textarea>

    <div class="px-4 py-3 sm:px-6 flex flex-col sm:flex-row justify-between">
      <p v-if="commentError" class="absolute left-20 px-4 pb-5 text-base text-red-500">{{ commentError }}</p>
      <p v-if="commentSuccess" class="absolute left-20 px-4 pb-5 text-base text-green-500">{{ commentSuccess }}</p>
      <button @click.prevent="handleCommentForm" type="button" :class="['sm:absolute sm:right-24 inline-flex bg-transparent justify-center py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mb-10', dense ? 'px-2' : 'px-4']">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex';
const axios = require('axios').default;

export default {
  name: 'CommentFormComponent',
  props: ['georeferenceId', 'orderId', 'dense'],
  emits: ['closeModal'],
  setup(props, { emit }) {
    let comment = ref(null)
    let commentError = ref(null)
    let commentSuccess = ref(null)

    const store = useStore()

    return {
      comment,
      commentError,
      commentSuccess,
      handleCommentForm() {
        // reset comment errors & success
        commentError.value = null
        commentSuccess.value = null

        // make api call to create the comment
        axios({
          method: 'post',
          url: 'http://localhost:3000/comments/',
          data: {
            comment: comment.value,
            userId: store.state.user._id,
            orderId: props.orderId,
            georeferenceId: props.georeferenceId || null
          },
          headers: { 'Access-Control-Allow-Origin': '*' }
        }).then(function (response) {
          const data = response.data
          if ('err' in data) { // internal errors ?
            commentError.value = data.err
          } else {
            commentSuccess.value = "Comment created succesfully.";

            // add comment to our store
            store.commit('addComment', response.data.comment);

            if (emit) emit('closeModal');
          }
        });
      },
    }
  }
}

</script>

<style>
  textarea.comment-textarea {
    resize: none none;
  }
</style>