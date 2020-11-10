<template>
  <section class="app-page --about">
    <div class="page__info">
      <p v-html="$options.filters.contentFormat($t('about.about'))"></p>
      <p v-text="version"></p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'about',
  title() {
    return this.$t('about.title')
  },
  computed: {
    version() {
      return this.$t('about.version', { version: process.env.PACKAGE_VERSION || 0 })
    }
  }
}
</script>