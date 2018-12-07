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

        config.module.rules
          .filter(rule => rule.test.toString().includes('svg'))
          .forEach(rule => {
            rule.test = /\.(png|jpe?g|gif)$/
          })

        config.module.rules.push({
          test: /\.svg$/,
          loader: 'svg-url-loader'
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
