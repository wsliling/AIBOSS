import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		address:'',
		leixing:'',
		CurrencyGroupIds: '', //自定义套餐里的币种
		dealList: [] ,//搜索页面选择了哪些币种
		websocketList:[],// 实时列表
		cnyrate:6.5,//人民币汇率
	},
	getters: {
		getToken(state) {
			if (!state.token && wx.getStorageSync('token')) {
				state.token = wx.getStorageSync('token')
			}
			return state.token 
		},
		getUserId(state) {
			if (!state.userId && wx.getStorageSync('userId')) {
				state.userId = wx.getStorageSync('userId')
			}
			return state.userId
		},
	},
	mutations: {
		/**
		 * 在main.js例引入
		 * import store from './store/index'
		 * 把store挂载到全局
		 * Vue.prototype.$store = store;
		 */

		/**
		 * 这里设置一个统一的方法,大部分用的vuex都是简单的改变一些状态,不需要写过多的mutations
		 * 使用方法 例:
		 * this.$store.update({"cityName":"北京"})
		 * this.$store.commit('update',{"cityName":"北京"})
		 * 
		 *  config需要传入对象
		 * @param {*} state 
		 * @param {*Object} config 
		 */
		updateDealList(state,data){
			state.dealList = data
		},
		updateCurrencyGroupId(state, data){
			state.CurrencyGroupIds = data
		},
		update(state, config) {
			Object.keys(config).map((item, key) => {
				state[item] = config[item]
			})
		},
		exchangerate(state,data){
			state.cnyrate = data
		}

	} 

})
