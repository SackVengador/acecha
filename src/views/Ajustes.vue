<template lang="pug">
    div.ajustes.contenedor
        div.separador
        h1.titulo Ajustes
        div.contenedor-ajuste
            div.modo-color(@click="cambiarColor")
                div.ajuste
                    div.titulo-ajuste Modo Oscuro
                    // div.etiqueta-ajuste El modo oscuro está {{ etiquetaModoColor }}activado
                div.ajuste-switch
                    div
                        label.cl-switch.cl-switch-red
                            input(type="checkbox" :checked="$store.state.datos.modoColor !== 'claro'")
                            span.switcher(@click.prevent.stop="cambiarColor")
            div.adicional Al cambiar el modo se reinician los comentarios de Facebook.

        modo-color-oscuro
        modo-color-automatico
        mostrar-version(v-if="!esBeta")

        // div.contenedor-ajuste
            div.titulo-ajuste Mas ajustes
            div.etiqueta-ajuste Muy pronto...

        credito

    //
</template>

<script lang="coffee">
    import modoColorOscuro from "../components/Ajustes/modo-color-oscuro.vue"
    import modoColorAutomatico from "../components/Ajustes/modo-color-automatico.vue"
    import mostrarVersion from "../components/Ajustes/mostrar-version.vue"
    import credito from "../components/Ajustes/credito.vue"
    import { cambiarColor } from "../components/App/ModoColor.coffee"

    export default
        name: "Ajustes"
        metaInfo:
            title: "Ajustes"
        components: { modoColorOscuro, modoColorAutomatico, credito, mostrarVersion }
        data: ->
            esBeta: (window.location.hostname.search "beta") != -1
        computed:
            mmodoColor: -> @$store.state.datos.modoColor
            etiquetaModoColor: -> if @mmodoColor is "claro" then "des" else ""
        methods:
            cambiarColor: ->
                storeFn = @$store.commit
                cambiarColor { storeFn }
    
#
</script>

<style lang="sass">
    @import "../sass/variables"

    .adicional
        font-size: 0.75rem
        opacity: 0.85
        padding-left: 10px
        position: relative
        &:before
            content: "*"
            position: absolute
            left: 0


    .contenedor-ajuste
        padding: 0.65rem 0


    .modo-color
        display: grid
        grid-template-columns: auto 40px
        cursor: pointer
        user-select: none


    .titulo-ajuste
        padding: 0.5rem 0
        font:
            family: "Product Sans", Roboto, sans-serif
            weight: bold
            size: 1rem


    .etiqueta-ajuste
        font-size: 0.9rem


    .ajuste-switch
        display: table
        height: 100%
        div
            display: table-cell
            vertical-align: middle


    .ajustes
        color: var(--texto1)

    .titulo
        font:
            family: "Product Sans", Roboto, sans-serif
        padding: 25px 0

    //
</style>