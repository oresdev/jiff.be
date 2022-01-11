<template>
  <div class="container-fluid">
    <content-title>{{ $t('about.title') }}</content-title>

    <p v-html="$formatter.contentFormat($t('about.about'))"></p>
    <p v-text="version"></p>
  </div>
</template>

<script>
import { ContentTitle } from '@vue-norma/ui'
export default {
  name: 'about',
  components: { ContentTitle },
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