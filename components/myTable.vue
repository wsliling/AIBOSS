<template>
	<view class="main">
		<view class="header-top">
			<view class="header-left">
				<view class="header-left-img">
					<slot name="img"></slot>
				</view>
				<view class="header-left-text">
					<view class="left-text-top">
						<slot name="userName"></slot>
					</view>
					<view class="left-text-bottom">
						<slot name="UserId"></slot>
					</view>
				</view>
			</view>
			<view class="header-right">
				<view class="right-top">
					<slot name="Icon"></slot>
				</view>
				<view class="right-bottom">
					<slot name="Time"></slot>
				</view>
			</view>
		</view>
		<view class="main-content">
			<slot name="content"></slot>
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
	.main{
		width: 100%;
		background-color: #FFFFFF;
	}
	.main .header-top{
		width: 690upx;
		height: 140upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #ececec;
	}
	.main .header-top .header-left{
		display: flex;
	}
	.main .header-top .header-left .header-left-text{
		margin-left: 20upx;
	}
	.main .header-top .header-left .header-left-text .left-text-top{
		font-size: 34upx;
	}
	.main .header-top .header-left .header-left-text .left-text-bottom{
		font-size: 24upx;
	}
	.main .header-top .header-right{
		text-align: right;
		font-size: 20upx;
	}
	.main .header-top .header-right .right-bottom{
		color: #b3b3b3;
	}
	.main .main-content{
		width: 100%;
	}
</style>
