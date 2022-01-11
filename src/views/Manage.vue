<template>
  <div class="container-fluid">
    <content-title>{{ $t('manage.title') }}</content-title>

    <p v-html="$formatter.contentFormat($t('manage.content[0]'))"></p>
    <i18n path="manage.content[1]" tag="p">
      <a href="#" @click.prevent="exportStories">{{ $t('manage.export') }}</a>
      <a href="#" @click.prevent="cleanStories">{{ $t('manage.clean') }}</a>
      <br>
      <a href="#" @click.prevent="importStories">{{ $t('manage.import') }}</a>
    </i18n>
    <p>&nbsp;</p>

    <i18n path="manage.sync" tag="p">
      <br>
      <a href="#">{{ $t('manage.passphrase') }}</a>
      <a href="#">{{ $t('manage.sync_notes') }}</a>
    </i18n>
    <p>&nbsp;</p>

    <p v-if="lastExport">{{ $t('manage.last_export', { date: $options.filters.timeAgo(lastExport) }) }}</p>
    <input type="file" ref="importInput" hidden accept="application/json" @change="processFiles">
  </div>
</template>

<script>
import { ContentTitle } from '@vue-norma/ui'
import { mapActions } from 'vuex'

export default {
  name: 'manage',
  components: { ContentTitle },
  title() {
    return this.$t('manage.title')
  },
  computed: {
    lastExport() {
      return this.$store.getters.lastExport
    },
    lastImport() {
      return this.$store.getters.lastImport
    },
  },
  methods: {
    exportStories(e) {
      let exportDate = Math.floor(+new Date() / (1000))

      let stories = this.$store.getters.getStories(),
          dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(stories))}`,
          dataFilename = `stories.${exportDate}.json`,
          node = document.createElement('a')

      node.setAttribute('href', dataStr)
      node.setAttribute('download', dataFilename)
      document.body.appendChild(node)
      node.click()
      node.remove()

      this.$store.dispatch('lastExport', exportDate)
    },
    importStories(e) {
      this.$refs.importInput.click()
    },
    processFiles(e) {
      let importDate = Math.floor(+new Date() / (1000))

      let reader = new FileReader(),
          file = e.target.files[0] || null

      if (file.type !== 'application/json') return

      reader.onload = (event) => {
        let raw = event.target.result,
            stories = JSON.parse(raw)

        this.$store.dispatch('importStories', stories)
        this.$store.dispatch('lastImport', importDate)
      }

      if (file) {
        reader.readAsText(file)
      }

      alert('Import completed')
      this.$refs.importInput.value = null
    },
    ...mapActions([ 'cleanStories' ])
  },
}
</script>