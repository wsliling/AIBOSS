import Vue from 'vue'
import App from './App'
import store from './store'
import '@/common/js/filters'
import G_show_modal from './components/G_show_modal/g_show_modal.js'
Vue.use(G_show_modal)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
