<template>
	<view>
		<web-view :webview-styles="style" @message="getMessage" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:""
			};
		},
		onShow() {
			let userId = uni.getStorageSync('userId')
			let token = uni.getStorageSync('token')
			this.url=`http://app.bide.world/cust/visitor_h5.html?api=http://api.bide.world&Type=1&UserId=${userId}&Token=${token}`
		}
	}
</script>

<style lang="scss">

</style>
