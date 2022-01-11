<template>
  <section class="app-stories" v-if="stories.length != 0" >
    <slot v-for="story in stories"
      :_story="story"
      :_key="'story-' + story.uuid" />
  </section>
</template>

<script>

export default {
  name: 'stories-list',
  props: [ 'stories' ],
  methods: { },
  mounted() {
    document.addEventListener("touchstart", function() {}, false)
  },
  beforeDestroy() {
    document.removeEventListener("touchstart", function() {}, false)
  }
}
</script>

<style scoped lang="scss">


</style>
