/**
 * Formatter
 */
class Formatter {

  // Ух регулярочки мои регулярочки
  _regs = {
    // http://, https://, ftp://
    url: /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim,

    // www. sans http:// or https://
    pseudoUrl: /(^|[^\/])(www\.[\S]+(\b|$))/gim,

    // e-mail addresses
    emailAddress: /[\w.+]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim,

    // new lines
    newLines: /(?:\r\n|\r|\n)/g,

    // hashtags
    hashtags: /<a\b[^>]*>|\B(#([^\W_][\w-]*))/gi,
  }

  /**
   * Create formatter class like a pluggin
   * @param {Vue} Vue 
   */
  install(Vue, options = {}) {
    this.options = { ...this.options, ...options }
    if (!Vue.prototype.hasOwnProperty('$formatter')) {
      Object.defineProperty(Vue.prototype, '$formatter', { value: this })
    }
  }

  contentFormat(value) {
    return value
      .replace(this._regs.hashtags, `<a href="?hashtag=$2" target="_self" onclick="event.preventDefault(); app.__vue__.$router.push('?hashtag=$2');">$1</a>`)
      .replace(this._regs.url, `<a target="_blank" rel="nofollow" href="$&">$&</a>`)
      .replace(this._regs.pseudoUrl, `$1<a target="_blank" rel="nofollow" href="http://$2">$2</a>`)
      .replace(this._regs.emailAddress, `<a href="mailto:$&">$&</a>`)
      .replace(this._regs.newLines, `<br />`)
  }

  extractHashtags(value) {
    let hashtags = value.match(this._regs.hashtags) || []

    return hashtags.filter((item, pos) => {
      return hashtags.indexOf(item) == pos
    })
  }

  extractUrls(value) {
    let urls = value.match(this._regs.url) || []

    return urls.filter((item, pos) => {
      return urls.indexOf(item) == pos
    })
  }
}

export default new Formatter()