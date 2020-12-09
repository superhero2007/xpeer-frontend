const path = require('path')
const projectRoot = path.resolve(__dirname)

module.exports = {
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        '@': `${projectRoot}/src`,
        vue$: 'vue/dist/vue.esm.js'
      }
    }
  }
}
