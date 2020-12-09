<template lang="pug">
#app
  router-view
  portal-target(name="modal")
  portal-target(name="dialog")
</template>

<script>
export default {
  name: 'App',
  components: {},
  computed: {},
  watch: {},
  methods: {}
}
</script>
