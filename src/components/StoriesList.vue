<template>
  <section class="app-stories" v-if="stories.length != 0" >
    <div class="story-wrapper" v-for="story in stories" :key="story.uuid">
      <div class="story-divider"></div>
      <story :story="story" @edit="edit" @remove="remove" />
    </div>
  </section>
</template>

<script>
import Story from '@/components/Story'

export default {
  name: 'StoriesList',
  components: { Story },
  props: [ 'stories' ],
  methods: {
    edit() {
      alert('Soon')
    },
    remove(uuid) {
      this.$emit('remove', uuid)
    }
  },
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
