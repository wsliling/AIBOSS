<template>
	<div>

		<view class="TabBar tabBarAuto flex-center-between">
			<!-- <view class="tab flex-column-center-center" v-for="(item,index) in list" :key="index" @click="navigatorTo(item.pagePath)"
			 v-if="myGradeId ===1 || (myGradeId ===0 && index===0) || (myGradeId ===0 && index===1)"> -->
			<!-- <view class="tab flex-column-center-center" v-for="(item,index) in list" :key="index" @click="navigatorTo(item.pagePath)"
			 v-if="myGradeId !==0 || (myGradeId ===0 && index===0)"> -->
			 <!-- <view class="tab flex-column-center-center" v-for="(item,index) in list" :key="index" @click="navigatorTo(item.pagePath,item)"> -->
			 <view class="tab flex-column-center-center" v-for="(item,index) in list" :key="index" @click="GetMemberInfo(item.pagePath,item)" v-if="index!=1">
				<image class="plain" :src="current === index ? item.selectedIconPath : item.iconPath"></image>

				<view :class="['text',{'active':current === index}]">{{item.text}}</view>
			</view>
		</view>
		<!-- 
			<view class="TabBar tabBarAuto flex-center-between">
				<view class="tab flex-column-center-center" v-for="(item,index) in list" :key="index" @click="navigatorTo(item.pagePath)">
					<image class="plain" :src="current === index ? item.selectedIconPath : item.iconPath"></image>
		
					<view :class="['text',{'active':current === index}]">{{item.text}}</view>
				</view>
			</view> -->
			
			<!-- 没有权限邀请好友的弹窗 -->
			<!-- <my-showModal ref='modal' @success='modalSuccess' :title='popTitle' :content='popContent'></my-showModal> -->

	</div>
</template>

