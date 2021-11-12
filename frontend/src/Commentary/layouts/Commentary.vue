<template>
  <div class="flex flex-1 flex-col px-4 sm:px-20 mb-10">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'CommentaryLayout',
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
