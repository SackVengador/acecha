<template lang="pug">
    div#contenedor-fb
        div#fb-root
        div.fb-comments(:data-href="url" data-width="100%" data-numposts="5")

    //
</template>

<script lang="coffee">
    import { impr } from "../variables"

    export default
        name: "fb-comments"
        props:
            path:
                type: String
                required: true
        computed:
            url: -> "https://acechanime.com" + @path
            modoColor: -> @$store.state.datos.modoColor
            esClaro: -> @modoColor is "claro"
        watch:
            url: -> @cargarFbSdk()
            modoColor: -> @cargarFbSdk()
        methods:
            ajustarNodos: ->
                contenedor = document.getElementById "contenedor-fb"

                elem1 = document.createElement "div"
                elem1.id = "fb-root"

                elem2 = document.createElement "div"
                elem2.className = "fb-comments"
                elem2.setAttribute "data-href", @url
                elem2.setAttribute "data-numposts", "5"
                elem2.setAttribute "data-width", "100%"
                elem2.setAttribute "data-order-by", "reverse_time"
                elem2.setAttribute "data-colorscheme",
                        if @esClaro then "light" else "dark"
                elem2.setAttribute "data-width", "1000"

                while contenedor.hasChildNodes()
                    contenedor.removeChild contenedor.firstChild

                contenedor.appendChild elem1
                contenedor.appendChild elem2

            cargarFbSdk: ->
                @ajustarNodos()
                `delete window.FB`
                contenedor_codigo = document.getElementById "facebook-jssdk"
                if contenedor_codigo?
                    contenedor_codigo?.parentElement?.removeChild? contenedor_codigo

                contenedor_codigo = document.createElement "script"
                contenedor_codigo.id = "facebook-jssdk"
                contenedor_codigo.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v3.0"
                document.head.appendChild contenedor_codigo

        mounted: ->
            @cargarFbSdk()




#
</script>

<style lang="sass">
    @import "../sass/variables"

    @media only screen and (max-width: 850px)
        .fb-comments, .fb-comments iframe[style], .fb-comments *
            width: 100% !important


    //
</style>