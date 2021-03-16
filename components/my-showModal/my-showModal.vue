<template>
	<view>
		<uni-popup :ref='myref' type="center">
			<view :style="{'width': boxWidth+'rpx'}" class="uni-showModal-box">
				<view class="uni-my-title">
					{{ title }}
				</view>
				<view v-if="content.length" class="uni-my-content">
					{{ content }}
				</view>
				<view class="button-box">
					<view @click="cancel" class="button-item button-box-left">
						取消
					</view>
					<view @click="submit" class="button-item button-box-right">
						确定
					</view>
				</view>
			</view>
			
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: {
			myref: {
				type: String,
				default: 'ref'
			},
			title: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			boxWidth: {
				type: Number,
				default: 600
			}
		},
		data() {
			return {
				isSubmit: false
			};
		},
		methods:{
			open() {
				this.isSubmit = false
				this.$refs[this.myref].open()
			},
			close() {
				this.$refs[this.myref].close()
				this.$emit("success", this.isSubmit);
			},
			cancel() {
				this.isSubmit = false
				this.close()
			},
			submit() {
				this.isSubmit = true
				this.close()
			},
		}
	}
</script>

<style scoped lang="scss">
	view {
		box-sizing: border-box;
	}
	.uni-showModal-box {
		background-color: #FFFFFF;
		border-radius: 16upx;
	}

	.uni-my-title {
		padding: 70upx 60upx 38upx 60upx;
		text-align: center;
		min-height: 80upx;
		font-size: 36upx;
		line-height: 1.4;
		max-height: 800upx;
		overflow-y: auto;
	}

	.uni-my-content {
		padding: 30upx 50upx 10upx 50upx;
		text-align: center;
		min-height: 80upx;
		font-size: 30upx;
		line-height: 1.4;
		color: #999;
		max-height: 800upx;
		overflow-y: auto;
	}

	.button-box {
		margin-top: 54upx;
		border-top: 1upx solid #ECECEC;
		display: flex;
	}

	.button-item {
		width: 50%;
		flex-shrink: 0;
		// width: 345upx;
		height: 96upx;
		font-size: 36upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button-box-left {
		border-right: 1upx solid #ECECEC;
	}

	.button-box-right {
		color: #02D48F;
	}
</style>
