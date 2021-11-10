<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }" id="nav">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="font-extrabold text-2xl sm:text-4xl text-yellow-400">Commentary</h1>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton @click="openAuthModal" class="bg-gray-800 flex text-sm text-yellow-400 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <LockOpenIcon class="h-6 w-6" aria-hidden="true" />
              </MenuButton>
            </div>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="router-link" :to="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
    </DisclosurePanel>

    <!-- Login and register modals -->
    <AuthModal v-if="isAuthModalOpen" :modal-status="isAuthModalOpen" @close-modal="closeAuthModal"/>

  </Disclosure>

</template>

<script>
import { ref } from "vue";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  
} from '@headlessui/vue'
import { LockOpenIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'

import AuthModal from '@/components/AuthModal.vue'

const navigation = [
  { name: 'New', href: 'new', current: true },
  { name: 'Top', href: 'top', current: false },
  { name: 'Random', href: 'random', current: false },
]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    LockOpenIcon,
    MenuIcon,
    XIcon,
    AuthModal
  },
  setup() {
    let isAuthModalOpen = ref(false);

    return {
      navigation,
      isAuthModalOpen,
      openAuthModal() {
        isAuthModalOpen.value = true;
      },
      closeAuthModal() {
        isAuthModalOpen.value = false
      },
      handleLogin() {
        // ...
      }
    }
  },
}
</script>