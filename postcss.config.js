module.exports = {
  plugins: [
    require('autoprefixer')({
      "browsers": [
        "> 1%",
        "last 6 versions",
        "not ie <= 8"
      ]
    })
  ]
}