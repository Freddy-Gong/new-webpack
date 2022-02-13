module.exports = {
    ident: 'postcss',
    plugins: () => [
        require('postcss-preset-env')()
    ]
}