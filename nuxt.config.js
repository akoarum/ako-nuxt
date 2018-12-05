const env = process.env.NODE_ENV || 'dev'
const config = require(`./config/${env}.env.js`)

export default {
  env: config,
  srcDir: './app',
  css: ['ress'],
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
    }
  },
  modules: [
    'nuxt-sass-resources-loader',
    [
      '@/assets/scss/setting.scss'
    ]
  ]
}
