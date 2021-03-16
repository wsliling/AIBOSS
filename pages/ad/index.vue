<template>
	<view>
		<web-view :src="src"></web-view>
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
	var wv; //计划创建的webview
	export default {
		data() {
			return {
				src: ''
			};
		},

		onReady() {
			// #ifdef APP-PLUS
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			setTimeout(function() {
				wv = currentWebview.children()[0]
				wv.setStyle({
					scalable: true
				})
			}, 1000); //如果是页面初始化调用时，需要延时一下
			// #endif
		},
		onLoad(options) {
			this.src = options.src
		},
	}
</script>

<style lang="scss">

</style>
