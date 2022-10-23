/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    '@antfu',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
}
