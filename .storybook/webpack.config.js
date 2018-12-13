const path = require('path')

module.exports = storybookConfig => {
  storybookConfig.resolve.alias['assets'] = path.resolve(__dirname, '../app/assets')
  storybookConfig.resolve.alias['~'] = path.resolve(__dirname, '../app/')

  storybookConfig.module.rules.push({
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 2
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: [
            require('autoprefixer')({
              browsers: ['IE11', 'last 2 versions'],
              grid: true
            }),
          ],
        },
      },
      {
        loader: 'sass-loader',
        options: {
          data: '@import "setting";',
          includePaths: [path.resolve(__dirname, '../app/assets/scss/')]
        }
      }
    ]
  })
  storybookConfig.module.rules.push({
    enforce: 'pre',
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    exclude: /(node_modules)|(stories)/
  })
  storybookConfig.module.rules.push({
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  })
  storybookConfig.module.rules.push({
    test: /\.svg$/,
    loader: 'svg-url-loader'
  })
  storybookConfig.module.rules.push({
    test: /\.(png|jpe?g|gif)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'img/[name].[hash:7].[ext]'
    }
  })
  storybookConfig.module.rules.push({
    test: /\.(otf|eot|ttf|woff|woff2)(\?.+)?$/,
    loader: 'url-loader'
  })

  return storybookConfig
}
