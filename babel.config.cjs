const isJest = (process.env.NODE_ENV === 'test');

module.exports = {
    "presets": [
        ["@babel/preset-env", {
            targets: {
                chrome: 97 // https://caniuse.com/?search=es2022
            }
        }],
        "@babel/preset-typescript",
        "@babel/preset-react"
    ],
    "plugins": [
        isJest && '@babel/transform-modules-commonjs'
    ].filter(Boolean)
};
