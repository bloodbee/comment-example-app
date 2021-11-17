<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }" id="nav">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <!-- Mobile menu button-->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden" v-if="isAdmin">
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400
            hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2
            focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
          <!-- App title -->
          <div class="flex-shrink-0 flex items-center">
            <h1 class="font-extrabold text-2xl sm:text-4xl text-yellow-400">
              <router-link :to="{name:'Home'}">Commentary</router-link>
            </h1>
          </div>
          <!-- Admin module link -->
          <div class="hidden sm:flex sm:ml-6" v-if="isAdmin && isAdminModule">
            <div class="flex space-x-4 mr-20">
              <router-link
                :to="{ name: 'AdminUsers' }"
                class="nav-link bg-yellow-400 text-gray-900 px-4
                py-2 rounded-md text-sm font-medium"
              >
                Users
              </router-link>
              <router-link
                :to="{ name: 'AdminChannels' }"
                class="nav-link bg-yellow-400 text-gray-900 px-4
                py-2 rounded-md text-sm font-medium"
              >
                Channels
              </router-link>
            </div>
          </div>
          <!-- Admin link -->
          <div class="hidden sm:flex sm:ml-6" v-if="isAdmin">
            <div class="flex space-x-4">
              <router-link
                :to="{ name: 'AdminDashboard' }"
                class="nav-link bg-gray-900 text-white px-4
                py-2 rounded-md text-sm font-medium"
              >
                Admin
              </router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2
        sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton
                v-if="!user"
                @click="openAuthModal"
                class="items-center justify-center bg-gray-800 flex text-sm
                text-yellow-400 rounded-full focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <LockClosedIcon id="auth-button" class="h-8 w-8" aria-hidden="true" />
              </MenuButton>
              <MenuButton
                v-else
                @click="logout"
                class="items-center justify-center bg-gray-800 flex text-sm
                text-yellow-400 rounded-full focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <LogoutIcon id="auth-button" class="h-8 w-8" aria-hidden="true" />
              </MenuButton>
            </div>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden" v-if="isAdmin">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <DisclosureButton
          as="router-link"
          :to="{ name: 'AdminDashboard' }"
          class="bg-gray-900 text-white block px-3 py-2
          rounded-md text-base font-medium"
        >
          Admin
        </DisclosureButton>
        <DisclosureButton
          v-if="isAdminModule"
          as="router-link"
          :to="{ name: 'AdminUsers' }"
          class="bg-yellow-400 text-gray-900 block px-3 py-2
          rounded-md text-base font-medium"
        >
          Users
        </DisclosureButton>
        <DisclosureButton
          v-if="isAdminModule"
          as="router-link"
          :to="{ name: 'AdminChannels' }"
          class="bg-yellow-400 text-gray-900 block px-3 py-2
          rounded-md text-base font-medium"
        >
          Comments
        </DisclosureButton>
      </div>
    </DisclosurePanel>

    <!-- Login and register modals -->
    <AuthModalComponent
      v-if="isAuthModalOpen"
      :modal-status="isAuthModalOpen"
      @close-modal="closeAuthModal"
    />

  </Disclosure>

</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
} from '@headlessui/vue';
import {
  LogoutIcon, LockClosedIcon, MenuIcon, XIcon,
} from '@heroicons/vue/outline';
import baseMixin from '@/Shared/mixins/base';

import AuthModalComponent from '@/Shared/components/AuthModal.vue';

export default {
  name: 'NavComponent',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    LogoutIcon,
    LockClosedIcon,
    MenuIcon,
    XIcon,
    AuthModalComponent,
  },
  mixins: [baseMixin],
  setup() {
    const isAuthModalOpen = ref(false);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    return {
      isAuthModalOpen,
      openAuthModal() {
        isAuthModalOpen.value = true;
      },
      closeAuthModal() {
        isAuthModalOpen.value = false;
      },
      logout() {
        // just set the user to undefined - original app state
        store.commit('setUser', null);

        // if user is in admin, redirect to home
        if (route.path.startsWith('/admin')) {
          router.push({ name: 'Home' });
        }
      },
      isAdmin: computed(() => store.state.user && store.state.user.role === 'admin'), // checked that the authentified user is admin
      isAdminModule: computed(() => route.path.startsWith('/admin')),
    };
  },
};
</script>

<style>
.nav-link {
  line-height: 1.5rem;
}
</style>
