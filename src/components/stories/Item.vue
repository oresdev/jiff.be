<template>
  <article class="story">
    <template v-if="isEdit">
      <div class="story__content" contenteditable="true" rel="content" v-text="story.content"></div>
      <div class="meta">
        <span class="meta__item">{{ story.created_at | timeFormat }}</span>
        <span class="meta__item --divider">&middot;</span>
        <span class="meta__item"><a href="#" @click.prevent="save">{{ $t('story.save') }}</a></span>
        <span class="meta__item --divider">&middot;</span>
        <span class="meta__item"><a href="#" @click.prevent="remove">{{ $t('story.remove') }}</a></span>
        <span class="meta__item --divider">&middot;</span>
        <span class="meta__item"><a href="#" @click.prevent="cancel">{{ $t('story.cancel') }}</a></span>
      </div>
    </template>
    <template v-else>
      <div class="story__content" contenteditable="false" v-html="$formatter.contentFormat(story.content)"></div>
      <div class="meta">
        <span class="meta__item">{{ story.created_at | timeFormat }}</span>
        <span class="meta__item --divider">&middot;</span>
        <span class="meta__item"><a href="#" @click.prevent="edit">{{ $t('story.edit') }}</a></span>
      </div>
    </template>
  </article>
</template>

<script>
import NewStory from '@/components/NewStory'

export default {
  name: 'story-item',
  components: { NewStory },
  props: [ 'story' ],
  data() {
    return {
      isEdit: false
    }
  },
  methods: {
    save(e) {
      this.$emit('edit', this.story)
      this.edit()
    },
    edit(e) {
      this.isEdit = !this.isEdit
    },
    remove(e) {
      this.$emit('remove', this.story.uuid)
    },
    cancel(e) {
      this.isEdit = false
    }
  }
}
</script>

<style scoped lang="scss">

.story {
  padding: 3rem 0;

  .story__content {
    word-break: break-word;
    white-space: pre-line;
    outline: none;
    margin: .4rem 0;
  }

  .meta {
      opacity: .65;
      transition: opacity .1s ease-out;
  }

  &:hover,
  &:active,
  &:focus {
    .meta {
      opacity: 1;
    }
  }
}

</style>
