<template lang="pug">
    ul.lista#menu-barrra-movil(:style="ancho")
        div#menu-cont
            div.ltitulo Comunidad
            li(:class="pagNosotros" @click="irA('/nosotros/')") Nosotros
            li(:class="pagCreadoresDeContenido" @click="irA('/creadores-de-contenido/')") Creadores de contenido
            // div.ltitulo Acecha Tips
            // li(:class="pagComprarDesdeJapon" @click="irA('/comprar-desde-japon/')") Comprar desde Japón
            // li(:class="pagComprarAnime" @click="irA('/comprar-anime/')") Comprar anime
            // li(:class="pagLeerManga" @click="irA('/leer-manga/')") Leer Manga
            div.ltitulo Mi experiencia
            li(:class="pagAcechaTv" @click="irA('/acecha-tv/')") Acecha TV
            li(:class="pagAcechaPremium" @click="irA('/acecha-premium/')") Acecha Premium
            li(:class="pagCalendario" @click="irA('/calendario/')") Calendario
            div.ltitulo Yo
            // li(:class="pagMiCuenta" @click="irA('/mi-cuenta/')") Mi cuenta
            li(:class="pagAjustes" @click="irA('/mi-cuenta/')") Ajustes

    //
</template>

<script lang="coffee">

    export default
        name: "lista-items"
        data: ->
            elem: null
        props:
            mostrar:
                type: Boolean
                required: true
            cambiarEstadoMenu:
                type: Function
                required: true
        computed:
            ancho: ->
                if @elem?
                    if @mostrar
                        res = parseInt((window.innerHeight - 100) * 0.9)
                        "max-height: #{res}px;"
                    else "max-height: 0"
                else "/* -- */"
            pagAjustes: -> if @$route.path is "/ajustes/" then 'item-activo' else ''
            pagMiCuenta: -> if @$route.path is "/mi-cuenta/" then 'item-activo' else ''
            pagAcechaTv: -> if @$route.path is "/acecha-tv/" then 'item-activo' else ''
            pagAcechaPremium: -> if @$route.path is "/acecha-premium/" then 'item-activo' else ''
            pagCalendario: -> if @$route.path is "/calendario/" then 'item-activo' else ''
            pagComprarDesdeJapon: -> if @$route.path is "/comprar-desde-japon/" then 'item-activo' else ''
            pagComprarAnime: -> if @$route.path is "/comprar-anime/" then 'item-activo' else ''
            pagLeerManga: -> if @$route.path is "/leer-manga/" then 'item-activo' else ''
            pagNosotros: -> if @$route.path is "/nosotros/" then 'item-activo' else ''
            pagCreadoresDeContenido: -> if @$route.path is "/creadores-de-contenido/" then 'item-activo' else ''
            pagAjustes: -> if @$route.path is "/ajustes/" then 'item-activo' else ''
        methods:
            irA: (link) ->
                @cambiarEstadoMenu()
                @$router.push link
        mounted: ->
            vm = this
            intervalo = setInterval (=>
                vm.elem = document.getElementById "menu-barrra-movil"
                if vm.elem? then clearInterval intervalo
            ), 250

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    #menu-barrra-movil
        max-height: 0


    .item-activo
        color: $colorPrincipal
        background-color: rgba(233, 30, 99, 0.25)
        border-radius: 0 17px 17px 0

    .lista
        list-style-type: none
        overflow-y: scroll
        transition: max-height 250ms ease-in-out

    #menu-cont li
        padding: 7px 15px
        margin-right: 5px

    .ltitulo
        // text-transform: uppercase
        opacity: 0.6
        font:
            family: "Product Sans", Roboto, sans-serif
            size: medium
        padding-top: 12px
        padding-bottom: 5px
        padding-left: 10px

    .lseparador
        height: 8px

    //
</style>