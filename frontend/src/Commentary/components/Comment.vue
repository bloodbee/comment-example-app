<template>
  <div class="grid-item flex flex-1 flex-col justify-between relative mb-0 border border-yellow-400 rounded-lg p-1 shadow overflow-hidden">
    <div class="group h-4/5">
      <router-link :to="{name: 'Channel', params: { id: comment._id }}">
        <p class="text-lg text-gray-500 line-clamp-4 bg-gray-100 rounded-lg border border-gray-200 text-left pl-2">
          {{ comment.text }}
        </p>
      </router-link>
    </div>
    <div class="p-2 pt-0 flex flex-1 justify-between align-center h-1/5">
      <div @click="switchModal()" class="subcomment flex justify-around max-w-min text-yellow-400 hover:text-yellow-500">{{ getSubcomments ? getSubcomments.length : 0 }} <AnnotationIcon class="h-6 w-6 ml-2" /></div>
      <span class="text-sm text-left p-1">{{ new Date(comment.createdAt).toLocaleString() }}</span>
    </div>
  </div>

  <!-- Comment form modal to add a subcomment -->
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="switchModal()">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <div class="flex flex-1 flex-col sm:flex-row justify-around" v-if="user">
                <CommentFormComponent :georeferenceId="comment._id" @close-modal="switchModal()"/>
              </div>
              <div class="flex flex-1 flex-col sm:flex-row justify-around" v-else>
                <p>You have to be connected if you want to give a comment.</p>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

</template>

<script>
import { AnnotationIcon } from '@heroicons/vue/outline'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";
import CommentFormComponent from '@/Commentary/components/CommentForm.vue'

export default {
  name: 'CommentComponent',
  components: {
    AnnotationIcon,
    CommentFormComponent,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  props: ['comment'],
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    getSubcomments() {
      return this.$store.state.comments.filter(el => el && el.georeferenceId === this.comment._id) || []
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    switchModal() {
      this.isOpen = !this.isOpen
    }
  },
}
</script>

<style scoped>
.subcomment:hover {
  cursor: pointer;
}

p { 
  white-space: pre-wrap; 
}
</style>