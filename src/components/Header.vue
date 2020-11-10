<template>
  <header class="app-header">
    <ul class="header__nav">
      <template v-for="(page, index) in pages">
        <router-link :key="page.title" :to="page.path"
          tag='li'
          class="header__item"
          active-class=""
          exact-active-class="--active"
        ><a @dragstart="disableDrag" @dragend="disableDrag" @dragenter="disableDrag" :tabindex="index + 1">{{ page.title }}</a></router-link>
      </template>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      pages: [
        { title: this.$t('home.title'), path: '/' },
        { title: this.$t('manage.title'), path: '/manage' },
        { title: this.$t('about.title'), path: '/about' },
      ]
    }
  },
  methods: {
    disableDrag(e) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
}
</script>

<style scoped lang="scss">
.app-header {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  .header__nav {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;

    .header__item {
      display: inline-block;

      a {
        font-size: 1.3789rem;
      }

      &:not(:last-child) {
        margin-right: 1rem;
      }

      &.--active {
        font-weight: bold;
      }
    }
  }
}
</style>
