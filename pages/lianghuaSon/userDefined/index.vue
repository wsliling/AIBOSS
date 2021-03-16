<template>
	<view>
		<header-bar :title="title" titleTintColor="#000" :bgColor='bgColor' :center='center' :isBack="true">
			<view @tap="goBack" slot="back" class="uni_btnIco iconfont icon-xiaoyufuhao"></view>
			<view slot="string">
				<!-- <view @click="clickSave" class="save-view"> -->
				<view @click="clickSave" class="save-view fs-18">
					保存
				</view>
			</view>
		</header-bar>

		<!-- <view :style="{'padding-top':customBar+'rpx'}" class="header">
				<view class="header-left width iconfont icon-xiaoyufuhao" @click="back">
			
				</view>
				<view class="header-center">
					{{ coinName }}
				</view>
				<view class="header-right width" @click="toLookCourse">
					查看教程
				</view>
			</view> -->
		<view class="content-box fs-20">
			<view class="item-wrapper ">
				<!-- 币种选择 -->
				<!-- <view class="item">
					<view class="item-left">
						币种选择
					</view>
					<view @click="openPop('币种选择','bizhong')" class="item-right">
						<view class="gray" :class="[bizhong.length ? 'black' : '']"> {{ bizhong ? bizhong : '请选择' }}</view>
						<view class="iconfont icon-dayuhao"></view>
					</view>
				</view> -->
				<user-defined-item-coin v-if='isEdit == 0' :type='1' lable='币种选择' currentBianliang='CurrencyGroupId' :list='CurrencyGroupIdArr'
				 @changeChoiceCoin="changeChoiceCoin($event,'CurrencyGroupId')" @queding='queding'></user-defined-item-coin>
				<user-defined-item v-if='isEdit == 1' :type='1' lable='币种选择' currentBianliang='CurrencyGroupId' :list='CurrencyGroupIdArr'
				 @changeChoice="changeChoice($event,'CurrencyGroupId')" @queding='queding'></user-defined-item>
				<!-- 首单金额 -->
				<!-- <user-defined-item :type='2' lable='首单金额' currentBianliang='FirstAmount' placeholder='请输入金额(usdt)' @inputChange="inputChange($event,'FirstAmount')"></user-defined-item> -->
				<view class="item">
					<view class="item-left fs-18">
						首单金额
					</view>
					<view class="item-right">
						<input type="digit" v-model="FirstAmount" placeholder="请输入金额" />
					</view>
				</view>
				<!-- 监视时长 -->
				<view class="item">
					<view class="item-left fs-18">
						监视时长
					</view>
					<view class="item-right">
						<input type="digit" v-model="MonitorDuration" placeholder="请输入" />
						<view class="minute fs-18">分钟</view>
					</view>
				</view>
				<!-- <user-defined-item :type='2' lable='监视时长' currentBianliang='MonitorDuration' placeholder='请输入' unit='分钟'
				 @inputChange="inputChange($event,'MonitorDuration')"></user-defined-item> -->
				<!-- 买入跌幅 -->
				<view class="item fudu">
					<view class="item-left w300">
						<view class="item-left-left fs-18">
							买入跌幅
						</view>
						<view class="item-right-right">
							<input type="digit" v-model="BuyFallRatio" placeholder="请输入" />
							<view class="percent fs-18">%</view>
						</view>
					</view>
					<view class="item-left w300 fs-18">
						<view class="item-left-left">
							回调比例
						</view>
						<view class="item-right-right">
							<input type="digit" v-model="BuyCallbackScale" placeholder="请输入" />
							<view class="percent fs-18">%</view>
						</view>
					</view>
				</view>
				<!-- 买入涨幅 -->
				<view class="item w100">
					<view class="item-left fs-18">
						买入涨幅
					</view>
					<view class="item-right">
						<input type="digit" v-model="BuyRiseRatio" />
						<view class="percent fs-18">%</view>
					</view>
				</view>
				<!-- 卖出涨幅 -->
				<view class="item fudu">
					<view class="item-left w300">
						<view class="item-left-left fs-18">
							卖出涨幅
						</view>
						<view class="item-right-right">
							<input type="digit" v-model="SellRiseRatio" placeholder="请输入" />
							<view class="percent fs-18 fs-18">%</view>
						</view>
					</view>
					<view class="item-left w300">
						<view class="item-left-left fs-18">
							回调比例
						</view>
						<view class="item-right-right">
							<input type="digit" v-model="SellCallbackScale" placeholder="请输入" />
							<view class="percent fs-18">%</view>
						</view>
					</view>
				</view>
				<!-- 补仓单套利出货 -->
				<!-- <view class="item">
					<view class="item-left">
						补仓单套利出货
					</view>
					<view @click="openPop('币种选择','bizhong')" class="item-right">
						<view class="gray" :class="[bizhong.length ? 'black' : '']">请选择</view>
						<view class="iconfont icon-dayuhao"></view>
					</view>
				</view> -->
				<user-defined-item :type='1' lable='补仓单套利出货' currentBianliang='IsReplenish' :list='IsReplenishArr' @changeChoice="changeChoice($event,'IsReplenish')"></user-defined-item>
				<!-- 最多补仓次数 -->
				<view class="item">
					<view class="item-left fs-18">
						最多补仓次数
					</view>
					<view class="item-right">
						<input type="digit" v-model="MaxReplenishNum" placeholder="请输入次数" />
					</view>
				</view>
				<!-- 补仓参考价 -->
				<!-- <view class="item">
					<view class="item-left">
						补仓参考价
					</view>
					<view class="item-right">
						<view class="gray">请选择</view>
						<view class="iconfont icon-dayuhao"></view>
					</view>
				</view> -->
				<!-- <user-defined-item :type='1' lable='补仓参考价' currentBianliang='ReplenishPriceWay' :list='ReplenishPriceWayArr'
				 @changeChoice="changeChoice($event,'ReplenishPriceWay')"></user-defined-item> -->
				<!-- 盈利关闭补仓单套利 -->
				<!-- <view v-if="isJoin == 1" class="item"> -->
				<!-- <view class="item">
					<view class="item-left fs-18">
						盈利关闭补仓单套利
					</view>
					<view class="item-right">
						<switch :checked="!!IsReplenishGain" @change="switchChange($event,'IsReplenishGain')" color='#02D48F' />
					</view>
				</view> -->
				<!-- 在第*次补仓关闭补仓单参与套利 -->
				<!-- <view  v-if="isJoin == 1" class="item">
					<view class="item-left fs-18">
						在第*次补仓关闭补仓单参与套利
					</view>
					<view class="item-right">
						<input type="digit" v-model='ReplenishCloseNum' placeholder="请输入次数" />
					</view>
				</view> -->
				<!-- 在第*次补仓开启补仓单参与套利 -->
				<!-- <view  v-if="isJoin == 0" class="item">
					<view class="item-left fs-18">
						在第*次补仓开启补仓单参与套利
					</view>
					<view class="item-right">
						<input type="digit" v-model='ReplenishOpenNum' placeholder="请输入次数 " />
					</view>
				</view> -->
				<!-- <user-defined-item lable='在第*次补仓关闭补仓单参与套利' @change="change($event,'buchangguanbi')" :value='buchangguanbi'></user-defined-item> -->
				<!-- <view @click="openPop('行情价格采用','MarketPriceWay')" class="item">
					<view class="item-left">
						行情价格采用
					</view>
					<view class="item-right">
						<view class="gray">{{ MarketPriceWay ? MarketPriceWay : '请选择' }}</view>
						<view class="iconfont icon-dayuhao"></view>
					</view>
				</view> -->
				<!-- 行情价格采用 -->
				<!-- <user-defined-item :type='1' lable='行情价格采用' currentBianliang='MarketPriceWay' :list='MarketPriceWayArr'
				 @changeChoice="changeChoice($event,'MarketPriceWay')"></user-defined-item> -->
				<!-- 部分完成撤单 -->
				<!-- <user-defined-item :type='1' lable='部分完成撤单' currentBianliang='PartUndoWay' :list='PartUndoWayArr' @changeChoice="changeChoice($event,'PartUndoWay')"></user-defined-item> -->
				<!-- 强制撤销下单超过时长 -->
				<!-- <view class="item">
					<view class="item-left fs-18">
						强制撤销下单超过时长
					</view>
					<view class="item-right">
						<input type="digit" v-model="UndoDuration" placeholder="请输入" />
						<view class="minute fs-18">分钟</view>
					</view>
				</view> -->
				<!-- 回调调整系数 -->
				<view class="item">
					<view class="item-left fs-18">
						回调调整系数
					</view>
					<view class="item-right">
						<input type="digit" v-model="CallbackTrimRatio" placeholder="请输入" />
					</view>
				</view>
				<!-- 危险振幅 -->
				<view class="item fudu">
					<view class="item-left w410">
						<view class="item-left-left fs-18">
							危险振幅检测
						</view>
						<view class="item-right-right">
							<input type="digit" v-model="RiskFlapRangeRatio" placeholder="请输入" />
							<view class="percent fs-18">%</view>
						</view>
					</view>
					<view class="item-left w280">
						<view class="item-left-left fs-18">
							在
						</view>
						<view class="item-right-right">
							<input type="digit" v-model="RiskFlapRangeCheck" placeholder="请输入" />
							<view class="percent fs-18">分钟</view>
						</view>
					</view>
				</view>
				<!-- 检测危险振幅(在*分钟内不买入） -->
				<view class="item">
					<view class="item-left fs-18">
						检测危险振幅(在*分钟内不买入)
					</view>
					<view class="item-right">
						<input type="digit" v-model="RiskFlapRangeRepair" placeholder="请输入" />
						<view class="minute fs-18">分钟</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="!ReplenishWay" class="content-box mt20">
			<view class="item-wrapper">
				<!-- 补仓倍率 -->
				<view class="item" :class="[ReplenishWay ? 'gray' : '']">
					<view class="item-left fs-18">
						补仓倍率
					</view>
					<view class="item-right">
						<input :disabled="!!ReplenishWay" type="digit" v-model="ReplenishRate" placeholder="请输入" />
					</view>
				</view>
				<!-- 补仓跌幅 -->
				<view class="item" :class="[ReplenishWay ? 'gray' : '']">
					<view class="item-left fs-18">
						补仓跌幅
					</view>
					<view class="item-right">
						<input :disabled="!!ReplenishWay" type="digit" v-model="ReplenishFallRatio" placeholder="请输入" />
					</view>
				</view>
				<!-- 回调比例 -->
				<view class="item" :class="[ReplenishWay ? 'gray' : '']">
					<view class="item-left fs-18">
						回调比例
					</view>
					<view class="item-right">
						<input :disabled="!!ReplenishWay" type="digit" v-model="ReplenishCallbackScale" placeholder="请输入" />
					</view>
				</view>
			</view>

		</view>

		<view class="content-box mt20">
			<view class="item-wrapper fs-18">
				<!-- 启用高级补仓(启用后上面三个参数不能设置) -->
				<view class="item">
					<view class="item-left fs-18">
						启用高级补仓<text class="fss-24 gray fs-12">(启用后上面三个参数不能设置)</text>
					</view>
					<view class="item-right">
						<switch :checked="!!ReplenishWay" @change="switchChange($event,'ReplenishWay')"  />
					</view>
				</view>
			</view>
		</view>
		<!-- 高级补仓盒子start -->
		<!-- StrategyGuidList: {
			ReplenishMode: '', // int	补仓风格 0-按买入金额 1-按已购入资产
			ReplenishRate: '', // int	补仓倍率%
			ReplenishFallRatio: '', // int	补仓跌幅%
			ReplenishCallbackScale: '', // int	补仓回调%
		}, -->
		<view v-if="ReplenishWay" class="cover-box">
			<view class="cover-title-box">
				<view class="cover-title-item fs-18">
					补仓方式
				</view>
				<view class="cover-title-item fs-18">
					补仓倍率
				</view>
				<view class="cover-title-item fs-18">
					补仓跌幅
				</view>
				<view class="cover-title-item fs-18">
					回调比例
				</view>
			</view>
			<view class="cover-content">
				<view class="cover-content-row" v-for="(item,index) in StrategyGuidList" :key='index'>
					<view @tap="clickItem(item,index)" v-if="buttonDel == 1" class="dui-box">
						<view class="IconsCK IconsCK-radio" :class="{'checked': item.IsSelect}" style="margin-right: 8upx;">
						</view>
					</view>

					<view class="cover-content-item border-right-1">
						<!-- 按买入金额 -->
						{{ !!item.ReplenishMode == 0 ? '按买入金额' : '按已购入资产' }}
					</view>
					<input :disabled="!!buttonIsEdit" type="digit" v-model="item.ReplenishRate" class="cover-content-item border-right-1"
					 :class="[!!buttonIsEdit ? 'gray' : '']" placeholder="请输入">
					<!-- 100 -->
					<!-- {{ item.ReplenishRate }} 
						</view> -->
					<input :disabled="!!buttonIsEdit" type="digit" v-model="item.ReplenishFallRatio" class="cover-content-item border-right-1"
					 :class="[!!buttonIsEdit ? 'gray' : '']" placeholder="请输入">
					<!-- 2 -->
					<!-- 		{{ item.ReplenishFallRatio }}
					</view> -->
					<input :disabled="!!buttonIsEdit" type="digit" v-model="item.ReplenishCallbackScale" class="cover-content-item"
					 :class="[!!buttonIsEdit ? 'gray' : '']" placeholder="请输入">
					<!-- 0.2 -->
					<!-- 		{{ item.ReplenishCallbackScale }}
					</view> -->
				</view>
				<!-- <view class="cover-content-row">
					<view class="cover-content-item border-right-1">
						按已购入资产
					</view>
					<view class="cover-content-item border-right-1">
						100
					</view>
					<view class="cover-content-item border-right-1">
						2
					</view>
					<view class="cover-content-item">
						0.2
					</view>
				</view> -->
				<!-- 按钮功能 -->
				<!-- 添加补仓方式的弹窗 -->
				<user-defined-item style='position: fixed;left: 10000px;top: 10000px;z-index:1;' ref='bucangWay' :type='1' lable='补仓方式'
				 currentBianliang='buttonAdd' :list='buttonAddArr' @changeChoice="changeChoice($event,'buttonAdd')"></user-defined-item>

				<view class="cover-button-box">
					<view @tap='clickButtonAdd' class="cover-button-item">
						<image src="/static/zidingyi/jia1.png" mode="widthFix"></image>
						<view class="cover-button-text">
							添加
						</view>
					</view>
					<view v-if="StrategyGuidList.length" @tap='clickButtonIsEdit' class="cover-button-item">
						<image src="/static/zidingyi/edit1.png" mode="widthFix"></image>
						<view class="cover-button-text">
							修改
						</view>
					</view>
					<view v-if="StrategyGuidList.length" @tap='clickButtonDel' class="cover-button-item">
						<image src="/static/zidingyi/del1.png" mode="widthFix"></image>
						<view class="cover-button-text">
							删除
						</view>
					</view>
				</view>
			</view>
			<!-- 高级补仓盒子end -->
		</view>
		<!-- 循环策略 -->
		<view class="content-box mt20">
			<view class="item-wrapper">
				<!-- 执行策略循环 -->
				<!-- <view class="item">
					<view class="item-left fs-18" :class="[!!IsStopPolicyLoop ? 'gray': '']">
						执行策略循环
					</view>
					<view class="item-right">
						<switch :disabled="!!IsStopPolicyLoop" :checked="!!IsPolicyLoop" @change="switchChange($event,'IsPolicyLoop')"
						 color='#02D48F' />
					</view>
				</view> -->
				<!-- 策略循环完成后停止 -->
				<!-- <view class="item">
					<view class="item-left fs-18" :class="[!!IsPolicyLoop ? 'gray': '']">
						策略循环完成后停止
					</view>
					<view class="item-right">
						<switch :disabled="!!IsPolicyLoop" :checked="!!IsStopPolicyLoop" @change="switchChange($event,'IsStopPolicyLoop')"
						 color='#02D48F' />
					</view>
				</view> -->
				
				<!-- 改版 -->
				<!-- 执行策略循环 -->
				<view class="item">
					<view class="item-left fs-18" :class="[!!IsStopPolicyLoop ? 'gray': '']">
					<!-- <view class="item-left fs-18"> -->
						执行策略循环
					</view>
					<view class="item-right">
						<switch  :disabled="!!IsStopPolicyLoop"  :checked="!!IsPolicyLoop" @change="switchChange($event,'IsPolicyLoop')"
						 />
					</view>
				</view>
				<!-- 策略循环完成后停止 -->
				<view class="item">
					<view class="item-left fs-18" :class="[!!IsPolicyLoop ? 'gray': '']">
					<!-- <view class="item-left fs-18"> -->
						策略循环完成后停止
					</view>
					<view class="item-right">
						<switch  :disabled="!!IsPolicyLoop" :checked="!!IsStopPolicyLoop" @change="switchChange($event,'IsStopPolicyLoop')"
						 />
					</view>
				</view>
				
			</view>
		</view>

		<!-- 按钮 -->
		<view @tap='submit' class="kaishilianghua fs-18">
			开始量化
		</view>
		<!-- 弹窗 -->
		<!-- <uni-popup ref='popup' type="bottom" :maskClick="maskClick">
			<view class="pop-box">
				<view class="pop-title">
					{{ popTitle }}
				</view>
				<view @click="clickChoice(item,index)" class="pop-item" v-for="(item,index) in list" :key='index'>
					<view class="pop-item-left">
						{{ item.lable }}
					</view>
					<view class="pop-item-right" :class="[item.active ?  'active' : '']">
						<view class="iconfont icon-dui"></view>
					</view>
				</view>
				<view @click="closePop('popup')" class="close-button">
					关闭
				</view>
			</view>
		</uni-popup> -->

	</view>

</template>

<script>
	import {
		post,
		get,
		navigate,
		switchTab,
		redirect,
		judgeLogin,
		toast,
		trim,
	} from '@/common/utils/index.js';
	export default {

		data() {
			return {
				isClickSave: false,
				// 是否是编辑
				isEdit: 0,
				// 货币id
				id: 0,


				userId: '',
				token: '',

				timer: null,
				customBar: this.customBar,
				coinName: '',
				bgColor: {
					'background': '#fff',
				},
				title: '自定义策略',
				center: true,
				isBack: true,
				diefu: '',
				// 当前变量
				currentBianliang: '',
				// 当前placeholder
				currentPlaceholder: '',
				// 1 币种
				CurrencyGroupId: '',
				// 所有币种的数组
				CurrencyGroupIdArr: [],
				// 2 首单金额 首单金额：首次买入金额，以计价币为计量单位。
				FirstAmount: '',
				// 3 监视时长 int	监视时长（分钟）
				MonitorDuration: '',
				// 41 买入跌幅  init 买入跌幅%
				BuyFallRatio: '',
				// 42 买入跌幅-回调比例 init 买入回调%
				BuyCallbackScale: '',
				// 5 买入涨幅 init 买入涨幅%
				BuyRiseRatio: '',


				// 61 卖出涨幅  int	卖出涨幅%
				SellRiseRatio: '',
				// 62 卖出涨幅-回调比例 int	卖出回调%
				SellCallbackScale: '',

				// 7 补仓单套利出货 int	补仓单套利出货 0-不参与套利 1-参与套利
				IsReplenish: '',
				IsReplenishArr: [{
						id: 0,
						lable: '不参与套利',
						active: false
					},
					{
						id: 1,
						lable: '参与套利',
						active: false
					},
				],
				// 8 最多补仓次数 int	最多补仓次数
				MaxReplenishNum: '',
				// 9 补仓参考价  int	补仓参考价 0-最后买入价 1-买入平均价 2-最后卖出价 3-首次买入
				ReplenishPriceWay: '',
				ReplenishPriceWayArr: [{
						id: 0,
						lable: '最后买入价',
						active: false
					},
					{
						id: 1,
						lable: '买入平均价',
						active: false
					},
					{
						id: 2,
						lable: '最后卖出价',
						active: false
					},
					{
						id: 3,
						lable: '首次买入',
						active: false
					},
				],
				// 10 盈利关闭补仓单套利 int	0-默认 1-盈利关闭补仓单套利：在浮亏变为正数时，设置关闭即可关闭补仓单参与套利功能，有利于快速整体卖出。此功能只适用于“补仓单参与套利”。
				IsReplenishGain: 0,

				// 101 在第*次补仓关闭补仓单参与套利 init
				ReplenishCloseNum: '',
				// 102 在第*次补仓开启补仓单参与套利 init
				ReplenishOpenNum: '',
				// 11 行情价格采用 	int	行情价格采用 0-买（卖）一价 1-买（卖）一至二价
				MarketPriceWay: '',
				MarketPriceWayArr: [{
						id: 0,
						lable: '买（卖）一价',
						active: false
					},
					{
						id: 1,
						lable: '买（卖）一至二价',
						active: false
					},
				],
				// 12 部分完成撤单 int	部分完成撤单 0-部分完成不撤销 1-部分完成强制撤销（仅买单） 2-部分完成强制撤销（买卖单）
				PartUndoWay: '',
				PartUndoWayArr: [{
						id: 0,
						lable: '部分完成不撤销',
						active: false
					},
					{
						id: 1,
						lable: '部分完成强制撤销(仅买单)',
						active: false
					},
					{
						id: 2,
						lable: '部分完成强制撤销(买卖单)',
						active: false
					},
				],
				// 13 强制撤销下单超过时长 int	强制撤销下单超过时长（分钟）
				UndoDuration: '',
				// 14 回调调整系数 int	回调调整系数
				CallbackTrimRatio: '',
				// 151 危险振幅检测	int	危险振幅%
				RiskFlapRangeRatio: '',
				// 152 危险振幅检测分钟数  int	危险振幅检测（分钟）
				RiskFlapRangeCheck: '',
				// 16  检测危险振幅(在*分钟内不买入) int	检测危险振幅（在*分钟内不买入）
				RiskFlapRangeRepair: '',


				// 常规补仓 
				// 17 补仓倍率 init
				ReplenishRate: '',
				// 18 补仓跌幅 init
				ReplenishFallRatio: '',
				// 19 补仓回调比例 init
				ReplenishCallbackScale: '',
				// 20 启用高级补仓 init int	补仓方式 0-常规补仓 1-高级补仓(启用后常规补仓将失效)
				ReplenishWay: 0,
				// ReplenishWay: 1,


				// 高级补仓
				StrategyGuidList: [
					// {
					// 	ReplenishMode: '', // int	补仓风格 0-按买入金额 1-按已购入资产
					// 	ReplenishRate: 0, // int	补仓倍率%
					// 	ReplenishFallRatio: 0, // int	补仓跌幅%
					// 	ReplenishCallbackScale: 0, // int	补仓回调%
					// 	IsSelect: false
					// },
					// {
					// 	ReplenishMode: '', // int	补仓风格 0-按买入金额 1-按已购入资产
					// 	ReplenishRate: 1, // int	补仓倍率%
					// 	ReplenishFallRatio: 0, // int	补仓跌幅%
					// 	ReplenishCallbackScale: 0, // int	补仓回调%
					// 	IsSelect: false
					// },
					// {
					// 	ReplenishMode: '', // int	补仓风格 0-按买入金额 1-按已购入资产
					// 	ReplenishRate: 2, // int	补仓倍率%
					// 	ReplenishFallRatio: 0, // int	补仓跌幅%
					// 	ReplenishCallbackScale: 0, // int	补仓回调%
					// 	IsSelect: false
					// },
				],

				// 高级补仓的按钮状态
				buttonDel: 0, // 0 是初始状态,点击进入选中状态,删除功能, 1  是删除功能
				buttonIsEdit: 1, // , 0是全部可以修改状态 1 是初始状态,禁用编辑
				// 添加补仓方式的数组,两个
				buttonAdd: '',
				buttonAddArr: [{
						id: 0,
						lable: '按买入金额',
						active: false
					},
					{
						id: 1,
						lable: '按已购入资产',
						active: false
					},
				],

				// 循环策略
				// 执行策略循环
				IsPolicyLoop: 0, //  int	0-默认 1-执行策略循环
				// 策略循环完成后停止
				IsStopPolicyLoop: 0, // int	0-默认 1-策略循环完成后停止

				// buchangguanbi: '',
				buchang: '',
				current: -1,
				maskClick: true,
				popTitle: '',
				// 当前的显示的弹窗数组
				currentPopArr: [],
				list: [{
						id: 0,
						lable: '最后买入价',
						active: false
					},
					{
						id: 1,
						lable: '买入平均价',
						active: false
					},
					{
						id: 2,
						lable: '最后卖出价',
						active: false
					},
					{
						id: 3,
						lable: '首次买入价',
						active: false
					},
				],
			}
		},
		components: {

		},
		computed: {
			isJoin() {
				let res = this.IsReplenish
				return res
			},
		},
		onLoad(e) {
			console.log('eeee', e)
			this.isEdit = e.isEdit
			this.id = e.id
		},
		onShow() {
			this.init()
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			changeChoiceCoin({
				arr,
				index
			}, bianliang) {
				console.log('changeChoiceCoin的arr 和 index', arr, index)
				let tempBianliang = bianliang + 'Arr'
				this[tempBianliang][index].active = !this[tempBianliang][index].active

			},
			queding(arr) {
				this.CurrencyGroupIdArr = arr
				console.log('传输上来的this.CurrencyGroupIdArr', this.CurrencyGroupIdArr)
				// this.CurrencyGroupId
				let tempArr = []
				this.CurrencyGroupIdArr.map((item, index) => {
					if (item.active == true) {
						tempArr.push(item.id)
					}
				})
				this.CurrencyGroupId = tempArr.join(',')

			},
			// changeChoiceCoin(index, bianliang) {
			// 	// this.current = index
			// 	console.log('changeChoiceCoin选择的索引', index)
			// 	let tempBianliang = bianliang + 'Arr'
			// 	// this.list.map((item2, index2) => {
			// 	// this.$set(this.list[index2], 'active', false)
			// 	// })
			// 	console.log('this[tempBianliang][index].active 前名',this[tempBianliang][index].active )
			// 	// this[tempBianliang][index].active = !this[tempBianliang][index].active
			// 	let myTempArr2 = JSON.parse(JSON.stringify(this[tempBianliang]))
			// 	// this.$set(this[tempBianliang][index], 'active', !myTempArr2[index].active)
			// 	this[tempBianliang][index].active = !myTempArr2[index].active

			// 	console.log('this[tempBianliang][index].active 后面',this[tempBianliang][index].active )
			// 	let tempCurrencyGroupId = ''
			// 	console.log('changeChoiceCoin选择的tempBianliang', tempBianliang, this[tempBianliang][index])
			// 	this[tempBianliang].map((item2, index2) => {
			// 		// this.$set(this[tempBianliang][index2], 'active', false)
			// 		// this.$set(this[tempBianliang][index2], 'active', false)
			// 		if(index2 == index) {
			// 			tempCurrencyGroupId = tempCurrencyGroupId + ',' + this[tempBianliang][index].id
			// 			 // this.$set(this[tempBianliang][index2], 'active', !this[tempBianliang][index2].active)
			// 			 // this[tempBianliang][index2].active = !this[tempBianliang][index2].active

			// 		}

			// 	})

			// 	this.CurrencyGroupId = tempCurrencyGroupId
			// 	console.log('选中货币数组字符串',this.CurrencyGroupId)
			// 	this.$set(this[tempBianliang][index], 'active', true)
			// 	// this[bianliang] = this.list[index].lable
			// 	// this[bianliang] = index
			// 	this[bianliang] = this[tempBianliang][index].id
			// },
			// type: 1 
			// 改变了选择,组件上传上来
			changeChoice(index, bianliang) {
				// this.current = index
				console.log('选择的索引', index)
				let tempBianliang = bianliang + 'Arr'
				// this.list.map((item2, index2) => {
				// this.$set(this.list[index2], 'active', false)
				// })
				console.log('选择的tempBianliang', tempBianliang, this[tempBianliang][index])
				this[tempBianliang].map((item2, index2) => {
					// this.$set(this[tempBianliang][index2], 'active', false)
					this.$set(this[tempBianliang][index2], 'active', false)
				})
				this.$set(this[tempBianliang][index], 'active', true)
				// this[bianliang] = this.list[index].lable
				// this[bianliang] = index
				this[bianliang] = this[tempBianliang][index].id
				// 添加高级补仓方式
				if (tempBianliang == 'buttonAddArr') {
					console.log('添加高级补仓方式')
					let mytemp2 = {
						ReplenishMode: this[bianliang], // int	补仓风格 0-按买入金额 1-按已购入资产
						// ReplenishRate: 0, // int	补仓倍率%
						// ReplenishFallRatio: 0, // int	补仓跌幅%
						// ReplenishCallbackScale: 0, // int	补仓回调%
						ReplenishRate: '', // int	补仓倍率%
						ReplenishFallRatio: '', // int	补仓跌幅%
						ReplenishCallbackScale: '', // int	补仓回调%
						IsSelect: false
					}
					this.StrategyGuidList.push(mytemp2)
				}
				// console.log('this.bizhong',this.bizhong)
				// this.buchang = this.list[index].lable
				// 当前点击的变量item
				// this[this.currentBianliang] = this.list[index].lable
				// this[this.currentBianliang] = this[tempBianliang][index].lable
				// this[tempBianliang]
				// if (this.timer !== null) {
				// 	clearTimeout(this.timer)
				// 	this.timer = null
				// 	return
				// }
				// this.timer = setTimeout(() => {
				// 	// 关闭弹窗
				// 	this.closePop()
				// 	clearTimeout(this.timer)
				// 	this.timer = null
				// }, 100)
				// this.$once('hook:beforeDestroy', () => {
				// 	clearTimeout(this.timer)
				// 	this.timer = null;
				// })
			},
			// type: 2
			inputChange(e, bianliang) {
				this[bianliang] = e
			},

			openPop(popTitle, currentBianliang) {
				// 当前点击的变量item
				this.currentBianliang = currentBianliang
				this.popTitle = popTitle
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
			// 切换switch
			switchChange(e, bianliang) {
				console.log(e.detail.value,bianliang)
				if (e.detail.value) {
					e.detail.value = 1
				} else {
					e.detail.value = 0
				}
				let value = e.detail.value
				
				if(bianliang =='IsPolicyLoop' && value == 1 && this.IsStopPolicyLoop == 1) {
					// 执行策略循环
					toast('策略循环完成后停止已启用,不能启用执行策略循环')
					return
				}
				if(bianliang == 'IsStopPolicyLoop' && value == 1 && this.IsPolicyLoop == 1) {
					// 策略循环完成后停止
					toast('执行策略循环已启用,不能启用策略循环完成后停止')
					return
				}

				this[bianliang] = e.detail.value
				
				
				// console.log(bianliang,this.IsPolicyLoop,this.IsStopPolicyLoop)
				// this[bianliang] = value
				
				// console.log('变了',bianliang,value)
				// if(bianliang = 'IsPolicyLoop' && value == 1) {
				// 	// this.IsPolicyLoop = 1
				// 	// this.IsStopPolicyLoop = 0
					
				// 	this.$set(this,'IsPolicyLoop',1)
				// 	this.$set(this,'IsStopPolicyLoop',0)
				// 	// this.$set(this,'IsStopPolicyLoop',0)
				// 	this.$forceUpdate()
				// }
				//  if(bianliang = 'IsStopPolicyLoop' && value == 1) {
				// 	// this.IsPolicyLoop = 0
				// 	// this.IsStopPolicyLoop = 1
				// 	this.$set(this,'IsPolicyLoop',0)
				// 	this.$set(this,'IsStopPolicyLoop',1)
				// 	this.$forceUpdate()
				// }
				// console.log(this.IsPolicyLoop,this.IsStopPolicyLoop)
			},
			
			
			// 点击选择
			// clickChoice(item, index) {
			// 	this.current = index
			// 	// this.list.map((item2, index2) => {
			// 	this.list.map((item2, index2) => {
			// 		this.$set(this.list[index2], 'active', false)
			// 	})
			// 	this.$set(this.list[index], 'active', true)
			// 	// this.buchang = this.list[index].lable
			// 	// 当前点击的变量item
			// 	this[this.currentBianliang] = this.list[index].lable
			// 	// if(this.timer != null) return
			// 	// if (this.timer !== null) {
			// 	// 	clearTimeout(this.timer)
			// 	// 	this.timer = null
			// 	// 	return
			// 	// }
			// 	// this.timer = setTimeout(() => {
			// 	// 	// 关闭弹窗
			// 	// 	this.closePop()
			// 	// 	clearTimeout(this.timer)
			// 	// 	this.timer = null
			// 	// }, 100)

			// 	// this.$once('hook:beforeDestroy', () => {
			// 	// 	clearTimeout(this.timer)
			// 	// 	this.timer = null;
			// 	// })

			// },
			change(e, lable) {
				// console.log(name, e)
				console.log('父更新前: ', this[lable])
				this[lable] = e
				console.log('父更新后: ', this[lable])
			},
			changeYingli(e) {
				console.log('盈利关闭补仓单套利 发生 change 事件，携带值为', e.target.value)
			},
			init() {
				// 获取币种列表
				this.getAllCurrencyList()

			},
			// 点击保存
			clickSave() {
				this.isClickSave = true
				let res = this.checkAll()
				// this.IsPolicyLoop = 0
				// this.IsStopPolicyLoop = 0
				if (res == false) {
					return
				}
				this.currencyStrategy()
			},
			// 点击开始量化
			submit() {
				this.isClickSave = false
				let res = this.checkAll()
				if (res == false) return
				this.currencyStrategy()
			},
			// 表单验证	检测哪些为空
			checkAll() {
				console.log('币种id',typeof(this.CurrencyGroupId),this.CurrencyGroupId)
				// 1 币种
				// if (this.CurrencyGroupId == 'undefined') {
				if (this.myTrim(this.CurrencyGroupId).length == 0) {
					toast('币种未选择~')
					return false
				}
				// 2 首单金额 首单金额：首次买入金额，以计价币为计量单位。
				if (this.myTrim(this.FirstAmount).length == 0) {
					toast('首单金额不能为空~')
					return false
				}
				if (Number(this.FirstAmount) <= 0) {
					toast('首单金额必须大于0')
					return false
				}
				// 3 监视时长 int	监视时长（分钟）
				if (this.myTrim(this.MonitorDuration).length == 0) {
					toast('监视时长不能为空~')
					return false
				}
				// 41 买入跌幅  init 买入跌幅%
				if (this.myTrim(this.BuyFallRatio).length == 0) {
					toast('买入跌幅不能为空~')
					return false
				}
				// 42 买入跌幅的回调比例 init 买入回调%
				if (this.myTrim(this.BuyCallbackScale).length == 0) {
					toast('买入跌幅的回调比例不能为空~')
					return false
				}
				// 5 买入涨幅 init 买入涨幅%
				if (this.myTrim(this.BuyRiseRatio).length == 0) {
					toast('买入涨幅不能为空~')
					return false
				}
				// 61 卖出涨幅  int	卖出涨幅%
				if (this.myTrim(this.SellRiseRatio).length == 0) {
					toast('卖出涨幅不能为空~')
					return false
				}
				// 62 卖出涨幅-回调比例 int	卖出回调%
				if (this.myTrim(this.SellCallbackScale).length == 0) {
					toast('卖出涨幅的回调比例不能为空~')
					return false
				}
				// 7 补仓单套利出货 int	补仓单套利出货 0-不参与套利 1-参与套利
				if (this.myTrim(this.IsReplenish).length == 0) {
					toast('补仓单套利出货未选择~')
					return false
				}
				// 8 最多补仓次数 int	最多补仓次数
				// console.log('最多补仓次数',this.MaxReplenishNum)
				if (this.myTrim(this.MaxReplenishNum).length == 0) {
					toast('最多补仓次数比例不能为空~')
					return false
				}
				// 9 补仓参考价  int	补仓参考价 0-最后买入价 1-买入平均价 2-最后卖出价 3-首次买入
				if (this.myTrim(this.ReplenishPriceWay).length == 0) {
					toast('补仓参考价未选择~')
					return false
				}
				// 10 盈利关闭补仓单套利 int	0-默认 1-盈利关闭补仓单套利：在浮亏变为正数时，设置关闭即可关闭补仓单参与套利功能，有利于快速整体卖出。此功能只适用于“补仓单参与套利”。
				// if( this.IsReplenishGain  == 0) {
				// 	toast('盈利关闭补仓单套利不能为空~')
				// 	return false
				// }

				// 101 在第*次补仓关闭补仓单参与套利 init
				if (this.myTrim(this.ReplenishCloseNum).length == 0 && this.IsReplenish == 1) {
					toast('在第*次补仓关闭补仓单参与套利不能为空~')
					return false
				}
				// 102 在第*次补仓开启补仓单参与套利 init
				if (this.myTrim(this.ReplenishOpenNum).length == 0  && this.IsReplenish == 0) {
					toast('在第*次补仓开启补仓单参与套利不能为空~')
					return false
				}
				// 11 行情价格采用 	int	行情价格采用 0-买（卖）一价 1-买（卖）一至二价
				if (this.myTrim(this.MarketPriceWay).length == 0) {
					toast('行情价格采用未选择~')
					return false
				}
				// 12 部分完成撤单 int	部分完成撤单 0-部分完成不撤销 1-部分完成强制撤销（仅买单） 2-部分完成强制撤销（买卖单）
				if (this.myTrim(this.PartUndoWay).length == 0) {
					toast('部分完成撤单不能为空~')
					return false
				}
				// 13 强制撤销下单超过时长 int	强制撤销下单超过时长（分钟）
				if (this.myTrim(this.UndoDuration).length == 0) {
					toast('强制撤销下单超过时长不能为空~')
					return false
				}
				// 14 回调调整系数 int	回调调整系数
				if (this.myTrim(this.CallbackTrimRatio).length == 0) {
					toast('回调调整系数不能为空~')
					return false
				}
				// 151 危险振幅检测	int	危险振幅%
				if (this.myTrim(this.RiskFlapRangeRatio).length == 0) {
					toast('危险振幅检测不能为空~')
					return false
				}
				// 152 危险振幅检测分钟数  int	危险振幅检测（分钟）
				if (this.myTrim(this.RiskFlapRangeCheck).length == 0) {
					toast('危险振幅检测分钟数不能为空~')
					return false
				}
				// 16  检测危险振幅(在*分钟内不买入) int	检测危险振幅（在*分钟内不买入）
				if (this.myTrim(this.RiskFlapRangeRepair).length == 0) {
					toast('检测危险振幅(在*分钟内不买入)不能为空~')
					return false
				}
				// 常规补仓
				// 17 补仓倍率 init
				if (this.myTrim(this.ReplenishRate).length == 0 && this.ReplenishWay == 0) {
					toast('补仓倍率不能为空~')
					return false
				}
				// 18 补仓跌幅 init
				if (this.myTrim(this.ReplenishFallRatio).length == 0 && this.ReplenishWay == 0) {
					toast('补仓跌幅不能为空~')
					return false
				}
				// 19 补仓回调比例 init
				if (this.myTrim(this.ReplenishCallbackScale).length == 0 && this.ReplenishWay == 0) {
					toast('补仓回调比例不能为空~')
					return false
				}
				// 20 启用高级补仓 init int	补仓方式 0-常规补仓 1-高级补仓(启用后常规补仓将失效)
				// ReplenishWay
				// 开关
				// 高级补仓

				let res = true
				if (this.ReplenishWay == 1) {
					this.StrategyGuidList.map((item, index) => {
						if (this.myTrim(item.ReplenishRate).length == 0) {
							// ReplenishRate: 0, // int	补仓倍率%
							res = false
							toast('高级补仓的补仓倍率不能为空~')
						} else if (this.myTrim(item.ReplenishFallRatio).length == 0) {
							// 	ReplenishFallRatio: 0, // int	补仓跌幅  %	
							res = false
							toast('高级补仓的补仓跌幅不能为空~')
						} else if (this.myTrim(item.ReplenishCallbackScale).length == 0) {
							// 	ReplenishCallbackScale: 0, // int	补仓回调%
							res = false
							toast('高级补仓的补仓回调不能为空~')
						}
						// return
					})

				}
				if (res == false) {
					return false
				}
				// 循环策略
				// // 执行策略循环
				// IsPolicyLoop: 0, //  int	0-默认 1-执行策略循环
				// // 策略循环完成后停止
				// IsStopPolicyLoop: 0, // int	0-默认 1-策略循环完成后停止
				if(this.IsPolicyLoop == 0 && this.IsStopPolicyLoop == 0 && this.isClickSave == false){
				// if(this.IsPolicyLoop == 0){
					toast('循环策略未设置~')
					return false
				}

				return true
			},
			// 去除空格
			myTrim(str) {
				// console.log('转换前:',str)
				str = String(str)
				// console.log('转换后:',str)
				let res = str.replace(/(^\s*)|(\s*$)/g, "");
				// console.log(typeof(res))
				// if(res == 'undefined') {
				// 	res = 0
				// }
				return res
			},

			// 高级补仓事件start
			// 点击添加按钮
			clickButtonAdd() {
				this.buttonDel = 0
				this.buttonIsEdit = 0 // 是可以编辑
				this.$refs.bucangWay.openPop()
			},
			// 点击删除按钮
			clickButtonDel() {
				// buttonDel: 0, // 0 是初始状态,点击进入选中状态,删除功能, 1  是删除功能
				// buttonIsEdit: 0, // 0 是初始状态,禁用编辑, 1是全部可以修改状态
				if (this.buttonDel == 0) {
					this.buttonDel = 1
					// 0 是初始状态
				} else if (this.buttonDel == 1) {
					this.buttonDel = 0
					// 1  是删除功能
					let tempArr = JSON.parse(JSON.stringify(this.StrategyGuidList))
					let tempArr2 = []
					tempArr.map((item, index) => {
						if (item.IsSelect == false) {
							// this.StrategyGuidList.splice(index,1)
							tempArr2.push(item)
						}
						return item
					})
					this.StrategyGuidList = tempArr2
				}
			},
			// 点击编辑按钮
			clickButtonIsEdit() {
				this.buttonIsEdit = !this.buttonIsEdit
			},
			// 点击选中状态
			clickItem(item, index) {
				if (this.buttonDel == 0) return
				item.IsSelect = !item.IsSelect
			},

			// 高级补仓事件end

			// 网络请求start
			// 获取所有货币种类
			async getAllCurrencyList() {
				let res = await get('Trade/GetAllCurrencyList')
				if (res.code != 0) return
				res.data = res.data.map((item, index) => {
					this.$set(item, 'lable', item.name)
					if (item.id == this.id) {
						console.log('像登录', item.id)
						this.$set(item, 'active', true)
					}else {
						this.$set(item, 'active', false)
					}
					return item
				})
				this.CurrencyGroupIdArr = res.data
				
				// this.queding(this.CurrencyGroupIdArr)
				// this.list = this.CurrencyGroupIdArr
				// console.log('')

				// console.log('this.allBizhongArr ',this.allBizhongArr )

				// 请求完币种才请求,如果是编辑,才请求某个币种的策略
				if (this.isEdit == 1) {
					this.CurrencyGroupId = String(this.id)
					this.MyStrategy()
				}
			},
			// 如果是编辑, (某个币种)查询我的量化策略（币种）
			async MyStrategy() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					UserId: this.userId,
					Token: this.token,
					// CurrencyGroupId: 5, // 币种Id组以英文逗号分隔开
					CurrencyGroupId: this.id, // 币种Id组以英文逗号分隔开
				}
				let res = await post('Trade/MyStrategy', obj)
				if (res.code != 0) return
				let {
					Strategy,
					StrategyGuidList
				} = res.data[0]
				// console.log('Strategy:',Strategy)
				// console.log('StrategyGuidList:',StrategyGuidList)
				for (var k in Strategy) {
					this[k] = Strategy[k];
					let k2 = k + 'Arr'
					if (this[k2] != undefined) {
						// this[k2][this[k]].active = true
						// this[k2][this[k]].active = true
						// this.$set(this[k2][this[k]],'active',true)
						// this.$set(this,k2,this[k2])
						let tempKArr = JSON.parse(JSON.stringify(this[k2]))
						// this.$set(this[k2][this[k]],'active',true)
						this.$set(tempKArr[this[k]], 'active', true)
						this.$set(this, k2, tempKArr)
						console.log('k2:', k2)

						console.log('this[k2]:', this[k2])
						// console.log('this[k]:',this[k])
						// console.log('this[k2][this[k]]:',this[k2][this[k]])
						// this[k2].map((item,index) {

						// })

					}
				}
				// this.CurrencyGroupIdArr = this.CurrencyGroupIdArr.map((item, index) => {
				// 	if (item.id == this.id) {
				// 		console.log('id相等,是编辑', item.id)
				// 		this.$set(item, 'active', true)
				// 	}
				// })
				// this.CurrencyGroupIdArr.map((item, index) => {
				// 	if (item.id == this.id) {
				// 		console.log('id相等,是编辑', item.id)
				// 		// this.$set(item, 'active', true)
				// 		this.CurrencyGroupId = item.id
				// 	}
				// })
				// this.queding(this.CurrencyGroupIdArr)
				StrategyGuidList = StrategyGuidList.map((item, index) => {
					this.$set(item, 'IsSelect', false)
					return item
				})
				this.StrategyGuidList = StrategyGuidList
				// console.log('this.FirstAmount:',this.FirstAmount)

			},


			// 一键量化请求
			async currencyStrategy() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					UserId: this.userId,
					Token: this.token,
					// PackageId: this.PackageId, // 套餐Id
					CurrencyGroupId: this.CurrencyGroupId, // 币种Id组以英文逗号分隔开
					Strategy: {
						// 1 币种
						// CurrencyGroupId: this.CurrencyGroupId,
						// 2 首单金额 首单金额：首次买入金额，以计价币为计量单位。
						FirstAmount: this.FirstAmount,
						// 3 监视时长 int	监视时长（分钟）
						MonitorDuration: this.MonitorDuration,
						// 41 买入跌幅  init 买入跌幅%
						BuyFallRatio: this.BuyFallRatio,
						// 42 买入跌幅-回调比例 init 买入回调%
						BuyCallbackScale: this.BuyCallbackScale,
						// 5 买入涨幅 init 买入涨幅%
						BuyRiseRatio: this.BuyRiseRatio,


						// 61 卖出涨幅  int	卖出涨幅%
						SellRiseRatio: this.SellRiseRatio,
						// 62 卖出涨幅-回调比例 int	卖出回调%
						SellCallbackScale: this.SellCallbackScale,

						// 7 补仓单套利出货 int	补仓单套利出货 0-不参与套利 1-参与套利
						IsReplenish: this.IsReplenish,
						// 8 最多补仓次数 int	最多补仓次数
						MaxReplenishNum: this.MaxReplenishNum,
						// 9 补仓参考价  int	补仓参考价 0-最后买入价 1-买入平均价 2-最后卖出价 3-首次买入
						ReplenishPriceWay: this.ReplenishPriceWay,

						// 10 盈利关闭补仓单套利 int	0-默认 1-盈利关闭补仓单套利：在浮亏变为正数时，设置关闭即可关闭补仓单参与套利功能，有利于快速整体卖出。此功能只适用于“补仓单参与套利”。

						IsReplenishGain: this.IsReplenishGain,

						// 101 在第*次补仓关闭补仓单参与套利 init
						ReplenishCloseNum: this.ReplenishCloseNum,
						// 102 在第*次补仓开启补仓单参与套利 init
						ReplenishOpenNum: this.ReplenishOpenNum,
						// 11 行情价格采用 	int	行情价格采用 0-买（卖）一价 1-买（卖）一至二价
						MarketPriceWay: this.MarketPriceWay,

						// 12 部分完成撤单 int	部分完成撤单 0-部分完成不撤销 1-部分完成强制撤销（仅买单） 2-部分完成强制撤销（买卖单）
						PartUndoWay: this.PartUndoWay,

						// 13 强制撤销下单超过时长 int	强制撤销下单超过时长（分钟）
						UndoDuration: this.UndoDuration,
						// 14 回调调整系数 int	回调调整系数
						CallbackTrimRatio: this.CallbackTrimRatio,
						// 151 危险振幅检测	int	危险振幅%
						RiskFlapRangeRatio: this.RiskFlapRangeRatio,
						// 152 危险振幅检测分钟数  int	危险振幅检测（分钟）
						RiskFlapRangeCheck: this.RiskFlapRangeCheck,
						// 16  检测危险振幅(在*分钟内不买入) int	检测危险振幅（在*分钟内不买入）
						RiskFlapRangeRepair: this.RiskFlapRangeRepair,


						// 常规补仓 
						// 17 补仓倍率 init
						ReplenishRate: this.ReplenishRate,
						// 18 补仓跌幅 init
						ReplenishFallRatio: this.ReplenishFallRatio,
						// 19 补仓回调比例 init
						ReplenishCallbackScale: this.ReplenishCallbackScale,
						// 20 启用高级补仓 init int	补仓方式 0-常规补仓 1-高级补仓(启用后常规补仓将失效)
						ReplenishWay: this.ReplenishWay,

						// 循环策略
						// 执行策略循环
						IsPolicyLoop: this.IsPolicyLoop, //  int	0-默认 1-执行策略循环
						// 策略循环完成后停止
						IsStopPolicyLoop: this.IsStopPolicyLoop, // int	0-默认 1-策略循环完成后停止
					},
					// 高级补仓
					StrategyGuidList: this.StrategyGuidList,
					// StrategyGuidList: [{
					// 	ReplenishMode: '', // int	补仓风格 0-按买入金额 1-按已购入资产
					// 	ReplenishRate: '', // int	补仓倍率%
					// 	ReplenishFallRatio: '', // int	补仓跌幅%
					// 	ReplenishCallbackScale: '', // int	补仓回调%
					// }],
				}
				let res = await post('Trade/CurrencyStrategy', obj)
				if (res.code != 0) {
					toast(res.msg)
					return
				}else {
					if(this.isClickSave == true) {
						toast('保存成功')
					}else {
						toast('量化成功')
						
						
						this.timer = setTimeout(() => {
							if(this.isClickSave == true && this.isEdit == true) {
								// uni.navigateTo({
								// 	url: `/pages/dealSon/dealDetail/index?CurrencyId=${this.id}`,
								// 	fail() {
								// 		redirect(`dealSon/dealDetail/index?CurrencyId=${this.id}`)
								// 	}
								// })
								uni.switchTab({
									url: '/pages/tabbar/deal/deal',
									fail() {
										redirect('tabbar/deal/deal')
									}
								})
							}else {
								uni.switchTab({
									url: '/pages/tabbar/deal/deal',
									fail() {
										redirect('tabbar/deal/deal')
									}
								})
							}
							
						}, 300)
						
						this.$once('hook:beforeDestroy', () => {
							clearTimeout(this.timer);
							this.timer = null;
						})
						
						
					}
				}

				
				
			},
			// 网络请求end
		}
	}
</script>

<style lang="scss" scoped>
	@import "./style";
	@import '@/common/login.css';
	.uni-input-input, .uni-input-placeholder{
		font-size: 34upx;
		// color: #000000;
		color: #5c6b8b;
	}
</style>
