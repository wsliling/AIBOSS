<template>
	<view class="menu">
			<view class="big-menu-item" v-for="item in  menuList" :key="item.id">
				<view  @click="goPage(item.Url)"  class="menu-item ">
					<view class="img">
						<image :src="item.Logo" mode="widthFix"></image>
					</view>
					<view class="text fs-18">{{ item.Title }}</view>
				</view>
			</view>
	</view>
</template>

<script>
	import {
		post,
		get,
		navigate,
		switchTab,
		judgeLogin,
		toast,
		trim,
	} from '@/common/utils/index.js';
	export default {
		props: {
			menuList: {
				type: Array,
				default: []
			},
			isNeedCheck: {
				type: Boolean,
				default: false
			}
		},
		methods:{
			goPage(url){
				console.log('跳转到:'+url)
				let obj = {
					src: url
				}
				if(!url) return
				// console.log(url)
				navigate('ad/index',obj)
			},
		}
	}
</script>

<style scoped>
	@import '~@/pages/selectCurrency/style.css';
</style>
