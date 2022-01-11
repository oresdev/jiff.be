export default (options) => store => {
  let prefix = typeof options !== 'undefined' ? options.prefix : 'app'

  // write to localstorage by subscribe hook
  store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state))
  })
}
