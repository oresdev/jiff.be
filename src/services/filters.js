
const timeFormat = (timestamp, prefomattedDate = false, hideYear = false) => {
	if (!timestamp) { return null }

  const date = typeof timestamp === 'object' ? timestamp : new Date(timestamp * 1000)
	const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

	const year = date.getFullYear()
	const month = months[date.getMonth()]
	const day = date.getDate()
	const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
	const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

  if (year > (new Date()).getFullYear() && hideYear != false) {
    hideYear = true
  }

  if (prefomattedDate) {
    return `${prefomattedDate} @ ${hours}:${minutes}`
  }

  if (hideYear) {
    return `${day} ${month} @ ${hours}:${minutes}`
  }

  return `${day} ${month} ${year} @ ${hours}:${minutes}`
}

const timeAgo = (timestamp) => {
	if (!timestamp) { return null }

  const date = typeof timestamp === 'object' ? timestamp : new Date(timestamp * 1000)
  const DAY_IN_MS = 86400000 // 24 * 60 * 60 * 1000

  const today = new Date()
  const yesterday = new Date(today - DAY_IN_MS)
  const seconds = Math.round((today - date) / 1000)
  const minutes = Math.round(seconds / 60)
  const isToday = today.toDateString() === date.toDateString()
  const isYesterday = yesterday.toDateString() === date.toDateString()
  const isThisYear = today.getFullYear() === date.getFullYear()


  if (seconds < 5) {
    return 'now';
  } else if (seconds < 60) {
    return `${ seconds } seconds ago`;
  } else if (seconds < 90) {
    return 'about a minute ago';
  } else if (minutes < 60) {
    return `${ minutes } minutes ago`;
  } else if (isToday) {
    return timeFormat(date, 'today'); // Today at 10:20
  } else if (isYesterday) {
    return timeFormat(date, 'yesterday'); // Yesterday at 10:20
  } else if (isThisYear) {
    return timeFormat(date, false, true); // 10. January at 10:20
  }

  return timeFormat(timestamp) // 10 January 2017 at 10:20
}

// ochen' mnogo kostiley
const contentFormat = (value) => {
  let
    // http://, https://, ftp://
    urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim,

    // www. sans http:// or https://
    pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim,

    // e-mail addresses
    emailAddressPattern = /[\w.+]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim,

    // new lines
    newLinesPattern = /(?:\r\n|\r|\n)/g,

    // hashtags
    tagsPatter = /<a\b[^>]*>|\B(#([^\W_][\w-]*))/gi

  return value
    .replace(tagsPatter, `<a href="?hashtag=$2" target="_self" onclick="event.preventDefault(); app.__vue__.$router.push('?hashtag=$2');">$1</a>`)
    .replace(urlPattern, `<a target="_blank" rel="nofollow" href="$&">$&</a>`)
    .replace(pseudoUrlPattern, `$1<a target="_blank" rel="nofollow" href="http://$2">$2</a>`)
    .replace(emailAddressPattern, `<a href="mailto:$&">$&</a>`)
    .replace(newLinesPattern, `<br />`)
}

const join = (value, separator) => {
	return value.join(separator)
}

const split = (value, separator, index) => {
	if (index == 0) {
		return value.split(separator)
	}
	return value.split(separator)[index]
}

export default { timeFormat, contentFormat, timeAgo, join, split }
