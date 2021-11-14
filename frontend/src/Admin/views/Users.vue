<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <button @click="openAddUserModal" type="button" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium mb-10">Add user</button>
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                  Role
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200" v-if="users.length > 0">
              <tr v-for="user in users" :key="user._id">
                <td :class="['px-6 py-4 whitespace-nowrap', user._id === admin._id ? 'bg-yellow-50' : '']">
                  <div class="flex items-center">
                    <div>
                      <div class="text-sm text-left font-medium text-gray-900">
                        {{ user.pseudonym }}
                      </div>
                      <div class="text-sm text-left text-gray-500">
                        {{ user.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td :class="['px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left', user._id === admin._id ? 'bg-yellow-50' : '']">
                  {{ user.role.replace(/^\w/, (c) => c.toUpperCase()) }}
                </td>
                <td :class="['flex flex-1 items-center px-6 py-4 whitespace-nowrap text-sm font-medium text-left', user._id === admin._id ? 'bg-yellow-50' : '']">
                  <a href="#" class="" title="Edit"><PencilIcon class="text-yellow-400 hover:text-yellow-500 h-6 w-6" /></a>
                  <a v-if="user._id !== admin._id" href="#" @click.prevent="deleteUser(user._id)" class="ml-10" title="Delete"><TrashIcon class="text-red-500 hover:text-red-700 h-6 w-6" /></a>
                </td>
              </tr>
            </tbody>
            <tbody class="bg-white divide-y divide-gray-200" v-else>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap" colspan="6">
                  <p class="text-sm text-left font-medium text-gray-900 text-center">
                    There are no users.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <AddUserModalComponent v-if="isAddUserModalOpen" :modal-status="isAddUserModalOpen" @close-modal="closeAddUserModal"/>

  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from 'vuex';

import { TrashIcon, PlusIcon, PencilIcon } from '@heroicons/vue/outline'

import AddUserModalComponent from '@/Admin/components/AddUserModal.vue'

export default {
  name: 'UsersView',
  components: {
    TrashIcon,
    PlusIcon,
    PencilIcon,
    AddUserModalComponent
  },
  props: ['admin'],
  setup() {
    const store = useStore()

    let isAddUserModalOpen = ref(false);
    
    return {
      isAddUserModalOpen,
      users: computed(() => store.state.users),
      openAddUserModal() {
        isAddUserModalOpen.value = true;
      },
      closeAddUserModal() {
        isAddUserModalOpen.value = false;
      },
      deleteUser(id) {
        store.dispatch('deleteUser', { id: id })
      }
    }
  },
}
</script>