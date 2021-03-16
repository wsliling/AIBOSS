<template>
	<view>
		<view class="Header">
			<view class="leftText">
				<slot name="left"></slot>
			</view>
			<view class="rightBtn">
				<slot name="right"></slot>
			</view>
		</view>
		<slot name="mainContent"></slot>
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
	.Header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		/* height: 100upx; */
		margin: 20upx 0 20upx 0;
		background-color: #FFFFFF;
	}
	.Header .leftText{
		font-size: 36upx;
		font-weight: bold;
	}
	.Header .rightBtn{
		color: #9f9f9f;
		font-size: 34upx;
		line-height: 60upx;
	}
</style>
