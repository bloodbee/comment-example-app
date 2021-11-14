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
                Add an user
              </DialogTitle>
              <div class="mt-6 flex flex-1 flex-col sm:flex-row justify-around">
                <div id="add" class="sm:ml-6 w-full sm:w-1/2">
                  <h4 class="text-lg sm:text-2xl font-medium text-yellow-400">Create</h4>
                  <div class="mt-5 md:mt-10 md:col-span-2">
                    <form action="#" @submit.prevent="handleAddUser">
                      <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                          <div class="grid grid-cols-6 gap-6">

                            <div class="col-span-6">
                              <label for="add-pseudo" class="block text-sm font-medium text-gray-700">Pseudonym</label>
                              <input autocomplete="add-pseudo"  v-model="userPseudo" type="text" name="add-pseudo" id="add-pseudo" class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div class="col-span-6">
                              <label for="add-email" class="block text-sm font-medium text-gray-700">Email</label>
                              <input autocomplete="add-email"  v-model="userEmail" type="email" name="add-email" id="add-email" class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div class="col-span-6">
                              <label for="add-password" class="block text-sm font-medium text-gray-700">Password</label>
                              <input autocomplete="add-password"  v-model="userPassword" type="password" name="add-password" id="add-password" class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div class="col-span-6">
                              <label for="add-confirm-password" class="block text-sm font-medium text-gray-700">Password confirmation</label>
                              <input autocomplete="add-confirm-password"  v-model="userConfirmPassword" type="password" name="add-confirm-password" id="add-confirm-password" class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                          </div>
                        </div>
                        <p v-if="addUserError" class="px-6 pb-5 text-base text-red-500">{{ addUserError }}</p>
                        <p v-if="addUserSuccess" class="px-6 pb-5 text-base text-green-500">{{ addUserSuccess }}</p>
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
} from "@headlessui/vue";

const axios = require('axios').default;

export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  name: 'AddUserModalComponent',
  props: ['modalStatus'],
  emits: ['closeModal'],
  setup(props, { emit }) {
    let isOpen = ref(props.modalStatus);

    // registerr props
    let userPseudo = ref(null);
    let userEmail = ref(null);
    let userPassword = ref(null);
    let userConfirmPassword = ref(null);
    let addUserError = ref(null);
    let addUserSuccess = ref(null);

    const store = useStore();
    
    return {
      isOpen,
      userPseudo,
      userEmail,
      userPassword,
      userConfirmPassword,
      addUserError,
      addUserSuccess,
      handleAddUser() {
        // reset register errors & success
        addUserError.value = null;
        addUserSuccess.value = null;

        // check that we have all we need
        if (userEmail.value && userPseudo.value && userPassword.value && userConfirmPassword.value) {
          if (userPassword.value === userConfirmPassword.value) {
            // call api with axios on /users/post
            axios({
              method: 'post',
              url: 'http://localhost:3000/users/',
              data: {
                email: userEmail.value,
                password: userPassword.value,
                pseudonym: userPseudo.value
              },
              headers: { 'Access-Control-Allow-Origin': '*' }
            }).then(function (response) {
              const data = response.data

              if ('err' in data) { // internal errors ?
                addUserError.value = data.err
              } else {
                addUserSuccess.value = "Added succesfully.";

                // reload users
                store.dispatch('loadUsers')

                // close modal
                setTimeout(() => {
                  emit('closeModal');
                }, 4000)
              }
            });
          } else {
            addUserError.value = "Mismatch passwords.";
          }
        } else {
          addUserError.value = "All fields are mandatory.";
        }

      }
    };
  },
}
</script>