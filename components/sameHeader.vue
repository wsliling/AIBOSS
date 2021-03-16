<template>
	<view>
		<view class="Type fwbig fs-20">
			{{ typetext }}
		</view>
		<view v-if="headertext" class="topheader">
			<text class="text fs-20">{{ headertext }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			typetext: {
				type: String
			},
			headertext: {
				type:String
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.Type{
	width: 690upx;
	margin: 30upx auto 0 auto;
	background-color: #f6f5fa;
	box-sizing: border-box;
	padding: 30upx;
}
.fwbig{
	font-weight: bold;
}
.topheader{
	height: 110upx;
	width: 690upx;
	margin: 0 auto;
	display: flex;
	align-items: center;
}
.topheader .text{
	display: inline-block;
	border: 1px solid #02d48f;
	padding: 10upx 0;
	width: 125upx;
	border-radius: 10upx;
	color: #02d48f;
	text-align: center;
}
</style>
