const express = require("express");

const iniciarRutas = (app, ruta) => {

    const extraerPrimer = url => {
        const p1 = url.substr(1);
        const sigSlash = p1.search("/");
        return (() => {
            if (sigSlash === -1) return p1;
            else return p1.substring(0, sigSlash);
        })();
    };

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        const path = req.path;
        const pathFixed = extraerPrimer(path);

        const urls = ["api", "css", "img", "js", "static"];

        const resultado = urls.filter(x => x === pathFixed);
        if (resultado.length > 0) {
            next();
        } else {
            console.log(ruta + "/dist/index.html");
            res.sendFile(ruta + "/dist/index.html");
        }
    });

    app.get("/api/animes", require("./animes/get").fun);
    app.post("/api/animes", require("./animes/create").fun);

    app.get("/api/generos", require("./generos/get").fun);

    app.get("/api/videoRecomendado/", require("./videoRecomendado/get").fun);
    app.get("/api/recomendacionSemanal/", require("./recomendacionSemanal/get").fun);

};

module.exports = (app, http) => {
    iniciarRutas(app, __dirname);
};

module.exports.iniciarRutas = iniciarRutas;