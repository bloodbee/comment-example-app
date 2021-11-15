<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col" id="admin-channel">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden rounded-lg">
          <button
            type="button"
            @click="deleteChannel()"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2
            rounded-md text-sm font-medium mb-10"
          >
            Delete this channel
          </button>
          <div class="w-full text-yellow-400 text-left text-lg sm:text-xl" v-if="comment">
            Created at {{ new Date(comment.createdAt).toLocaleString() }}
            by <b>{{ comment.userId }}</b>
          </div>
          <div
            v-if="comment && comment.orderId"
            class="w-full text-gray-500 text-left text-md sm:text-lg"
          >
            Order ID : <b>{{ comment.orderId }}</b>
          </div>
          <p
            v-if="comment"
            class="text-lg text-gray-500 line-clamp-4 bg-gray-100 rounded-lg
            border border-gray-200 text-left pl-2"
          >
            {{ comment.text }}
          </p>
          <div
            class="border-t border-gray-500 grid grid-cols-1 md:grid-cols-2
            gap-4 pt-4 mt-4"
            id="comment-subcomments"
          >
            <p
              v-for="subcomment in subcomments"
              :key="subcomment._id"
              class="text-lg text-gray-500 line-clamp-4 bg-gray-100 rounded-lg
              border border-gray-200 text-left pl-2"
            >
              {{ subcomment.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ChannelDetailView',
  props: ['admin'],
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    return {
      comment: computed(() => store.state.comments
        .find((el) => el._id === route.params.id)),
      subcomments: computed(() => store.state.comments
        .filter((el) => el.georeferenceId === route.params.id)),
      async deleteChannel() {
        await store.dispatch('deleteChannel', { id: route.params.id });

        router.push({ name: 'AdminChannels' });
      },
    };
  },
};
</script>

<style scoped>
p {
  white-space: pre-wrap;
}
</style>
