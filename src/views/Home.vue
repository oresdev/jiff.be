<template>
  <section class="app-page --home">
    <section class="app-hashtag" v-if="hashtag" v-text="$t('home.hashtag', { hashtag })"></section>
    <new-story @created="addStory" />
    <stories-list :stories="getStories" @remove="removeStory" />
  </section>
</template>

<script>
import NewStory from '@/components/NewStory'
import StoriesList from '@/components/StoriesList'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    NewStory,
    StoriesList
  },
  title() {
    return this.$t('home.title')
  },
  data() {
    return {
      error: false,
      sort: (a, b) => b.created_at - a.created_at,
      hashtag: null
    }
  },
  computed: {
    getStories() {
      try {
        this.error = false
        return this.$store.getters.getStories({
          sort: this.sort,
          hashtag: this.hashtag
        })
      } catch(e) {
        this.error = true
        return []
      }
    }
  },
  methods: {
    ...mapActions([ 'addStory', 'removeStory'])
  },
  watch: {
    $route(to) {
      this.hashtag = to.query.hashtag || null
    }
  },
  mounted() {
    this.hashtag = this.$route.query.hashtag || null
  }
}
</script>
