<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/6">
                  Comment
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                  Order ID
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                  Georeference ID
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                  Creation
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200" v-if="channels.length > 0">
              <tr v-for="channel in channels" :key="channel._id" >
                <td class="px-6 py-4 whitespace-nowrap">
                    <p class="text-sm text-left font-medium text-gray-900">
                      {{ channel.text }}
                    </p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                  {{ channel.orderId }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                  {{ channel.georeferenceId }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                  <div class="flex items-center">
                    <div>
                      <div class="text-sm text-left text-gray-900 font-bold">
                        {{ channel.userId }}
                      </div>
                      <div class="text-sm text-left text-gray-500">
                        {{ new Date(channel.createdAt).toLocaleString() }}
                      </div>
                    </div>
                  </div> 
                </td>
                <td class="flex flex-1 items-center px-6 py-4 whitespace-nowrap text-sm font-medium text-left">
                  <router-link :to="{ name: 'AdminChannel', params: { id: channel._id} }" class="mx-auto" title="Detail"><EyeIcon class="text-yellow-400 hover:text-yellow-500 h-6 w-6" /></router-link>
                </td>
              </tr>
            </tbody>
            <tbody class="bg-white divide-y divide-gray-200" v-else>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap" colspan="6">
                  <p class="text-sm text-left font-medium text-gray-900 text-center">
                    There are no comments.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from 'vuex';

import { EyeIcon } from '@heroicons/vue/outline'

export default {
  name: 'ChannelsView',
  components: {
    EyeIcon,
  },
  setup() {
    const store = useStore()
    
    return {
      channels: computed(() => store.state.comments)
    }
  },
}
</script>

<style scoped>
p { 
  white-space: pre-wrap; 
}
</style>