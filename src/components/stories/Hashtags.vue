<template>
  <section class="app-stories-hashtags">
    <template v-for="(count, hashtag) in items">
      <router-link :to="{ name: 'home', query: { hashtag: hashtag.replace('#', '') } }" class="hashtag" :key="hashtag"  active-class="" exact-active-class="--active">
        <span class="label">{{ hashtag }}</span>
        <span class="count">{{ count }}</span>
      </router-link>
    </template>
  </section>
</template>

<script>

export default {
  name: 'stories-hashtags',
  props: {
    items: {
      type: Object | Array,
      default: []
    }
  }
}
</script>

<style scoped lang="scss">
.hashtag {
  background: var(--x-background-color--darker);
  border-radius: var(--x-border-radius--small);
  line-height: 1.3334;
  padding: .15rem .5rem;

  &:not(:last-child) {
    margin-right: .75rem;
  }

  .label {
    font-size: var(--x-font-size--small);
  }

  .count {
    margin-left: .75rem;
    font-size: var(--x-font-size--small);
    color: var(--x-color-black--tint40);
  }

  &.--active {
    background: var(--x-background-color--shade5);
  }
}
</style>
