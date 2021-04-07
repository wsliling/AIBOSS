<template>
	<view class="uni_topbar stickyed" :style="style">
		<view class="my-inner inner flexbox flex_alignc" :class="[fixed ? 'fixed' : '']" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px', 'color': titleTintColor}, bgColor]">
			<!-- 返回 -->
			<!-- <text class="uni_icoBack iconfont icon-arrL" v-if="isBack" @tap="goBack"></text> -->
			<!-- <view class="my-back" v-if="isBack" @tap="goBack"> -->
			<view class="my-back" v-if="isBack" :style="{'color': titleTintColor}">
				<slot name="back"></slot>
			</view>
			<slot name="headerL"></slot>
			<!-- 标题 -->
			<!-- #ifndef MP -->
			<!-- <view class="flex1" v-if="!search && center"></view> -->
			<view class="flex1" v-if="search && center"></view>
			<!-- #endif -->
			<view class="uni_title flex1" :class="[center ? 'uni_titleCenter' : '']" :style="[isBack ? {'font-size': '16px', 'padding-left': '0','color': titleTintColor} : '']"
			 v-if="!search && title">
				{{title}}
			</view>
			<view class="uni_search flex1" :class="[searchRadius ? 'uni_searchRadius' : '']" v-if="search"> />
				<input class="uni_searchIpt flex1" type="text" placeholder="搜索" placeholder-style="color: rgba(255,255,255,.5);" />
			</view>
			<!-- 右侧 -->
			<view class="uni_headerRight flex flex_row flex_alignc">
				<slot name="iconfont"></slot>
				<slot name="string"></slot>
				<slot name="image"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarH: this.statusBar,
				customBarH: this.customBar
			}
		},
		/***　　isBack              是否返回按钮
		　　title               标题
		　　titleTintColor      标题颜色
		　　bgColor             背景
		　　center              标题居中
		　　search              搜索条
		　　searchRadius        圆形搜索条
		　　fixed               是否固定*/
		props: {
			isBack: {
				type: [Boolean, String],
				default: true
			},
			title: {
				type: String,
				default: ''
			},
			titleTintColor: {
				type: String,
				default: '#fff'
			},
			// bgColor: Object,
			bgColor: {
				'background': 'linear-gradient(90deg, #02D48E, #17B580)',
			},
			center: {
				type: [Boolean, String],
				default: false
			},
			search: {
				type: [Boolean, String],
				default: false
			},
			searchRadius: {
				type: [Boolean, String],
				default: false
			},
			fixed: {
				type: [Boolean, String],
				default: false
			}
		},
		computed: {
			style() {
				let _style = `height: ${this.customBarH}px;`
				return _style
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
		color: #000;
	}

	.flexbox {
		display: flex;
		justify-content: space-between;
		// padding: 0upx 10px 0upx 10px;
		padding: 0upx 20px 0upx 10px;
	}

	.flex {
		display: flex;
	}

	.flex_alignc {
		align-items: center;
	}

	.fixed {
		position: fixed;
	}
	.stickyed{
		position: sticky;
		left: 0;
		top: 0;
		z-index: 99;
	}

	.flex_row {
		display: flex;
		flex-direction: row;

	}

	.uni_headerRight,
	.my-back {
		flex-shrink: 0;
	}

	.my-back {
		font-size: 27px;
	}
	
	.my-inner {
		position: relative;
	}
	.uni_titleCenter {
		// flex: 1;
		position: absolute;
		right: 50%;
		// top: 50%;
		transform: translateX(50%);
		// bottom: 35upx;
		// transform: translate(50%,-50%);
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.uni_titleCenter {
		text-align: center;
		font-weight: 600;
	}
</style>
