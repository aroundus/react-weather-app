const {
  override,
  addDecoratorsLegacy,
  fixBabelImports,
  addLessLoader,
  disableEsLint
} = require('customize-cra');

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),

  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),

  addLessLoader({
    lessOptions: {
      javascriptEnabled: true
    }
  })
);
