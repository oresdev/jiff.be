const webpack = require('webpack')
const fs = require('fs')
const version = JSON.parse(fs.readFileSync('./package.json')).version || 0

module.exports = {
  productionSourceMap: false,

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PACKAGE_VERSION: "'" + version + "'"
        }
      })
    ]
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  pwa: {
    name: 'jiff.be',
    themeColor: '#fcfcfc',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    manifestOptions: {
      icons: [
        { 'src': 'icons/android-chrome-192x192.png', 'sizes': '192x192', 'type': 'image/png' },
        { 'src': 'icons/android-chrome-512x512.png', 'sizes': '512x512', 'type': 'image/png' }
      ],
    },
    iconPaths: {
      favicon32: 'icons/favicon-32x32.png',
      favicon16: 'icons/favicon-16x16.png',
      appleTouchIcon: 'icons/apple-touch-icon.png',
      maskIcon: 'icons/safari-pinned-tab.svg',
      msTileImage: 'icons/mstile-144x144.png'
    }
  }
}
