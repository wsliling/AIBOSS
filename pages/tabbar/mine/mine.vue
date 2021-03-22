<template>
	<view>
		<view :style="{ height: customBar + 'upx' }"></view>
		<view class="header">
			<view class="userInfoBox" @click="toUpdateUserInfo">
				<view class="userInfo">
					<image v-if="avatar" :src="avatar" class="img" mode="aspectFill"></image>
					<image v-else src="/static/mine/default.png" class="img" mode="aspectFill"></image>
					<view class="userName">{{ userNick || '您未登录，请先登录！' }}</view>
					<view class="userTips" v-if="gradeName.length">{{ gradeName }}</view>
				</view>
				<view class="userIcon iconfont icon-dayuhao"></view>
			</view>
			<view class="userCard">
				<view class="cardLeft">
					<view class="cardTitle">总收益/USDT</view>
					<view class="cardMoney" v-if="yanbol">
						<view class="nums">{{ usdt }}</view>
						<view class="">≈¥ {{ cnyfilter }} CNY</view>
					</view>
					<view class="cardMoney" v-else>******</view>
					<view class="cardBtn" @click="toMyProfit">
						查看明细
						<text class="iconfont icon-dayuhao"></text>
					</view>
				</view>
				<view class="cardRight">
					<image :src="yanbol ? '/static/cardIcon1.png' : '/static/yanjin1.png'" class="img1" mode="widthFix" @click="yanbols"></image>
					<view class="cardBottom" @click="gotolink" v-if="false">
						<image src="../../../static/cardIcon2.png" class="img2" mode=""></image>
						<view class="bottomTitle">公告</view>
					</view>
				</view>
			</view>
			<view class="userCard fund">
				<view class="cardLeft">
					<view class="cardTitle color_white">团队对冲基金</view>
					<view class="cardMoney" v-if="yanbol1">
						<view class="nums">25u</view>
					</view>
					<view class="cardMoney" v-else>******</view>
					
				</view>
				<view class="cardRight">
					<image :src="yanbol1 ? '../../../static/cardIcon1.png' : '../../../static/yanjin1.png'" class="img1" mode="" @click="yanbols1"></image>
				</view>
			</view>
			<view class="lookTips">
				<image src="../../../static/vipIcon.png" mode=""></image>
				<view class="tipsContent">了解会员详情</view>
				<image src="../../../static/vipIcon.png" mode=""></image>
			</view>
			<!-- <view class="menu">
				<view class="menuItem" @click="toMoneyManagement">
					<image src="../../../static/cardIcon3.png" class="image" mode=""></image>
					<view class="menuTitle">我的钱包</view>
				</view>
				<view class="menuItem" @click="toapiLetter">
					<image src="../../../static/cardIcon4.png" class="image" mode=""></image>
					<view class="menuTitle">API授权</view>
				</view>
				<view class="menuItem" @click="toMyProfit">
					<image src="../../../static/cardIcon5.png" class="image" mode=""></image>
					<view class="menuTitle">我的收益</view>
				</view>
			</view> -->
		</view>
		<view class="team-box">
			<select-tab>
				<template v-slot:mainBox>
					<view class="box-item" @click="toMoneyManagement">
						<view class="box-item-left">
							<image src="../../../static/mine/money_icon.png" mode="aspectFill"></image>
							<view class="left-text">我的钱包</view>
						</view>
						<view class="box-item-right iconfont icon-dayuhao"></view>
					</view>
					<view class="box-item" @click="toapiLetter">
						<view class="box-item-left">
							<image src="../../../static/mine/API_icon.png" mode="aspectFill"></image>
							<view class="left-text">API授权</view>
						</view>
						<view class="box-item-right iconfont icon-dayuhao"></view>
					</view>
					<view class="box-item" @click="toMyProfit">
						<view class="box-item-left">
							<image src="../../../static/mine/sy_icon.png" mode="aspectFill"></image>
							<view class="left-text">我的收益</view>
						</view>
						<view class="box-item-right iconfont icon-dayuhao"></view>
					</view>
					<view class="box-item" data-index="team" @click="toMyTeam">
						<view class="box-item-left">
							<!-- <view class="iconfont icon-wodetuandui left-icon">
							</view> -->
							<image src="/static/mine/tuandui.png" mode="aspectFill"></image>
							<view class="left-text">我的团队</view>
						</view>
						<view class="box-item-right iconfont icon-dayuhao"></view>
					</view>
					<view class="box-item" data-index="friend" @click="toFirends">
						<view class="box-item-left">
							<!-- <view class="iconfont icon-yaoqinghaoyou left-icon fz-small">
							</view> -->
							<image src="/static/mine/haoyou.png" mode="aspectFill"></image>
							<view class="left-text">邀请好友</view>
						</view>
						<view class="box-item-right iconfont icon-dayuhao"></view>
					</view>
					<view class="box-item" @click="totransactionRecords" data-index="jilu">
						<view class="box-item-left">
							<!-- <view class="iconfont icon-jiaoyijilu left-icon">
							</view> -->
							<image src="/static/mine/jiaoyijilu.png" mode="aspectFill"></image>
							<view class="left-text">交易记录</view>
						</view>
						<view class="box-item-right iconfont icon-dayuhao"></view>
					</view>
					<view class="box-item" @click="tojournal" data-index="rizhi">
						<view class="box-item-left">
							<!-- <view class="iconfont icon-rizhi left-icon">
							</view> -->
							<image src="/static/mine/jiaoyirizhi.png" mode="aspectFill"></image>
							<view class="left-text">交易日志</view>
						</view>
						<view class="box-item-right iconfont icon-dayuhao"></view>
					</view>
					<view class="box-item" @click="tocustomerService" data-index="kefu">
						<view class="box-item-left">
							<!-- <view class="iconfont icon-kefu left-icon">
							</view> -->
							<image src="/static/mine/kefu.png" mode="aspectFill"></image>
							<view class="left-text">专属客服</view>
						</view>
						<view class="box-item-right iconfont icon-dayuhao"></view>
					</view>
					<view class="box-item" @click="toSetUp">
						<view class="box-item-left">
							<!-- <view class="iconfont icon-kefu left-icon">
							</view> -->
							<image src="/static/mine/shezhi.png" mode="aspectFill"></image>
							<view class="left-text">设置</view>
						</view>
						<view class="box-item-right iconfont icon-dayuhao"></view>
					</view>
				</template>
			</select-tab>
		</view>
		<view class="my-tab-empty-box"></view>
		<tabbar :grade="grade" :current="4"></tabbar>
		<!-- 没有权限邀请好友的弹窗 -->
		<!-- <my-showModal ref='modal' @success='modalSuccess' :title='popTitle' :content='popContent'></my-showModal> -->
	</view>
