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
              class="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden
              text-left align-middle transition-all transform bg-white
              shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="text-2xl sm:text-4xl font-medium leading-6 text-gray-900 text-center"
              >
                Authentification
              </DialogTitle>
              <div class="mt-6 flex flex-1 flex-col sm:flex-row justify-around">
                <div id="login" class="sm:mr-6 w-full sm:w-1/2">
                  <h4 class="text-lg sm:text-2xl font-medium text-yellow-400">Login</h4>
                  <div class="mt-5 md:mt-10 md:col-span-2">
                    <form action="#" @submit.prevent="handleLogin">
                      <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                          <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6">
                              <label
                                for="login-email"
                                class="block text-sm font-medium text-gray-700"
                              >
                                Email
                              </label>
                              <input
                                autocomplete="login-email"
                                v-model="loginEmail"
                                type="email"
                                name="login-email"
                                id="login-email"
                                class="mt-1 focus:ring-yellow-500 focus:border-yellow-500
                                block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div class="col-span-6">
                              <label
                                for="login-password"
                                class="block text-sm font-medium text-gray-700"
                              >
                                Password
                              </label>
                              <input
                                autocomplete="login-password"
                                v-model="loginPassword"
                                type="password"
                                name="login-password"
                                id="login-password"
                                class="mt-1 focus:ring-yellow-500 focus:border-yellow-500
                                block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                          </div>
                        </div>
                        <p
                          v-if="loginError"
                          class="px-6 pb-5 text-base text-red-500"
                        >
                          {{ loginError }}
                        </p>
                        <p
                          v-if="loginSuccess"
                          class="px-6 pb-5 text-base text-green-500"
                        >
                          {{ loginSuccess }}
                        </p>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent
                            shadow-sm text-sm font-medium rounded-md text-white bg-yellow-400
                            hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2
                            focus:ring-yellow-500"
                          >
                            Signin
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div id="register" class="sm:ml-6 w-full sm:w-1/2">
                  <h4 class="text-lg sm:text-2xl font-medium text-yellow-400">Register</h4>
                  <div class="mt-5 md:mt-10 md:col-span-2">
                    <form action="#" @submit.prevent="handleRegister">
                      <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                          <div class="grid grid-cols-6 gap-6">

                            <div class="col-span-6">
                              <label
                                for="register-pseudo"
                                class="block text-sm font-medium text-gray-700"
                              >
                                Pseudonym
                              </label>
                              <input
                                autocomplete="register-pseudo"
                                v-model="registerPseudo"
                                type="text"
                                name="register-pseudo"
                                id="register-pseudo"
                                class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block
                                w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div class="col-span-6">
                              <label
                                for="register-email"
                                class="block text-sm font-medium text-gray-700"
                              >
                                Email
                              </label>
                              <input
                                autocomplete="register-email"
                                v-model="registerEmail"
                                type="email"
                                name="register-email"
                                id="register-email"
                                class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block
                                w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div class="col-span-6">
                              <label
                                for="register-password"
                                class="block text-sm font-medium text-gray-700"
                              >
                                Password
                              </label>
                              <input
                                autocomplete="register-password"
                                v-model="registerPassword"
                                type="password"
                                name="register-password"
                                id="register-password"
                                class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block
                                w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <div class="col-span-6">
                              <label
                                for="register-confirm-password"
                                class="block text-sm font-medium text-gray-700"
                              >
                                Password confirmation
                              </label>
                              <input
                                autocomplete="register-confirm-password"
                                v-model="registerConfirmPassword"
                                type="password"
                                name="register-confirm-password"
                                id="register-confirm-password"
                                class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block
                                w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>

                          </div>
                        </div>
                        <p
                          v-if="registerError"
                          class="px-6 pb-5 text-base text-red-500"
                        >
                          {{ registerError }}
                        </p>
                        <p
                          v-if="registerSuccess"
                          class="px-6 pb-5 text-base text-green-500"
                        >
                          {{ registerSuccess }}
                        </p>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent
                            shadow-sm text-sm font-medium rounded-md text-white bg-yellow-400
                            hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2
                            focus:ring-yellow-500"
                          >
                            Signup
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
import { ref } from 'vue';
import { useStore } from 'vuex';

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue';

import axios from 'axios';

export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  name: 'AuthModalComponent',
  props: ['modalStatus'],
  emits: ['closeModal'],
  setup(props, { emit }) {
    const isOpen = ref(props.modalStatus);

    // login props
    const loginEmail = ref(null);
    const loginPassword = ref(null);
    const loginError = ref(null);
    const loginSuccess = ref(null);

    // registerr props
    const registerPseudo = ref(null);
    const registerEmail = ref(null);
    const registerPassword = ref(null);
    const registerConfirmPassword = ref(null);
    const registerError = ref(null);
    const registerSuccess = ref(null);

    const store = useStore();

    return {
      isOpen,
      loginEmail,
      loginPassword,
      loginError,
      loginSuccess,
      registerPseudo,
      registerEmail,
      registerPassword,
      registerConfirmPassword,
      registerError,
      registerSuccess,
      handleLogin() {
        // reset login errors & success
        loginError.value = null;
        loginSuccess.value = null;

        // check that we have all we need
        if (loginEmail.value && loginPassword.value) {
          // call api with axios on /users/login
          axios.post('http://localhost:3000/users/login/', {
            email: loginEmail.value,
            password: loginPassword.value,
          }, {
            headers: { 'Access-Control-Allow-Origin': '*' },
          }).then((response) => {
            const { data } = response;

            if (data) {
              if ('err' in data) { // internal errors ?
                loginError.value = data.err;
              } else {
                loginSuccess.value = 'Signin succesfully.';
                // set user in store
                store.commit('setUser', response.data.user);

                // close modal
                setTimeout(() => {
                  emit('closeModal');
                }, 4000);
              }
            }
          });
        } else {
          loginError.value = 'All fields are mandatory.';
        }
      },
      handleRegister() {
        // reset register errors & success
        registerError.value = null;
        registerSuccess.value = null;

        // check that we have all we need
        if (registerEmail.value
          && registerPseudo.value
          && registerPassword.value
          && registerConfirmPassword.value) {
          if (registerPassword.value === registerConfirmPassword.value) {
            // call api with axios on /users/post
            axios.post('http://localhost:3000/users/', {
              email: registerEmail.value,
              password: registerPassword.value,
              pseudonym: registerPseudo.value,
            }, {
              headers: { 'Access-Control-Allow-Origin': '*' },
            }).then((response) => {
              const { data } = response;

              if (data) {
                if ('err' in data) { // internal errors ?
                  registerError.value = data.err;
                } else {
                  registerSuccess.value = 'Registered succesfully, you can now signin.';
                  // close modal
                  setTimeout(() => {
                    emit('closeModal');
                  }, 4000);
                }
              }
            });
          } else {
            registerError.value = 'Mismatch passwords.';
          }
        } else {
          registerError.value = 'All fields are mandatory.';
        }
      },
    };
  },
};
</script>
