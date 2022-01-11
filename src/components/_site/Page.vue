<template>
  <section :class="[ 'site-page' ]">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'site-page'
}
</script>

<style scoped lang="scss">
.site-page {
  padding-top: 3rem;
  min-height: 70rem;
}
</style>
