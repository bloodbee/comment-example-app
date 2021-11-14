<template>
  <div class="border border-gray-500 rounded-lg shadow overflow-hidden sm:rounded-md h-64 p-2">
    <label class="block font-medium text-gray-700 text-left text-xl">New comment</label>
    
    <input placeholder="Your order ID here." v-model="orderId" class="comment-order w-full bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 mb-2 h-8 pl-3" name="new-order" id="new-order" />
    <textarea required placeholder="Your comment here." v-model="comment" class="comment-textarea w-full bg-gray-100 border-none rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400" wrap="soft" maxlength="300" cols="100" rows="5" name="new-comment" id="new-comment">
    </textarea>

    <div class="px-4 pb-3 sm:py-3 sm:pb-0 sm:px-6 flex flex-col sm:flex-row justify-between">
      <p v-if="commentError" class="relative sm:absolute sm:left-40 px-4 pb-1 sm:pb-5 text-base text-red-500">{{ commentError }}</p>
      <p v-if="commentSuccess" class="relative sm:absolute sm:left-40 px-4 pb-1 sm:pb-5 text-base text-green-500">{{ commentSuccess }}</p>
      <button @click.prevent="handleCommentForm" type="button" class="sm:absolute sm:right-44 inline-flex bg-transparent justify-center py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mb-10 px-4">
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
  props: ['georeferenceId'],
  emits: ['closeModal'],
  setup(props, { emit }) {
    let comment = ref(null)
    let commentError = ref(null)
    let commentSuccess = ref(null)
    let orderId = ref(null)

    const store = useStore()

    return {
      comment,
      commentError,
      commentSuccess,
      orderId,
      handleCommentForm() {
        // reset comment errors & success
        commentError.value = null
        commentSuccess.value = null

        if (comment.value) {

          // make api call to create the comment
          axios({
            method: 'post',
            url: 'http://localhost:3000/comments/',
            data: {
              comment: comment.value,
              userId: store.state.user._id,
              orderId: orderId.value,
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

              // flush datas
              comment.value = null
              orderId.value = null

              // close modal
              if (emit) emit('closeModal');
            }
          });
        } else {
          commentError.value = "The comment is mandatory."
        }
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