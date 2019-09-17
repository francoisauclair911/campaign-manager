module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
   // ? '/wp-content/plugins/adra-network-campaign-manager/dist/'
    ? '/wp-content/plugins/adra-network-campaign-manager/admin/dist/'

    : 'http://localhost:3232/',
 // outputDir: '../dist',
  outputDir: './dist',
  configureWebpack: {
    devServer: {
      host: 'localhost',
      disableHostCheck: true,
      watchOptions: {
        poll: true
      },
     // contentBase: '/wp-content/plugins/adra-network-campaign-manager/dist/',
      contentBase: '/wp-content/plugins/adra-network-campaign-manager/admin/dist/',
      // allowedHosts: ['wordpress-docker.test:9911'],
      allowedHosts: ['wordpress-docker.test'],
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    },
    externals: {
      jquery: 'jQuery'
    },
     output: {
    //  filename: 'js/[name].js',
      filename: 'js/[name]-admin.js',
      chunkFilename: 'js/[name]-admin.js',
    }
,  },
  css: {
    extract: {
      filename: 'css/[name]-admin.css',
      chunkFilename: 'css/[name]-admin.css'
    }
  },
};