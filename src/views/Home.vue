<template>
  <div class="container-fluid">
    <new-story @created="addStory" />

    <stories-hashtags :items="getUsedHashtags" />

    <stories-list :stories="getStories">
      <template slot-scope="{_story, _key}">
        <story-item :story="_story" :key="_key" @edit="edit" @remove="remove" />
      </template>
    </stories-list>
  </div>
</template>

<script>
import NewStory from '@/components/NewStory'
import { StoryItem, StoriesList, StoriesHashtags } from '@/components/stories'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    NewStory,
    StoryItem, StoriesList, StoriesHashtags
  },
  title() {
    return this.$t('home.title')
  },
  data() {
    return {
      error: false,

      group: 'date',
      sort: (a, b) => b.created_at - a.created_at,
      hashtag: null
    }
  },
  computed: {
    getStories() {
      return this.$store.getters.getStories({
        group:   this.group,
        sort:    this.sort,
        hashtag: this.hashtag
      })
    },
    getUsedHashtags() {
      return this.$store.getters.getUsedHashtags
    }
  },
  methods: {
    ...mapActions([ 'addStory', 'removeStory']),
    edit() {
      alert('Soon')
    },
    remove(uuid) {
      this.removeStory(uuid)
    }
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
