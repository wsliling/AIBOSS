<template>
	<view >
		<view class="main">
			<slot name="mainBox"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
	.top{
		width: 100%;
		height: 30upx;
		border-left: 5px solid #02d48f;
		font-size: 30upx;
		line-height: 30upx;
		font-weight: 600;
		box-sizing: border-box;
		padding-left: 20upx;
	}
	.main{
		box-sizing: border-box;
		padding: 0 20upx;
	}
</style>
