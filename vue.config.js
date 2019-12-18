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
      plugins: ['vux-ui'],
      performance: {
        hints: 'warning',
        //入口起点的最大体积 整数类型（以字节为单位）
        maxEntrypointSize: 50000000,
        //生成文件的最大体积 整数类型（以字节为单位 300k）
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js');
        }
      }
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
    ? '/garbage-sort/'
    : '/'
}