</template>

<script>
import selectTab from '@/components/selectTab.vue';
import { GetIncomeStatistics } from '@/common/js/http.js';
import { post, get, navigate, switchTab, judgeLogin, toast, trim } from '@/common/utils/index.js';
export default {
	data() {
		return {
			// 个人信息
			grade: 1, // 1游客, 2体验用户,3正式用户,4初级交易员,5中级交易员,6高级交易员,7社区
			userNick: '',
			avatar: '',
			gradeName: '',
			canIniviteFriend: 0, //  0:可以邀请好友 1:不可以邀请好友
			isAut: 0, // 0是未开通, 1开通了
			isVip: 0, // 0不是特权用户,1是特权用户
			lc: 0,
			usdt: 0,
			defaultImg: '/static/mine/default.png',
			customBar: this.customBar,
			userId: '',
			token: '',
			yanbol: true,
			yanbol1: true,

			memberInfo: {
				userId: '', //用户id
				mobile: '', //手机号
				Avatar: '', //头像
				avatar: '',
				userNick: '', //昵称
				gradeName: '', //游客
				sex: '', //性别 0-保密/1-女/2-男
				introduction: '', //个性签名
				canIniviteFriend: 0 //  0:可以邀请好友 1:不可以邀请好友
			},

			// 弹窗
			popTitle: '预存500U抵扣款，激活推广权限!',
			popContent: '是否前往充值?'
		};
	},
	components: {
		selectTab
	},
	onLoad() {
		// 隐藏tab栏
		uni.hideTabBar();
		// console.log(this.$store.state.cnyrate)
	},
	onShow() {
		// 重置为onload状态
		Object.assign(this.$data, this.$options.data());
		// 隐藏tab栏
		uni.hideTabBar();
		this.init();
		this.yanbol = uni.getStorageSync('yanbol');
		console.log(this.$store.state.cnyrate);
	},
	onUnload() {
		// 并不会触发
		console.log('触发了卸载');
		Object.assign(this.$data, this.$options.data());
	},
	methods: {
		toMoneyManagement() {
			uni.navigateTo({
				url: '../../moneyManagement/moneyManagement'
			});
		},
		init() {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			// 个人信息
			this.GetMemberInfo();
			// 资产
			// this.getUserAssetsInfo()
			if (this.userId && this.token) {
				this.getStatistics();
			}
			//this.GetMemberInfo()
		},
		yanbols() {
			this.yanbol = !this.yanbol;
			uni.setStorageSync('yanbol', this.yanbol);
		},
		yanbols1() {
			this.yanbol1 = !this.yanbol1;
			uni.setStorageSync('yanbol1', this.yanbol1);
		},
		//去设置页
		toSetUp() {
			uni.navigateTo({
				url: '/pages/setUpInfo/setUpInfo'
			});
		},
		//去个人信息页
		toUpdateUserInfo() {
			// if (!uni.getStorageSync("userId") || !uni.getStorageSync("token")) {
			// 	navigate('login/login')
			// 	return
			// }
			if (!judgeLogin()) return;
			uni.navigateTo({
				url: '/pages/userInfo/userInfo'
			});
		},
		gotolink() {
			uni.navigateTo({
				url: '/pages/tabbar/notice/notice1'
			});
		},
		// clickMenu(e){
		// 	if(!e) return
		// 	switch(e.target.dataset.index){
		// 		case 'team': this.toMyTeam(); break;
		// 		case 'money': this.toMyProfit(); break;
		// 		case 'friend': this.toFirends(); break;
		// 		default: return
		// 	}
		// },
		// clickMentQt(e){
		// 	if(!e) return
		// 	switch(e.target.dataset.index){
		// 		case 'api': this.toapiLetter(); break;
		// 		case 'jilu': this.totransactionRecords(); break;
		// 		case 'kefu': this.tocustomerService(); break;
		// 		case 'rizhi': this.tojournal(); break;
		// 		default: return
		// 	}
		// },
		//跳转到我的团队页面
		toMyTeam() {
			if (!judgeLogin()) return;
			uni.navigateTo({
				url: '/pages/myTeam/myTeam'
			});
		},
		//跳转到我的收益页面
		toMyProfit() {
			if (!judgeLogin()) return;
			uni.navigateTo({
				url: '/pages/myProfit/myProfit'
			});
		},
		// 没有权限邀请好友的弹窗
		modalSuccess(e) {
			if (!e) {
				return;
			}
			// this.paternBtn = this.paternBtnText
			uni.navigateTo({
				url: '/pages/usdtInvest/usdtInvest'
			});
		},
		//跳转到邀请好友页面
		toFirends() {
			if (this.isVip == 1) {
				this.popTitle = '预存200U抵扣款，激活推广权限!';
			} else {
				this.popTitle = '预存500U抵扣款，激活推广权限!';
			}
			if (!judgeLogin()) return;
			uni.navigateTo({
				url: '/pages/friends/friends'
			});
			// // canIniviteFriend: 0, //  0:可以邀请好友 1:不可以邀请好友
			// if (this.canIniviteFriend == 0) {
			// 	uni.navigateTo({
			// 		url: '/pages/friends/friends'
			// 	})
			// } else if (this.canIniviteFriend == 1) {

			// 	uni.showModal({
			// 	    title: this.popTitle,
			// 	    content: this.popContent,
			// 	    success: (res) => {
			// 	        if (res.confirm) {
			// 	            uni.navigateTo({
			// 	            	url: '/pages/usdtInvest/usdtInvest'
			// 	            })
			// 	        } else if (res.cancel) {
			// 	            console.log('用户点击取消');
			// 	        }
			// 	    }
			// 	});
			// 	//this.$refs.modal.open()
			// }
		},
		//跳转到API授权页面
		toapiLetter() {
			if (!judgeLogin()) return;
			uni.navigateTo({
				url: '/pages/apiLetter/apiLetter'
			});
		},
		//跳转到交易记录
		totransactionRecords() {
			if (!judgeLogin()) return;
			uni.navigateTo({
				url: '/pages/transactionRecords/transactionRecords'
			});
		},
		//跳转到联系客服页面
		tocustomerService() {
			uni.navigateTo({
				url:'/pages/contactUs/contactUs'
				// url: '/pages/customerService/customerService'
			});
		},
		//跳转到交易日志页面
		tojournal() {
			if (!judgeLogin()) return;
			uni.navigateTo({
				url: '/pages/journal/journal'
			});
		},
		// 获取个人信息
		async GetMemberInfo() {
			uni.removeStorageSync('grade');
			// 初始化
			// 个人信息
			let tempObj = {
				userId: '', //用户id
				mobile: '', //手机号
				Avatar: '', //头像
				avatar: '',
				userNick: '', //昵称
				gradeName: '', //游客
				sex: '', //性别 0-保密/1-女/2-男
				introduction: '' //个性签名
			};
			// this.$set(this.memberInfo,'avatar','')
			// this.$set(this.memberInfo,'userNick','')
			// this.$set(this.memberInfo,'gradeName','')
			this.userNick = '';
			this.avatar = '';
			this.gradeName = '';
			let obj = {
				UserId: this.userId,
				Token: this.token
			};
			let res = await post('User/GetMemberInfo', obj, {}, false);
			if (res.code != 0) {
				return;
			}
			// this.memberInfo = res.data
			this.$set(this, 'memberInfo', res.data);
			this.userNick = res.data.userNick;
			// this.avatar = res.data.avatar
			this.avatar = res.data.avatar ? res.data.avatar : this.defaultImg;
			this.gradeName = res.data.gradeName;
			this.canIniviteFriend = res.data.canIniviteFriend;
			this.grade = res.data.grade;
			this.isAut = res.data.isAut;
			this.isVip = res.data.isVip;
		},
		// 资产信息
		// async getUserAssetsInfo() {
		// 	let obj = {
		// 		userId: this.userId,
		// 		token: this.token
		// 	}
		// 	let res = await post('User/GetUserAssetsInfo', obj, {}, false)
		// 	if (res.code != 0) return
		// 	this.lc = res.data.lc
		// 	this.usdt = res.data.usdt
		// },
		async getStatistics() {
			let datatime = new Date();
			let month = datatime.getMonth() + 1;
			let dateMonth = month < 10 ? '0' + month : month;
			let dd = datatime.getFullYear() + '-' + dateMonth;
			let params = {
				UserId: this.userId,
				Token: this.token,
				Year: +dd.split('-')[0],
				Month: +dd.split('-')[1]
			};
			let { data } = await GetIncomeStatistics(params);
			if (data.code != 0) return;
			console.log(data);
			this.usdt = data.data.total;
		}
	},
	computed: {
		cnyfilter() {
			if (this.usdt === '') return;
			let data = this.usdt * this.$store.state.cnyrate;
			return data.toFixed(6);
		}
	}
};
</script>

<style scoped>
@import url('./style');
</style>
