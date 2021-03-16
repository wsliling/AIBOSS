<template>
	<view>
		<view class="btns">
			<view class="logo">
				<image class="logoimg" src="@/static/logo.png" mode="widthFix"></image>
			</view>
			<view class="btn btn_1" @click="dowmapp(0)">
				Android版下载
			</view>
			<!-- <view class="btn btn_2" @click="dowmapp(1)">
				Ios版下载
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			dowmapp(type){
				if(type==0){
					// #ifdef APP-PLUS
					plus.runtime.openURL("http://web.aiboss.club/down/android.apk")
					// #endif
					// #ifdef H5
					window.location.href='http://web.aiboss.club/down/android.apk'
					// #endif
				}else{
					// window.location.href='https://www.gscapp.cn/app/danceone'
					uni.showToast({
						title:"请在App Store中下载！",
						icon:"none"
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.btns{
	padding: 60upx;
	.logoimg{
		display: block;
		width: 200upx;
		height: 200upx;
		border-radius: 46upx;
		margin: 0 auto 60upx;
	}
	.btn{
		height: 90upx;
		width: 100%;
		border-radius: 12upx;
		background: $primary;
		color: #fff;
		font-size: 32upx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 40upx;
		&.btn_2{
			color: $primary;
			border: 1px solid $primary;
			background-color: #fff;
		}
	}
}
</style>
