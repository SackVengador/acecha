con = require("../db").con
import { crearRespuesta, crearError } from "../ResStd"

export fun = (req, res) =>
    sql = "SELECT * FROM generos ORDER BY nombre ASC"

    con.query sql
        .then (respuesta) =>
            res.status(200).json crearRespuesta respuesta.rows
        .catch (err) =>
            res.status(500).json (
                crearError (__dirname + "/get"), "Error al ejecutar consulta.\n#{err.stack}"
            )
