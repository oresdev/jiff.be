<template>
  <header class="site-header">
    <div class="container-fluid">
      <div class="header__navigation">
        <ul class="navigation__list">
          <router-link :to="{ name: 'home' }" tag='li' class="navigation__item" active-class="" exact-active-class="--active">
            <a @dragstart="disableDrag" @dragend="disableDrag" @dragenter="disableDrag">{{ $t('header.stories') }}</a>
          </router-link>
        </ul>
        <div class="navigation__spacer"></div>
        <ul class="navigation__list">
          <router-link :to="{ name: 'settings' }" tag='li' class="navigation__item" active-class="" exact-active-class="--active">
            <a @dragstart="disableDrag" @dragend="disableDrag" @dragenter="disableDrag">{{ $t('header.settings') }}</a>
          </router-link>
          <router-link :to="{ name: 'manage' }" tag='li' class="navigation__item" active-class="" exact-active-class="--active">
            <a @dragstart="disableDrag" @dragend="disableDrag" @dragenter="disableDrag">{{ $t('header.manage') }}</a>
          </router-link>
          <router-link :to="{ name: 'about' }" tag='li' class="navigation__item" active-class="" exact-active-class="--active">
            <a @dragstart="disableDrag" @dragend="disableDrag" @dragenter="disableDrag">{{ $t('header.about') }}</a>
          </router-link>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'site-header',
  data() {
    return {}
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
.site-header {
  user-select: none;
}

.header__navigation {
  --color: var(--x-color-black);

  display: flex;
  justify-content: flex-center;
  align-items: center;

  .navigation__spacer {
    flex: 1;
    flex-basis: 0.000000001px;
  }

  .navigation__list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;

    .navigation__item {
      display: inline-block;
      font-weight: var(--x-font-weight--normal);
      position: relative;

      &:hover { --color: var(--x-color-action); }
      &:after {
        transition: background .25s ease-in-out;
      }

      a {
        color: var(--color);
        display: flex;
        align-items: center;
        padding: 1.25rem 0;
        transition: color .25s ease-in-out;
        cursor: pointer;

        svg {
          fill: var(--color);
          margin-right: .5rem;
          transition: fill .25s ease-in-out;
        }
      }

      &.--active {
        --color: var(--x-color-black);
        &:after {
          background: var(--color);
          bottom: 10px;
          content: '';
          height: 2px;
          left: 0;
          position: absolute;
          width: 100%;
        }

        &:hover { --color: var(--x-color-action); } 
      }

      &:not(:last-child) { margin-right: 1.5rem; }
    }

    .navigation__button {
      --color: var(--x-color-black);
      a {
        height: 50px;
        width: 50px;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
      }

      &.--active { --color: var(--x-color-action); }
      &:hover { --color: var(--x-color-action); }

      svg {
        fill: var(--color);
        height: 18px;
        width: 18px;
        transition: fill 0.15s ease-out;
      }
    }
  }
}
</style>
