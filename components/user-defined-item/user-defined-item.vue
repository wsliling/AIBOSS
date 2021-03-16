<template>
	<view>
		<!-- type: 1 请选择-->
		<view v-if="type == 1" class="item">
			<view class="item-left fs-18">
				{{ lable }}
				<!-- {{ list[currentIndex] != undefined ? list[currentIndex].lable : lable }} -->
			</view>
			<view @click="openPop()" class="item-right fs-18">
				<!-- <view class="gray" :class="[bianliang.length ? 'black' : '']"> -->
				<!-- {{ bianliang ? bianliang : '请选择' }} -->
				<view class="gray" :class="[list[currentIndex] != undefined ? 'black' : '']">
					{{ list[currentIndex] != undefined ? list[currentIndex].lable : '请选择' }}
				</view>
				<view class="iconfont icon-dayuhao"></view>
			</view>
		</view>
		<!-- type: 2 单个输入类型 -->
		<view v-if="type == 2" class="item">
			<!-- 			<view class="item-left">
				{{ lable }}
			</view>
			<view class="item-right">
				<input class="input" type="text" :value="value" :placeholder="placeholder" @input='inputChange' />
			</view> -->
			<view class="item-left fs-18">
				{{ lable }}
			</view>
			<view class="item-right">
				<input class="input" type="text" :value="value" :placeholder="placeholder" @input='inputChange' />
				<view v-if="unit" class="minute fs-18">{{ unit }}</view>
			</view>
		</view>
		<!-- type:	 3, 双输入类型,可以传入两个描述和两个值 -->
		<view v-if="type == 3" class="item fudu">
			<view class="item-left w300">
				<view class="item-left-left fs-18">
					{{ item1.lable }}
				</view>
				<view class="item-right-right">
					<input type="digit" :value="item1.value" />
					<view class="percent"> {{ item1.unit }} </view>
				</view>
			</view>
			<view class="item-left w300">
				<view class="item-left-left fs-18">
					回调比例
				</view>
				<view class="item-right-right">
					<input type="digit" value="" />
					<view class="percent">%</view>
				</view>
			</view>
		</view>
		<view v-if="type == 4" class="item">
			<view class="item-left fs-18">
				盈利关闭补仓单套利
			</view>
			<view class="item-right">
				<switch checked="true" @change="changeYingli" color='#02D48F' />
			</view>
		</view>
		<!-- 选择弹窗 -->
		<uni-popup ref='popup' type="bottom" :maskClick="maskClick">
			<view class="pop-box">
				<view class="pop-title fs-20">
					{{ lable }}
				</view>
				<scroll-view scroll-y="true" >
					<view v-if="list.length" class="" :class="[currentBianliang == 'CurrencyGroupId' ? 'pop-box-list' : '']">
						<view @click="clickChoice(item,index)" class="pop-item" v-for="(item,index) in list" :key='index'>
							<view class="pop-item-left fs-16">
								{{ item.lable }}
							</view>
							<view class="pop-item-right" :class="[item.active ?  'active' : '']">
								<view class="iconfont icon-dui"></view>
							</view>
						</view>
					</view>
				</scroll-view>
				
				<view @click="closePop('popup')" class="close-button">
					关闭
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		/***　
		参数1:
				type              item的类型
				有 
				type: 1 ,请选择类型
				type: 2 ,输入纯种数字类型
				type: 3 ,输入数组带分钟类型
				type: 4 ,输入数组带分钟类型
				type: 5 ,switch类型
				type: 62 , 幅度类型2 具有两个幅度,回传两个
				type: 62 , 幅度类型1 具有两个幅度,回传两个
				
				重改为
				type:  1, 请选择类型
				type:  2, 单个输入的类型,可以带单位,也可以不带单位(单位用unit 传进来)
				type:	 3, 双输入类型,可以传入两个描述和两个值
				type:	 3, switch类型
				
		参数2: 
		是否禁用
		disable: 
		参数3: 
		item: 对象数组
			
		[
			lable: 
		]
		*/
		props: {
			type: {
				type: [String, Number],
				default: ''
			},
			lable: {
				type: String,
				default: ''
			},
			value: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: ''
			},
			currentBianliang: {
				type: String,
				default: ''
			},
			popTitle: {
				type: String,
				default: ''
			},
			// 单位
			unit: {
				type: String,
				default: ''
			},
			list: {
				type: Array,
				default: () => {
					return [{
							lable: '最后买入价',
							active: false
						},
						{
							lable: '买入平均价',
							active: false
						},
						{
							lable: '最后卖出价',
							active: false
						},
						{
							lable: '首次买入价',
							active: false
						},
					]
				}
			}
		},
		data() {
			return {
				maskClick: true,
				bianliang: '',
				timer: null,
				currentIndex: -1,
			};
		},
		watch: {
			list: {
				handler(newName, oldName) {
					// console.log('currentBianliang',this.currentBianliang)
						let tempArr = JSON.parse(JSON.stringify(newName))
						// if(this.currentBianliang == 'CurrencyGroupId') {
						// 	console.log('oldNametempArr:',oldName)
						// 	tempArr = JSON.parse(JSON.stringify(oldName))
						// }
						// console.log('tempArr:',tempArr)
						// console.log('oldNametempArr:',oldName)
						tempArr.map((item,index)=>{
							if(item.active == true) {
								// console.log('obj.a changed',newName);
								// console.log(item.lable)
								this.currentIndex = index
							}
						})
						
						
					},
					immediate: true,
					deep: true
			}
		},
		methods: {
			// 选择类型的
			openPop() {
				// 当前点击的变量item
				// this.bianliang = currentBianliang
				// this.popTitle = popTitle
				this.$refs.popup.open()
			},
			closePop(ref) {
				let res = this.list.every((item2, index2) => {
					return item2.active === false
				})
				// if(res) {
				// 	toast('你忘记选了')
				// }
				this.$refs.popup.close()
			},
			// 点击选择
			clickChoice(item, index) {
				this.$emit('changeChoice', index)
				this.currentIndex = index
				// this.current = index
				// this.list.map((item2, index2) => {
				// 	this.$set(this.list[index2], 'active', false)
				// })
				// this.$set(this.list[index], 'active', true)
				// this.bianliang = this.list[index].lable
				// // 当前点击的变量item
				// this[this.currentBianliang] = this.list[index].lable
				// if (this.timer !== null) {
				// 	clearTimeout(this.timer)
				// 	this.timer = null
				// 	return
				// }
				if (this.timer != null) return
				this.timer = setTimeout(() => {
					// 关闭弹窗
					this.closePop()
					clearTimeout(this.timer)
					this.timer = null
				}, 100)
				this.$once('hook:beforeDestroy', () => {
					clearTimeout(this.timer)
					this.timer = null;
				})
			},
			// 输入的
			inputChange(e) {
				console.log('组件输入', e.detail.value)
				this.$emit('inputChange', e.detail.value)
			},
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.gray {
		color: #8B95A0;
	}

	.item {
		width: 690upx;
		margin: 0 auto;
		height: 110upx;
		/* border-top: 1upx solid #ECECEC; */
		border-bottom: 1upx solid #ECECEC;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.item-left {
			font-size: 28upx;
			font-weight: 700;
		}

		.item-right {
			flex-shrink: 0;
			flex: 1;
			display: flex;
			align-content: center;
			justify-content: flex-end;
			font-size: 28upx;

			.gray.black {
				color: #000000;
			}
			.iconfont  {
				display: flex;
				align-items: center;
			}
		}

		.percent {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #8B95A0;
			// padding-top: 10upx;
			font-size: 28upx;
			margin-left: 10upx;
		}

		.minute {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-left: 20upx;
			color: #8C96A0;
			font-size: 28upx;
		}

		// .iconfont.icon-dayuhao {
		// 	margin-left: 10upx;

		// 	&::before {
		// 		color: #C9D1DB;
		// 		font-size: 28upx;
		// 	}
		// }
		.iconfont.icon-dayuhao {
			margin-left: 10upx;
			&::before {
				color: #C9D1DB;
				font-size: 20upx;
			}
		}
		

		input {
			flex: 1;
			height: 110upx;
			text-align: right;
			font-size: 28upx;
		}

		&.fudu {
			justify-content: space-between;

			.item-left {
				flex-shrink: 0;
				margin-right: 90upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.item-left-left {
				flex-shrink: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;

			}

			.item-right-right {
				display: flex;
				align-items: center;
				justify-content: space-between;

				input {
					margin: 0upx 0upx 0upx 20upx;
				}

			}

			.w300 {
				width: 300upx;
			}
		}
	}

	/* 弹窗 */
	.pop-box {
		width: 750upx;
		padding: 30upx 30upx 0upx;
		background: #FFFFFF;
		border-radius: 40upx 40upx 0upx 0upx;

		.pop-title {
			width: 690upx;
			height: 90upx;
			font-size: 32upx;
			font-weight: 700;
			border-bottom: 1upx solid #ECECEC;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.pop-box-list {
			height: 600upx;
		}
		.pop-item {
			width: 690upx;
			// height: 90upx;
			height: 120upx;
			font-size: 30upx;
			border-bottom: 1upx solid #ECECEC;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.pop-item-left {
			font-size: 30upx;
			font-weight: 500;
		}

		.pop-item-right {
			// width: 30upx;
			// height: 30upx;
			width: 50upx;
			height: 50upx;
			border-radius: 50%;
			border: 1upx solid #8C96A0;
			display: flex;
			justify-content: center;
			align-items: center;

			.iconfont.icon-dui {
				padding-top: 5upx;
				// font-size: 20upx;
				font-size: 40upx;
				color: #FFFFFF;
			}

			&.active {
				background-color: #0166ec;
				border: 1upx solid #0166ec;
			}
		}

		.close-button {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 90upx;
			font-size: 30upx;
			color: #0166ec;
		}

	}
</style>
