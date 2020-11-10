import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    stories: [],
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
          stories = stories.filter(s => s.content.search(`#${currentParams.hashtag}`) != -1)
        }

        return stories
      }
    }
  }
})

// write to localstorage by subscribe hook
store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state))
})

export default store