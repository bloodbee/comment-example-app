<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="this.$emit('closeModal')">
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
              <DialogTitle
                as="h3"
                class="text-2xl sm:text-4xl font-medium leading-6 text-gray-900 text-center"
              >
                Edit user
              </DialogTitle>
              <div class="mt-6 flex flex-1 flex-col sm:flex-row justify-around">
                <div id="edit" class="sm:ml-6 w-full sm:w-1/2">
                  <h4 class="text-lg sm:text-2xl font-medium text-yellow-400">Edit {{ user._id }}</h4>
                  <div class="mt-5 md:mt-10 md:col-span-2">
                    <form action="#" @submit.prevent="handleEditUser">
                      <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                          <div class="grid grid-cols-6 gap-6">

                            <div class="col-span-6">
                              <label for="edit-pseudo" class="block text-sm font-medium text-gray-700">Pseudonym</label>
                              <input autocomplete="edit-pseudo"  v-model="userPseudo" type="text" name="edit-pseudo" id="edit-pseudo" class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div class="col-span-6">
                              <label for="edit-email" class="block text-sm font-medium text-gray-700">Email</label>
                              <input autocomplete="edit-email"  v-model="userEmail" type="email" name="edit-email" id="edit-email" class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div class="col-span-6">
                              <label for="edit-role" class="block text-sm font-medium text-gray-700">Role</label>
                              <Listbox v-model="userRole">
                                <div class="relative mt-1">
                                  <ListboxButton class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">{{ userRole.replace(/^\w/, (c) => c.toUpperCase()) }}</ListboxButton>
                                  <ListboxOptions class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption class="text-gray-900 cursor-default select-none relative py-2 pl-10 pr-4" value="user">User</ListboxOption>
                                    <ListboxOption class="text-gray-900 cursor-default select-none relative py-2 pl-10 pr-4" value="admin">Admin</ListboxOption>
                                  </ListboxOptions>
                                </div>
                              </Listbox>
                            </div>

                            <div class="col-span-6">
                              <label for="edit-new-password" class="block text-sm font-medium text-gray-700">New password</label>
                              <input autocomplete="edit-new-password"  v-model="userNewPassword" type="password" name="edit-new-password" id="edit-new-password" class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div class="col-span-6">
                              <label for="edit-confirm-password" class="block text-sm font-medium text-gray-700">Password confirmation</label>
                              <input autocomplete="edit-confirm-password"  v-model="userConfirmPassword" type="password" name="edit-confirm-password" id="edit-confirm-password" class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                          </div>
                        </div>
                        <p v-if="editUserError" class="px-6 pb-5 text-base text-red-500">{{ editUserError }}</p>
                        <p v-if="editUserSuccess" class="px-6 pb-5 text-base text-green-500">{{ editUserSuccess }}</p>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex';

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

import axios from "axios";

export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  },
  name: 'EditUserModalComponent',
  props: ['modalStatus', 'user'],
  emits: ['closeModal'],
  setup(props, { emit }) {
    let isOpen = ref(props.modalStatus);

    // registerr props
    let userPseudo = ref(props.user.pseudonym);
    let userEmail = ref(props.user.email);
    let userNewPassword = ref(null);
    let userConfirmPassword = ref(null);
    let userRole = ref(props.user.role);
    let editUserError = ref(null);
    let editUserSuccess = ref(null);

    const store = useStore();
    
    return {
      isOpen,
      userPseudo,
      userEmail,
      userNewPassword,
      userConfirmPassword,
      userRole,
      editUserError,
      editUserSuccess,
      handleEditUser() {
        // reset register errors & success
        editUserError.value = null;
        editUserSuccess.value = null;

        // check that we have all we need
        if (userNewPassword.value !== userConfirmPassword.value) {
          editUserError.value = "Mismatch passwords.";
          return;
        }

        // call api with axios on /users/post
        axios.put(`http://localhost:3000/users/${props.user._id}`, {
          email: userEmail.value,
          password: userNewPassword.value,
          pseudonym: userPseudo.value,
          role: userRole.value
        }, {
          headers: { 'Access-Control-Allow-Origin': '*' }
        }).then(function (response) {
          const data = response.data

          editUserSuccess.value = data;

          // reload users
          store.dispatch('loadUsers')

          // close modal
          setTimeout(() => {
            emit('closeModal');
          }, 4000)
        });
      }
    };
  },
}
</script>