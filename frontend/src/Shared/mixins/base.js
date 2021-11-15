export default {
  computed: {
    /**
     * Retrieve the user in our store (connected or not)
     */
    user() {
      return this.$store.state.user
    },
  }
}