module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.coffee$/,
                    loader: 'coffee-loader',
                }
            ]
        }
    },
    pluginOptions: {
      express: {
        shouldServeApp: true,
        serverDir: './srv'
      }
    },
    pages: {
        index: {
            entry: "src/main.js",
            title: "Acechanime | Anime online HD sub español",
            template: "public/index.html"
        },
        admin: {
            entry: "admin/main.js",
            title: "Administración",
            template: "public/index.html"
        }
    },
    productionSourceMap: false
};