<script>
	import {
		post,
		get,
		navigate,
		switchTab,
		judgeLogin,
		toast
	} from '@/common/utils';
	export default {
		props: {
			//激活的tabbar，默认第一个页面tabbar激活
			current: {
				type: Number,
				default: 0
			}
		},
		onReady() {
			// this.grade = uni.getStorageSync('grade')
			// console.log('grade: ',this.grade)
			console.log('当前tab',this.current,this.grade)
		},
		watch: {
			// grade: 1, // 1游客, 2体验用户,3正式用户,4初级交易员,5中级交易员,6高级交易员,7社区
			grade(newName, oldName) {
				this.myGradeId = newName
			}
		},
		data() {
			return {
				haomiaoshu: 50,
				timer: null, // 防抖用的
				// 弹窗
				popTitle: '预存500U抵扣款，激活云交易系统和推广权限!',
				popContent: '是否前往充值?',
				
				// grade:0,
				myGradeId: 0,
				list: [{
					"pagePath": "/pages/tabbar/home/home",
					"text": "首页",
					"iconPath": "/static/shouye.png",
					"selectedIconPath": "/static/selectshouye.png"
				},	 
				{
					"pagePath": "/pages/tabbar/quantization/quantization",
					"text": "量化",
					"iconPath": "/static/lianghua.png",
					"selectedIconPath": "/static/selectlianghua.png"
				}, 
				{
					"pagePath": "/pages/tabbar/deal/deal",
					"text": "AI量化",
					"iconPath": "/static/jiaoyi.png",
					"selectedIconPath": "/static/selectjiaoyi.png"
				}, {
					"pagePath": "/pages/tabbar/notice/notice",
					"text": "资讯",
					"iconPath": "/static/zichan.png",
					"selectedIconPath": "/static/selectzichan.png"
				}, {
					"pagePath": "/pages/tabbar/mine/mine",
					"text": "我的",
					"iconPath": "/static/wode.png",
					"selectedIconPath": "/static/selectwode.png"
				}],
				grade: 0
			}
		},
		methods: {
			// 没有量化权限或未登录
			modalSuccess(e) {
				if (!e) {  
					return
				}
				let token = uni.getStorageSync('token')
				if(!token){
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}else{
					uni.navigateTo({
						url: '/pages/lcInvest/lcInvest',
						animationType:'none'
					})
				}
				// this.paternBtn = this.paternBtnText
				
			},
			async GetMemberInfo(params) {
				// console.log(this.list[this.current].pagePath,params)
				if(this.list[this.current].pagePath == params) {
					return
				}
				// this.timer = null
				// clearTimeout(this.timer)
				// console.log(this.timer)
				if(this.timer != null) {
					return
				}
				
				this.timer = setTimeout(async ()=>{
					
					this.timer = null
					clearTimeout(this.timer)
					
					uni.removeStorageSync('grade')
					
					this.userId = uni.getStorageSync('userId')
					this.token = uni.getStorageSync('token')
					// 判断是否登录了
					if(this.list[0].pagePath == params || this.list[3].pagePath == params || this.list[4].pagePath == params) {
						uni.switchTab({
							url: params,
							animationType:'none',
							fail() {
								console.log('switchTab失败跳')
								uni.redirectTo({
									url: params,
									animationType:'none'
								})
							}
						})
						return
					}
					let token = uni.getStorageSync('token')
					if(!token && (params == this.list[1].pagePath || params == this.list[2].pagePath)){
						this.popTitle = '请先登录'
						this.popContent = '是否前往登录页'
						uni.showModal({
						    title: '请先登录',
						    content: '是否前往登录页',
								cancelColor:'#999',
								confirmColor:'#4387ea',
						    success: function (res) {
						        if (res.confirm) {
						           uni.navigateTo({
						           	url: '/pages/login/login'
						           })
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
						//this.$refs.modal.open()
						return
					}
					let obj = {
						UserId: this.userId,
						Token: this.token
					}
					let res = await post('User/GetMemberInfo', obj, {}, false)
					
					if (res.code != 0) {
						return
					}
					// 判断是否充值了
					this.grade = res.data.grade
					
					let preRechargeLC = res.data.preRechargeLC
					let popTitle = `预存${preRechargeLC}U抵扣款，激活云交易系统!`
					let popContent = '是否前往充值'
					
					// if(this.isVip == 1) {
					// 	popTitle = '预存200U抵扣款，激活推广权限!'
					// }else {
					// 	popTitle = '预存500U抵扣款，激活推广权限!'
					// }
					
					
					
					let ress =((this.grade == 1 && params == this.list[1].pagePath) || (this.grade == 1 && params == this.list[2].pagePath))&&preRechargeLC>0
					if(ress) {
						
						// toast('您还是游客哦,成为正式用户再来吧')
						uni.showModal({
						    // title: '预存500U抵扣款，激活云交易系统',
						    // content: '是否前往充值',
								title: popTitle,
								content: popContent,
								cancelColor:'#999',
								confirmColor:'#4387ea',
						    success:  (res)=> {
						        if (res.confirm) {
						            uni.navigateTo({
						            	url: '/pages/lcInvest/lcInvest',
										animationType:'none'
						            })
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
						//this.$refs.modal.open()
						// return
					}else {
						// if(this.$route.fullPath == params) return
						console.log('params:',params)
						uni.switchTab({
							url: params,
							animationType:'none',
							fail() {
								console.log('switchTab失败跳')
								// uni.redirectTo({
								// 	url: params
								// })
							}
						})
					}
					
					
					this.timer = null
					clearTimeout(this.timer)
					
				},this.haomiaoshu)
				
				
				
				
			},
			// 跳转
			navigatorTo(params,item) {
				if(this.list[0].pagePath == params || this.list[3].pagePath == params || this.list[4].pagePath == params) {
					uni.switchTab({
						url: params,
						animationType:'none',
						fail() {
							console.log('switchTab失败跳')
							uni.redirectTo({
								url: params,
								animationType:'none'
							})
						}
					})
					return
				}
				let token = uni.getStorageSync('token')
				if(!token && (params == this.list[1].pagePath || params == this.list[2].pagePath)){
					this.popTitle = '请先登录'
					this.popContent = '是否前往登录页'
					uni.showModal({
					    title: '请先登录',
					    content: '是否前往登录页',
							cancelColor:'#999',
							confirmColor:'#4387ea',
					    success: function (res) {
					        if (res.confirm) {
					           uni.navigateTo({
					           	url: '/pages/login/login'
					           })
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					//this.$refs.modal.open()
					return
				}
				
				// this.GetMemberInfo(params)
				
				// navigate(params)
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}
	.flex-column-center-center {
		// display: flex;
		// flex-direction: column;
		// justify-content: center;
		// align-items: center;
	}
	.flex-center-between {
		display: flex;
		justify-content: space-between;
	}
	//底部安全距离
	.tabBarAuto {
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.TabBar {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 100upx;
		width: 750upx;
		background-color: #fff; //white
		z-index: 999;
		box-shadow: 0upx -1upx 10upx 0upx rgba(73, 73, 73, 0.1);
	}

	.tab {
		width: 150upx;
		// height: 110upx;
		height: 130upx;
		text-align: center;
		position: relative;
		// width: 50%;
		// width: 100%;

		.plain {
			margin-top: 8upx;
			// width: 48upx;
			// height: 48upx;
			width: 46upx;
			height: 46upx;
		}

		.special {
			width: 80upx;
			height: 80upx;
		}

		.text {
			text-align: center;
			line-height: 1.7;
			// font-size: 24upx;
			// font-size: 28upx;
			font-size: 22upx;
			color: #b6b6b6;
			font-weight: 700;

			&.active {
				color: $primary;
				font-weight: 700;
			}
		}

		// &:nth-child(3) {
		// 	margin-top: -25upx;
		// 	height: 120upx;
		// }
	}

	/* tabbar */
	.centerIcon {
		position: fixed;
		width: 100%;
		height: 123upx;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		z-index: 998;
	}

	.centerIcon-img {
		// width: 80upx;
		// height: 80upx;
		width: 100upx;
		height: 100upx;
	}
</style>
