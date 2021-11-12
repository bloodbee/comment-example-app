<template>
  <div class="w-full h-full px-4 sm:px-20 my-10">
    <router-view :admin="admin"></router-view>
  </div>
</template>

<script>

export default {
  name: 'DashboardLayout',
  async mounted() {
    // load all users into the store
    await this.$store.dispatch('loadUsers')
  },
  computed: {
    /**
     * Retrieve the admin in our store
     */
    admin() {
      return this.$store.state.user
    }
  }
};
</script>

<style>
</style>
