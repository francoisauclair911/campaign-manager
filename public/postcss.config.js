const IN_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    require('tailwindcss')(),
    // require('@fullhuman/postcss-purgecss')({
    //   content: [ `./public/**/*.html`, `./src/**/*.vue` ],
    //   defaultExtractor (content) {
    //     const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
    //     return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
    //   },
    //   whitelist: ['v-select', 'custom-select'],
    //   whitelistPatterns: [ /-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/],
    // }),
    // require('autoprefixer')(),
    // require('cssnano')({
    //   preset: 'default',
    // }),
  ],
}