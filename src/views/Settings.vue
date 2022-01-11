<template>
  <div class="container-fluid">
    <content-title>{{ $t('settings.title') }}</content-title>

    <p>Настройки невероятно просты! Честно говоря, я не люблю огромные формы аля Facebook.<br>Надеюсь, ты со мной согласен, дорогой друг.</p>
    <p>Сейчас ты используешь White тему оформления. Хочешь сменить ее? Так вперед, нажми на нее!</p>
    <p>Алсо, если ты хочешь сохранять свои истории в облаке, то тебе необходимо указать кодовую фразу, верно?<br>Ну чтож, на данный момент она у тебя не задана. Добавить?<br>Думаю, ты это уже знаешь, раз используешь "passphrase" в качестве кодовой фразы. Изменить?</p>
    <p>А если тебя беспокоит облако хештегов, то ты можешь переключить отображение выбрав одно из двух: Отображать or Скрыть</p>
  </div>
</template>

<script>
import { ContentTitle } from '@vue-norma/ui'

export default {
  name: 'settings',
  components: { ContentTitle },
  title() {
    return this.$t('settings.title')
  },
  computed: {},
  methods: { },
}
</script>