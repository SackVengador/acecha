<template lang="pug">
    div.contenedor-ajuste
        div.color-modo-oscuro(@click="alternarSelector")
            div.ajuste
                div.titulo-ajuste.titulo-modo-color
                    span Tono del Modo Oscuro
                    i.material-icons {{ textoIconoSelector }}

        div.selector(v-if="selectorAbierto")

            div#color_oscuro.color_demo(:class="modoOscuroActivo? 'color_activo': ''"
                @click="establecerEsquema('oscuro')")
                | Normal

            div#color_gris.color_demo(:class="modoGrisActivo? 'color_activo': ''"
                @click="establecerEsquema('gris')")
                | Gris

            div#color_negro.color_demo(:class="modoNegroActivo? 'color_activo': ''"
                @click="establecerEsquema('negro')")
                | Amoled

            div#color_azul_oscuro.color_demo(:class="modoAzulOscuroActivo? 'color_activo': ''"
                @click="establecerEsquema('azulOscuro')")
                | Azul oscuro

        // div.adicional Este tono se guarda solo en este navegador.

    //
</template>

<script lang="coffee">
    import { cambiarModoColorOscuro, cambiarEsquema } from "../App/ModoColor.coffee"

    export default
        name: "modo-color-oscuro"
        data: ->
            modoColorOscuro: localStorage?.getItem "modo-color-oscuro"
            selectorAbierto: false
            textoIconoSelector: "keyboard_arrow_down"
        computed:
            modoOscuroActivo: -> @modoColorOscuro is "oscuro"
            modoGrisActivo: -> @modoColorOscuro is "gris"
            modoNegroActivo: -> @modoColorOscuro is "negro"
            modoAzulOscuroActivo: -> @modoColorOscuro is "azulOscuro"
            estiloSelector: -> if @selectorAbierto then "display: block;" else ""
        methods:
            establecerEsquema: (modo) ->
                cambiarEsquema modo, @$store.commit
                cambiarModoColorOscuro modo
                @modoColorOscuro = modo

            alternarSelector: ->
                [@selectorAbierto, @textoIconoSelector] =
                    if @selectorAbierto
                        [false, "keyboard_arrow_down"]
                    else
                        [true, "keyboard_arrow_up"]

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .selector
        padding-left: 10px
        border-left: solid 1px gray


    .titulo-modo-color
        position: relative

        i
            position: absolute
            right: 0
            font-size: 1.5rem


    .color-modo-oscuro
        cursor: pointer
        user-select: none


    .texto_activo
        font:
            family: "Product Sans", Roboto, sans-serif
            size: larger
        &:before
            content: "Activo: "

    .color_activo
        border: none !important

    .color_demo
        padding: 0.5rem 0.25rem
        text-align: center
        font:
            family: "Product Sans", Roboto, sans-serif
            size: 1rem
        border-radius: 26px
        cursor: pointer
        margin-bottom: 1rem

    %bordeBlanco
        border: solid 1px white

    #color_claro
        background-color: white
        color: #3A3A3A
        border: solid 1px white


    #color_oscuro
        @extend %bordeBlanco
        background-color: #101010
        color: #e8e8e1


    #color_gris
        @extend %bordeBlanco
        background-color: #1a2329
        color: #e8e8e1


    #color_negro
        @extend %bordeBlanco
        background-color: black
        color: #e8e8e1


    #color_azul_oscuro
        @extend %bordeBlanco
        background-color: #080911
        color: #e8e8e1


    h2
        font:
            family: "Product Sans", Roboto, sans-serif
            weight: normal
        padding: 20px 0
        text-decoration: underline

    //
</style>