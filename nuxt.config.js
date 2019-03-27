const env = process.env.NODE_ENV

let apiUrl
switch (env) {
  case 'local':
    apiUrl = 'http://localhost:3333'
    break
  case 'dev':
  default:
    apiUrl = ''
    break
  case 'staging':
    apiUrl = ''
    break
  case 'prod':
    apiUrl = ''
    break
}

module.exports = {
  mode: 'spa',

  rootDir: './src',

  head: {
    title: 'サイト名',
    titleTemplate: '%s | サイト名',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#fff' },

  css: [
    '~/assets/scss/_normalize.scss'
  ],

  plugins: [
    '~/plugins/axios',
    // '~/plugins/routerSync'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  axios: {
    baseURL: apiUrl
  },

  styleResources: {
    sass: [
      '~/assets/scss/_setting.scss',
      '~/assets/scss/_mixin.scss'
    ]
  },

  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  generate: {
    dir: '../dist'
  }
}
