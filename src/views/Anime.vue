<template lang="pug">
    div.an
        template(v-if="animeExiste")
            imagen-anime(:nombre="animeObj.info.nombre || ''" :img="animeObj.imagenes.fondo || ''")
            main.cont.contenedor(v-show="!$store.state.verAnime.verAnimeActivo")
                div
                    div.contImg
                        img.imagen(:src="animeObj.imagenes.portada")
                        figcaption.estado(:style="colorEtiqueta") {{ animeObj.emision.en_emision? 'en emision': 'finalizado' }}
                            span.icon-check-box
                    redes-sociales
                    info(:animeObj="animeObj")
                    mal(:url="animeObj.info.mal? animeObj.info.mal: 'err'" v-if="!esMovil")
                    twitter(v-if="!esMovil")
                    template(v-if="esMovil")
                        br
                        br
                div
                    article.sinopsis
                        div.tit Sinopsis
                        p.txt {{ animeObj.info.sinopsis }}
                        generos(:generos="animeObj.info.generos")
                        // span.generos(v-for="g in animeObj.generos")  {{ $store.state.listaGeneros.find(x => x.genero_id === g).nombre }}

                    temporadas(:anime="animeObj")
                    lista-de-episodios(:anime="animeObj")

            router-view
            div.contenedor.contenedor_comentarios
                comentarios
            br
        div(v-else)
            div.separador
            en-construccion(titulo="Esta página no existe"
                texto="Vuelve al inicio para ver nuestros animes disponibles."
            )


    //
</template>

<script lang="coffee">
    import imagenAnime from "../components/Anime/imagen-anime.vue"
    import info from "../components/Anime/info.vue"
    import mal from "../components/Anime/mal.vue"
    import twitter from "../components/Anime/twitter.vue"
    import generos from "../components/Anime/generos.vue"
    import temporadas from "../components/Anime/temporadas.vue"
    import listaDeEpisodios from "../components/Anime/lista-de-episodios.vue"
    import comentarios from "../components/Anime/comentarios.vue"
    import redesSociales from "../components/Anime/redes-sociales.vue"
    import store, { listaAnimesCargada } from "../store/store.coffee"
    import EnConstruccion from "./EnConstruccion.vue"
    import {impr} from "../variables"

    export default
        name: "Anime"
        metaInfo: ->
            title: if @animeObj?.info?.nombre? then @animeObj.info.nombre else "404"
        components:
            "imagen-anime": imagenAnime
            "redes-sociales": redesSociales
            "info": info
            "mal": mal
            "twitter": twitter
            "temporadas": temporadas
            "lista-de-episodios": listaDeEpisodios
            "comentarios": comentarios
            "generos": generos
            "en-construccion": EnConstruccion
        data: ->
            animeProv: {imagenes: {}}
            animeExiste: false
            esMovil: window.innerWidth < 600
        computed:
            colorEtiqueta: ->
                if @animeObj.emision.en_emision then "background: #01bc59" else "background: #ff0241"
            animeAdmin: ->
                @$store.state.animeAdmin.animeAdmin
            animeObj:
                get: -> @animeProv
                set: (a) -> @animeProv = a
        methods:
            inicializarAnimeObj: (animeExiste = false) ->
                @$store.commit "terminarCargaPagina"
                @animeExiste = animeExiste

            cambiarAnime: (obj) ->
                @animeObj = obj

        beforeRouteEnter: (to, from, next) ->
            ruta =
                if /\/(ep|ova)\d+$/.test to.path
                    partes = to.path.split "/"
                    if partes[0] is "" then partes[1]
                    else partes[0]
                else (to.path.split "/")[1]

            if to.params.animeObj?
                next (vm) -> vm.inicializarAnimeObj true
            else
                nombreRuta = "/#{ruta}/"
                await listaAnimesCargada
                anime = store.state.datos.listaAnimes?.find (a) -> a.info.ruta == nombreRuta
                if anime?
                    to.params.animeObj = anime
                    next (vm) -> vm.inicializarAnimeObj true
                else
                    console.error "No se encontró un anime con ruta `#{nombreRuta}`"
                    next (vm) -> vm.inicializarAnimeObj false
        beforeRouteUpdate: (to, from, next) ->
            if /\/(ep|ova)\d+$/.test to.path
                next()
            else if to.params.animeObj?
                @cambiarAnime to.params.animeObj
                next()
            else
                nombreRuta = to.path
                await listaAnimesCargada
                anime = store.state.datos.listaAnimes?.find (a) -> a.info.ruta == nombreRuta
                if anime?
                    @cambiarAnime anime
                    next()
                else
                    console.error "No se encontró un anime con ruta `#{nombreRuta}``"
                    @inicializarAnimeObj true
                    next()

        created: ->
            unless @$route?.params?.animeObj?
                nombreRuta = @$route.path
                await listaAnimesCargada
                anime = store.state.listaAnimes?.find (a) -> a.info.ruta == nombreRuta
                unless anime?
                    @animeExiste = no
            else
                @animeObj = @$route.params.animeObj

    #
</script>

<style scoped lang="sass">
    @import "../sass/variables"

    .an
        background-color: var(--fondo1)

    .cont
        position: relative
        margin-top: -150px
        grid-template-columns: 250px 1fr
        display: grid
        grid-gap: 2.5rem


    .contenedor_comentarios
        @extend %caja-textos


    .contImg
        position: relative
        .imagen
            width: 100%

    .estado
        box-shadow: 0 0 15px 0 rgba(0,0,0,0.5)
        color: white
        cursor: pointer
        text-align: center
        text-transform: uppercase
        font:
            size: 1.1rem
            weight: 700
            family: $titulos
        padding: .5rem 0
        position: absolute
        top: calc(100% - 22px)
        left: 0
        right: 0
        width: 95%
        margin: auto
        z-index: 1
        border-radius: 3px
        display: block
        transition: opacity 300ms ease-in-out
        &:hover
            opacity: 0.9

    .sinopsis
        @extend %caja-textos
        background-color: var(--fondo2)
        .tit
            line-height: 1.3
            font:
                weight: 600
                family: $titulos
                size: 1.8rem
            color: var(--texto1)
            padding-bottom: .3em
        .txt
            @extend %textosGris
            margin-bottom: 1.25rem
            line-height: 1.6
        .generos
            color: var(--texto1)

    @media only screen and (max-width: 850px)
        .contenedor_comentarios
            padding: 0.5rem


    @media only screen and (max-width: 500px)
        .cont
            grid-template-columns: initial
            grid-gap: 0

    //
</style>