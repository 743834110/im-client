module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    esnextModules: ['taro-ui'],
    devServer: {
      host: '0.0.0.0',
      port: 3000,
    }
  }
}
