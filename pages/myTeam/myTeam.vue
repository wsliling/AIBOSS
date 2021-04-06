<template>
	<view>
		<view class="header-card">
			<view class="header-card-box">
				<view class="card-table" :scroll-y="true">
					<view class="card-table-item paddingBox fs-17">
						<view class="opacity-text text-width">
							11
						</view>
						<view class="col  fs-18">
							总人数
						</view>
						<view class="col  fs-18">
							月预充
						</view>
						<view class="col  fs-18">
							月抵扣
						</view>
						<view class="col  fs-18">
							月剩余
						</view>
					</view>
					<view class="card-table-item fs-18" v-for="(item,index) in topTabList" :key='index'>
						<view class="text-width fs-18">
							<!-- 社区 -->
							{{ item.title }}
						</view>
						<view class="col cols fs-15">
							<!-- 80 -->
							{{ item.count  }}
						</view>
						<view class="col cols fs-15">
							<!-- 200LC -->
							{{ item.rechargeInMonth | four }}
						</view>
						<view class="col cols fs-15">
							<!-- 105LC -->
							{{ item.deductionInMonth | four }}
						</view>
						<view class="col cols fs-15">
							<!-- 95LC -->
							{{ item.surplusInMonth | four(2) }}
						</view>
					</view>
				</view>
				<view class="card-text" v-if="false">
					<view class="card-text-left">
						<!-- 		<image :src="directFatherInfo.avatar" mode="aspectFill" class="img"></image>
						<view class="card-right">
							<view class="righttop-text">
								{{ directFatherInfo.userNick ? directFatherInfo.userNick : '无' }}
							</view>
							<view class="rightbottom-text fs-17">
								我的邀请人
							</view>
						</view> -->
					</view>
					<view @click="clickRemark" class="card-text-right iconfont icon-jinggao" style="transform: scale(1.5);">
					</view>
				</view>
			</view>
		</view>
		<view class="team-header">
			团队明细
		</view>
		<view class="team-detail-box">
			<view class="team-item-box">
				<view class="team-item" v-for="(item,index) in myTeamPageList" :key='index'>
					<view class="team-title-box">
						<view class="team-title-left">
							<view class="lead-img">
								<!-- <image src="/static/mine/tou.png" mode="aspectFill"></image> -->
								<image :src="item.avatar" mode="aspectFill"></image>
							</view>
							<view class="name-id">
								<view class="title-name-box">
									<view class="lead-name fs-18">
										<!-- 久林茶具 -->
										{{ item.userNick }}
									</view>
									<view v-if="item.hasSubordinate != 0 && item.lv > 0" @click="clickOpen(item,index)" class="jiantou">
										<!-- <view v-if="item.hasSubordinate != 0" @click="clickOpen(item,index)" class="jiantou"> -->
										<image v-if="!item.open" src="/static/mine/xiala.png" mode="aspectFill"></image>
										<image v-else src="/static/mine/shouqi.png" mode="aspectFill"></image>
									</view>
								</view>
								<view class="lead-id fs-18">
									<!-- ID：24639 -->
									{{ item.userId }}
								</view>
							</view>
						</view>
						<view class="team-title-right ">
							<view class="grade-name fs-16">
								<!-- 初级交易员 -->
								{{ item.gradeName }}
							</view>
							<view class="date fs-16">
								<!-- 2020.09.02 18:20 -->
								{{ item.addtime }}
							</view>
						</view>
					</view>
					<!-- 第一代 -->
					<view v-if="!item.open" class="team-item-data">
						<view class="data-item">
							<!-- <view class="shuzi">200LC</view> -->
							<view class="shuzi fs-18">{{ item.rechargeInMonth  | four }}</view>
							<view class="describe fs-18">月预充</view>
						</view>
						<view class="data-item">
							<!-- <view class="shuzi">105LC</view> -->
							<view class="shuzi fs-18">{{ item.deductionInMonth | four }}</view>
							<view class="describe fs-18">月抵扣</view>
						</view>
						<view class="data-item">
							<!-- <view class="shuzi">95LC</view> -->
							<view class="shuzi fs-18">{{ item.surplusInMonth }}</view>
							<view class="describe fs-18">月剩余</view>
						</view>
					</view>
					<!-- 第二代 -->
					<view v-if="item.open" class="two-team-box">
						<!-- <view v-if="1" class="two-team-box"> -->
						<view class="two-team-row">
							<view class="two-team-column f24">
								用户ID
							</view>
							<view class="two-team-column f24">
								名字
							</view>
							<view class="two-team-column f24">
								级别
							</view>
							<view class="two-team-column f24">
								月预充
							</view>
							<view class="two-team-column f24">
								月抵扣
							</view>
							<view class="two-team-column f24">
								月剩余
							</view>
						</view>
						<!-- <view class="two-team-row" v-for="(item2,index2) in MyTeamList" :key='index'> -->
						<view class="two-team-row" v-for="(item2,index2) in item.list" :key='index2'>
							<view class="two-team-column">{{ item2.userId }}</view>
							<view class="two-team-column">
								<view class="jiantou-name">
									{{ item2.userNick }}
								</view>
								<!-- {{ item2.userNick }} -->

								<view v-if="item2.hasSubordinate != 0 && item2.lv > 0" @click="clickOpen2(item,index,item2,index2)" class="jiantou">
									<image v-if="!item2.open" src="/static/mine/xiala.png" mode="aspectFill"></image>
									<image  v-if="item2.open"  src="/static/mine/shouqi.png" mode="aspectFill"></image>
								</view>




							</view>
							<view class="two-team-column">{{ item2.gradeName }}</view>
							<view class="two-team-column">{{ item2.rechargeInMonth  | four }}</view>
							<view class="two-team-column">{{ item2.deductionInMonth  | four }}</view>
							<view class="two-team-column">{{ item2.surplusInMonth | four }}</view>

							<!-- 第三代 -->
							<view v-if="item2.open" class="two-team-box three-team-box">
								<!-- <view class="two-team-row">
									<view class="two-team-column f24">
										用户ID
									</view>
									<view class="two-team-column f24">
										名字
									</view>
									<view class="two-team-column f24">
										级别
									</view>
									<view class="two-team-column f24">
										月预充
									</view>
									<view class="two-team-column f24">
										月抵扣
									</view>
									<view class="two-team-column f24">
										月剩余
									</view>
								</view> -->
								<!-- <view class="two-team-row" v-for="(item2,index2) in MyTeamList" :key='index'> -->
								<view class="two-team-row" v-for="(item3,index3) in item2.list" :key='index3'>
									<view class="two-team-column">{{ item3.userId }}</view>
									<view class="two-team-column">{{ item3.userNick }}</view>
									<view class="two-team-column">{{ item3.gradeName }}</view>
									<view class="two-team-column">{{ item3.rechargeInMonth  | four }}</view>
									<view class="two-team-column">{{ item3.deductionInMonth  | four }}</view>
									<view class="two-team-column">{{ item3.surplusInMonth | four }}</view>
								</view>
							</view>


						</view>


					</view>



				</view>
			</view>
		</view>
		<!-- <view class="team-box">
			<view class="main">
				<view class="header-top">
					<view class="header-left">
						<view class="header-left-img">
							<image class="img" src="@/static/logo.png" mode="aspectFit"></image>
						</view>
						<view class="header-left-text">
							<view class="left-text-top">
								<text>晓风残月</text>
							</view>
							<view class="left-text-bottom">
								<text>ID: 22358</text>
							</view>
						</view>
					</view>
					<view class="header-right">
						<view class="right-top">
							<text class="text">初级交易员</text>
						</view>
						<view class="right-bottom">
							<text>2020.09.02 18:20</text>
						</view>
					</view>
				</view>
				<view class="main-content">
					<view class="bigBox">
						<view class="bgcolorBox">
					
						</view>
						<scroll-view class="card-table" :scroll-y="true">
							<view class="card-table-item paddingBox">
								<view class="col">
									用户ID
								</view>
								<view class="col">
									名字
								</view>
								<view class="col">
									级别
								</view>
								<view class="col">
									月预充
								</view>
								<view class="col">
									月抵扣
								</view>
								<view class="col">
									月剩余
								</view>
							</view>
							<view class="card-table-item" v-for="item in 6">
								<view class="col">
									社区
								</view>
								<view class="col">
									80
								</view>
								<view class="col">
									200LC
								</view>
								<view class="col">
									105LC
								</view>
								<view class="col">
									95LC
								</view>
								<view class="col">
									95LC
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view> -->
		<!-- <view class="team-box" v-for="(item,index) in 6" :key='index'>
			
			<my-table>
				<template v-slot:img>
					<image class="img" src="@/static/logo.png" mode="aspectFit"></image>
				</template>
				<template v-slot:userName>
					<text>晓风残月</text>
				</template>
				<template v-slot:UserId>
					<text>ID: 22358</text>
				</template>
				<template v-slot:Icon>
					<text class="text">初级交易员</text>
				</template>
				<template v-slot:Time>
					<text>2020.09.02 18:20</text>
				</template>
				<template v-slot:content>
					<view v-if="false">
						<view class="useMonth">
							<view class="userMonth-item">
								<view class="userMoth-top">
									200LC
								</view>
								<view class="userMonth-bottom">
									月预充
								</view>
							</view>
							<view class="userMonth-item">
								<view class="userMoth-top">
									105LC
								</view>
								<view class="userMonth-bottom">
									月抵扣
								</view>
							</view>
							<view class="userMonth-item">
								<view class="userMoth-top">
									95LC
								</view>
								<view class="userMonth-bottom">
									月剩余
								</view>
							</view>
						</view>
					</view>
					<view v-else class="bigBox">
						<view class="bgcolorBox">

						</view>
						<scroll-view class="card-table" :scroll-y="true">
							<view class="card-table-item paddingBox">
								<view class="col">
									用户ID
								</view>
								<view class="col">
									名字
								</view>
								<view class="col">
									级别
								</view>
								<view class="col">
									月预充
								</view>
								<view class="col">
									月抵扣
								</view>
								<view class="col">
									月剩余
								</view>
							</view>
							<view class="card-table-item" v-for="item in myTeamPageList">
								<view class="col">
									社区
								</view>
								<view class="col">
									80
								</view>
								<view class="col">
									200LC
								</view>
								<view class="col">
									105LC
								</view>
								<view class="col">
									95LC
								</view>
								<view class="col">
									95LC
								</view>
							</view>
						</scroll-view>
					</view>
				</template>
			</my-table>
		</view> -->
		<uni-load-more v-if="loadingType == 2 && myTeamPageList.length > 0" :loadingType="loadingType"></uni-load-more>
		<!-- 暂无团队 -->
		<not-data v-if='myTeamPageList.length == 0  && loadMore === 2'></not-data>
		<uni-load-more v-if="myTeamPageList.length > 0  && loadMore !== 0" :loadingType="loadMore"></uni-load-more>
		<uni-popup ref='remarkPop' type="center">
			<view class="remark-box">
				<view class="remark-title">
					备注
				</view>
				<!-- <view class="remark-content" v-html="remarkContent"> -->
				<view class="remark-content">
					<view class="remark-content-text">
						{{ remarkContent1 }}
					</view>
					<view class="remark-content-text">
						{{ remarkContent2 }}
					</view>
					<view class="remark-content-text">
						{{ remarkContent3 }}
					</view>
					<view class="remark-content-text">
						{{ remarkContent4 }}
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import myTable from '@/components/myTable.vue'
	import {
		post,
		get,
		navigate,
		switchTab,
		judgeLogin,
		toast,
		trim,
	} from '@/common/utils/index.js';
	export default {
		data() {
			return {
				open: false,
				defaultImg: '/static/mine/default.png',
				userId: '',
				token: '',
				// 团队统计信息
				topTabList: [],
				// 推荐人信息
				directFatherInfo: {
					avatar: ''
				},
				// 获取我的团队列表信息(分页)
				myTeamPageList: [],
				// 二级的
				MyTeamList: [],
				// 页码
				PageIndex: 1,
				// 页容量
				PageSize: 10,
				loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
				// remarkContent: `达到初级交易员，团队架构就只显示一代和数据 </br>
				// 达到中级交易员，团队架构就会显示二代和数据</br>
				// 达到高级交易员，团队架构就会显示三代和数据</br>`,
				remarkContent1: '达到初级交易员，团队架构就只显示直推和数据',
				remarkContent2: '达到中级交易员，团队架构就会显示间推和数据',
				remarkContent3: '达到高级交易员，团队架构就会显示三代和数据',
				remarkContent4: '达到社区才会显示社区总数据',
				grade: 1, // 1游客, 2体验用户,3正式用户,4初级交易员,5中级交易员,6高级交易员,7社区
				
				loadingType: 0, //上拉的状态：0-loading前；1-loading中；2-没有更多了
				isLoad: false ,// 是否可以加载下一页
			}
		},
		components: {
			myTable
		},
		methods: {
			clickOpen(item, index) {
				item.open = !item.open
				if (item.open) {
					this.getMyTeamList(item, index)
				}else {
					this.$set(this.myTeamPageList[index], 'list', [])
				}
			},
			clickOpen2(item, index, item2, index2) {
				item2.open = !item2.open
				if (item2.open) {
					this.getMyTeamList2(item, index, item2, index2)
				}else {
					this.$set(this.myTeamPageList[index].list[index2], 'list', [])
				}
			},
			clickRemark() {
				this.$refs.remarkPop.open()
			},
			// 获取我团队统计信息
			async getTeamStatisticsInfo() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					userId: this.userId,
					token: this.token
				}
				let res = await post('User/GetTeamStatisticsInfo', obj, {}, false)
				if (res.code != 0) return
				this.topTabList = res.data
			},
			// 获取我的推荐人信息
			async getDirectFatherInfo() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					userId: this.userId,
					token: this.token
				}
				let res = await post('User/GetDirectFatherInfo', obj, {}, false)
				if (res.code != 0) return
				if (res.data == null) return
				res.data.avatar = res.data.avatar ? res.data.avatar : this.defaultImg
				this.directFatherInfo = res.data
			},
			// 分页的团队
			async getMyTeamPageList() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					userId: this.userId,
					token: this.token,
					PageIndex: this.PageIndex,
					PageSize: this.PageSize
				}
				let res = await post('User/GetMyTeamPageList', obj, {}, false)

				if (res.code != 0) {
					return
				}
				
				res.data = res.data ? res.data : []
				
				if(res.data.length < this.pageSize) {
					this.isLoad = false
					this.loadingType = 2
				}else {
					this.isLoad = true
					this.loadingType = 0
				}
				
				
				if (res.data.length < this.PageSize) {
					console.log('没有更多的')
					// 没有更多的
					this.loadMore = 2;
				} else {
					// loading前
					this.loadMore = 0;
				}

				let temp = res.data.map((item, idnex) => {
					this.$set(item, 'open', false)
					return item
				})
				// this.myTeamPageList = temp
				this.myTeamPageList.push(...temp)
			},

			// 点开的团队
			async getMyTeamList(item, index) {
				// if (this.myTeamPageList[index].list && this.myTeamPageList[index].list.length) {
				// 	return
				// }
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					// userId: item.userId,
					userId: item.encryptionUserId,
					lv: item.lv
				}
				// let res = await get('User/GetMyTeamList', obj, {}, false)
				let res = await get('User/GetMyTeamListV2', obj, {}, false)
				if (res.code != 0) {
					return
				}
				let temp = res.data.map((item, idnex) => {
					this.$set(item, 'open', false)
					return item
				})
				this.$set(this.myTeamPageList[index], 'list', temp)
				// console.log('this.myTeamPageList:',this.myTeamPageList)
				// this.MyTeamList = res.data
			},
			async getMyTeamList2(item, index, item2, index2) {
				// if (this.myTeamPageList[index].list && this.myTeamPageList[index].list.length) {
				// 	return
				// }
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					// userId: item.userId,
					userId: item2.encryptionUserId,
					lv: item2.lv
				}
				// let res = await get('User/GetMyTeamList', obj, {}, false)
				let res = await get('User/GetMyTeamListV2', obj, {}, false)
				if (res.code != 0) {
					return
				}
				this.$set(this.myTeamPageList[index].list[index2], 'list', res.data)
				// console.log('this.myTeamPageList:',this.myTeamPageList)
				// this.MyTeamList = res.data
			},
			// 个人信息
			async GetMemberInfo() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')

				uni.removeStorageSync('grade')
				let obj = {
					UserId: this.userId,
					Token: this.token
				}
				let res = await post('User/GetMemberInfo', obj, {}, false)
				if (res.code != 0) {
					return
				}
				uni.setStorageSync('grade', res.data.grade)
				this.grade = res.data.grade
			},
			// 初始化
			init() {
				// 获取个人信息
				// this.GetMemberInfo()
				// 获取我团队统计信息
				this.getTeamStatisticsInfo()
				// 获取我的推荐人信息
				// this.getDirectFatherInfo()
				// 获取我的团队列表信息(分页)
				this.getMyTeamPageList()
			},
		},
		onLoad() {
			// this.init()
		},
		onShow() {
			uni.pageScrollTo({
				scrollTop: 0
			})
			this.PageIndex = 1
			this.topTabList = []
			this.myTeamPageList = []
			this.init()
		},
		// 上拉加载更多
		onReachBottom() {
			console.log('上拉了this.loadMore ,', this.loadMore)
			if (
				this.loadMore === 2
			) {
				return
			};
			if(this.isLoad) {
				this.PageIndex++
				this.getMyTeamPageList()
			}
			
		},

	}
</script>

<style lang="scss" scoped>
	@import url("./style.scss");
</style>
