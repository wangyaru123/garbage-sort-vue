const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pluginOptions: {
    moment: {
      locales: [
        'zh-cn'
      ]
    }
  },
  // devServer: {
  //   proxy: {
  //     '/box-service-maintain': {
  //       target: 'http://192.168.0.233:8390',
  //       changeOrigin: true
  //     }
  //   }
  // },
  // vux 相关配置,使用vux-ui
  configureWebpack: config => {
    require('vux-loader').merge(config, {
      options: {},
      plugins: ['vux-ui']
    })
  },
  // 配置svg图标
  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  // 主要用于部署，以子模块的形式部署，路由：/sensor-setting
  publicPath: process.env.NODE_ENV === 'production'
    ? '/garbage-sort-vue/'
    : '/'
}
