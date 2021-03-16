import Vue from 'vue'
import App from './App'
import store from './store'
import '@/common/js/filters'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
