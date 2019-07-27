import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.coffee'
import './registerServiceWorker'
import "./sass/global.sass"

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');