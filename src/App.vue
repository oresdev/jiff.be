<template>
  <div id="app">
    <site-header />
    <site-page>
      <router-view />
    </site-page>
  </div>
</template>

<script>
import { SiteHeader, SitePage } from '@/components/_site'

export default {
  name: 'app',
  components: {
    SiteHeader, SitePage
  }
}
</script>

<style lang="scss">

</style>
