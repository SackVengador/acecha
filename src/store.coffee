import Vue from 'vue'
import Vuex from 'vuex'

Vue.use Vuex

export default new Vuex.Store
    state:
        listaAnimes: []
        listaGeneros: []
        recomendacionSemanal: ""
        paginaLista: no
        modoAdmin: no
        animeAdmin:
            nombre: "Nombre"
            alternativo: [
                "Otros nombres"
            ]
            ruta: "/ruta-del-anime/"
            sinopsis: "Sinopsis del anime"
            generos: []
            episodios: 12
            temporada: "Invierno"
            anio: 2019
            estudio: "A-1 Pictures"
            fuente: "Manga"
            emision: "01/01/2019"
            culminacion: "30/03/2019"
            mal: "https://myanimelist.net/"
            en_emision: yes
            img_portada: "ejm"
            img_fondo: "/img/you-kei.jpg"
            img_nuevoEp: "nuevo ep"
            id_temporada_ant: null
            id_temporada_sig: null
            num_temporada: 1
    mutations:
        cambiarListaAnimes: (state, data) ->
            state.listaAnimes = data
        cambiarRecomendacionSemanal: (state, nuevo) ->
            state.recomendacionSemanal = nuevo
        terminarCargaPagina: (state) ->
            state.paginaLista = yes
        cambiarAModoAdmin: (state) ->
            state.modoAdmin = yes
        cambiarAnimeAdmin_alternativo: (state, arr) ->
            state.animeAdmin.alternativo = arr
        cambiarListaGeneros: (state, nuevo) ->
            state.listaGeneros = nuevo
    actions: {}
