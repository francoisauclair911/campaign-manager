module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    //  ? '/wp-content/plugins/adra-network-campaign-manager/dist/'
    ? '/wp-content/plugins/adra-network-campaign-manager/public/dist/'

    : 'http://localhost:2323/',
  //outputDir: '../dist',
  outputDir: './dist',
  configureWebpack: {
    devServer: {
      host: 'localhost',
      // https: true,
      disableHostCheck: true,
      watchOptions: {
        poll: true
      },
      //  contentBase: '/wp-content/plugins/adra-network-campaign-manager/dist/',
      contentBase: '/wp-content/plugins/adra-network-campaign-manager/public/dist/',

      // allowedHosts: ['wordpress-docker.test:9911'],
      allowedHosts: ['wp-dev.loc'],
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    },
    externals: {
      jquery: 'jQuery'
    },
    output: {
      //  filename: 'js/[name].js',
      filename: 'js/[name]-public.js',
      chunkFilename: 'js/[name]-public.js',
    },
  },
  css: {
    extract: {
      filename: 'css/[name]-public.css',
      chunkFilename: 'css/[name]-public.css'
    }
  },
}