import Vue from 'vue'
import Vuex from 'vuex'

import settings_module from '@/app/store/modules/settings'
import cache_plugin from '@/app/store/plugins/cache'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    stories: [],

    cloud: {},

    lastExport: false,
    lastImport: false,
    version: '1.1'
  },
  mutations: {
    initialiseStore(state) {
			if (localStorage.getItem('store')) {
        let store = JSON.parse(localStorage.getItem('store'))
				// replace the state object with the stored item
				this.replaceState(
					Object.assign(state, store)
				)
			}
    },
    addStory: (state, payload = {}) => {
      state.stories.push(payload)
    },
    removeStory: (state, uuid) => {
      state.stories = state.stories.filter(story => story.uuid !== uuid)
    },
    cleanStories: (state) => {
      state.stories = []
    },
    importStories: (state, payload = []) => {
      let oldUUID = state.stories.map(oldStory => {
        return oldStory.uuid
      })
      state.stories = state.stories.concat(
        payload.filter(story => {
          return oldUUID.indexOf(story.uuid) < 0
        })
      )
    },
    lastExport: (state, date) => {
      state.lastExport = date
    },
    lastImport: (state, date) => {
      state.lastImport = date
    }
  },
  actions: {
    addStory({ commit }, story) {
      commit('addStory', story)
    },
    removeStory({ commit }, uuid) {
      commit('removeStory', uuid)
    },
    cleanStories({ commit }) {
      commit('cleanStories')
    },
    importStories({ commit }, stories) {
      commit('importStories', stories)
    },

    lastExport({ commit }, date) {
      commit('lastExport', date)
    },
    lastImport({ commit }, date) {
      commit('lastImport', date)
    }
  },
  getters: {
    getStories(state) {
      return params => {
        let stories = state.stories

        let currentParams = {...params, ...{
          sort: (a, b) => b.created_at - a.created_at
        }}

        if (currentParams.sort) {
          stories = stories.sort(currentParams.sort)
        }

        if (currentParams.hashtag) {
          stories = stories.filter(s => s.hashtags.includes(`#${currentParams.hashtag}`))
        }

        return stories
      }
    },

    // https://stackoverflow.com/questions/37821172/unique-counts-in-javascript-array-sorted-by-counts
    getUsedHashtags(state) {
      let hashtags = []

      state.stories.forEach(s => {
        hashtags.push(...s.hashtags)
      })

      return hashtags.reduce((counts, name) => {
        counts[name] = (counts[name] || 0) + 1
        return counts;
      }, {})
    },

    lastExport(state) {
      return state.lastExport
    },
    lastImport(state) {
      return state.lastImport
    }

  },

  modules: [
    settings_module
  ],

  plugins: [
    cache_plugin()
  ]
})

export default store