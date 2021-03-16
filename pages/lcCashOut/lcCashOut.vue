<template>
	<view>
		<view class="top-select">
			<view class="select-item bb circelgreen">
					点卡账户
			</view>
			<view class="select-item circelred">
					USDT账户
			</view>
			<view class="right-img">
				<image src="@/static/btn.png" class="img" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="text">
			币种
		</view>
		<view class="Type fwbig">
			USDT
		</view>
		<view class="cashout">
			<view class="number">
				数量
			</view>
			<view class="number-item">
				<input placeholder="请输入提币数量" v-model="LCNums"  @blur="calcusdt" />
				<view class="number-right">
					<view class="wid">
						点卡
					</view>
					<view class="borderleft wid" @click="getAll">
						全部
					</view>
				</view>
			</view>
			<view class="numbers">
				可用 {{ LCNum }} 点卡
			</view>
			<view class="number">
				支付密码
			</view>
			<view class="number-item">
				<input placeholder="请输入支付密码" type="password" v-model="payPassword" />
			</view>
			<view class="Type fwsmall">
				为保障资金安全，该账户安全策略变更，密码修改，我们会对转换进行人工审核，请耐心等待工作人员电话或邮件联系
			</view>
			<view class="bottom">
				<view class="bottom-left">
					到账数量
				</view>
				<view class="bottom-right">
					{{ usdtNum }} USDT
				</view>
			</view>
			<view class="footer">
				转换
			</view>
		</view>
	</view>
</template>

<script>
	import { GetUserAssetsInfo} from '@/common/js/http.js'
	export default {
		data() {
			return {
				UserId: '',
				Token: '',
				LCNum: 0,
				usdtNum: 0,
				LCNums: '',
				payPassword: ''
			}
		},
		onLoad() {
			this.UserId = uni.getStorageSync('userId')
			this.Token = uni.getStorageSync('token')
			this.getUserInfo()
		},
		methods: {
			getAll(){
				this.LCNums = this.LCNum
				this.calcusdt()
			},
			//计算预计提现多少lc
			calcusdt(){
				
			},
			async getUserInfo(){
				let params = {
					UserId: this.UserId,
					Token: this.Token
				}
				let { data } = await GetUserAssetsInfo(params)
				if(data.code != 0) return
				this.LCNum = data.data.lc
			}
		} 
	}
</script>

<style scoped>
	@import url("./style");
	@import url("~@/common/css/lcSame.css");

</style>
