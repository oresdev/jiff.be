/**
 * Utils
 */
class Utils {
  /**
   * Create utils class like a pluggin
   * @param {Vue} Vue 
   */
  install(Vue, options = {}) {
    this.options = { ...this.options, ...options }
    if (!Vue.prototype.hasOwnProperty('$utils')) {
      Object.defineProperty(Vue.prototype, '$utils', { value: this })
    }
  }

  uuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
  
  cancelEvent(event) {
	  event = event || window.event
	  if (event) {
		  event = event.originalEvent || event
  
		  if (event.stopPropagation) event.stopPropagation()
		  if (event.preventDefault) event.preventDefault()
			  event.returnValue = false
			  event.cancelBubble = true
	  }
	  return false
  }
}

export default new Utils()