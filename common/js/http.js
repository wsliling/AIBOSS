var http = require('./api')

//登录
export const login = val => {
	return http.postRequest('/api/Login/LoginByMobile',val)
}
//注册
export const register = val => {
	return http.postRequest('/api/Login/MobileRegister',val)
}
//修改登录密码
export const changeLoginPwd = val => {
	return http.postRequest('/api/Login/ChangeLoginPwd',val)
}
//获取短信验证码
export const sendCode = val => {
	return http.getRequest('/api/SMS/Send',val)
}
//会员验证码登录
export const MemberLoginByCode = val => {
	return http.postRequest('/api/Login/MemberLoginByCode',val)
}
//首页广告图轮播
export const BannerList = val => {
	return http.getRequest('/api/Banner/BannerList',val)
}
//更新广告点击量
export const BannerHits = val => {
	return http.getRequest('/api/Banner/BannerHits',val)
}
//获取首页的交易平台类型
export const GetPlatformTypeList = val => {
	return http.getRequest('/api/System/GetPlatformTypeList',val)
}
//获取咨询图
export const GetAnyInformation = val => {
	return http.getRequest('/api/Information/GetAnyInformation',val)
}
// 获取更多资讯图(分页)
export const GetInformationPageList = val => {
	return http.getRequest('/api/Information/GetInformationPageList',val)
}
export const GetRechargeNoticeInfo = val => {
	return http.postRequest('/api/Recharge/GetRechargeNoticeInfo',val)
}
//获取充值提醒
//量化策略套餐、自定义（币种）
export const CurrencyStrategy = val => {
	return http.postRequest('/api/Trade/CurrencyStrategy',val)
}
//我的量化交易
export const StrategyTrading = val => {
	return http.postRequest('/api/Trade/StrategyTrading',val)
}
//获取团队统计信息
export const GetTeamStatisticsInfo = val => {
	return http.postRequest('/api/User/GetTeamStatisticsInfo',val)
}
//获取我的团队列表信息(分页)
export const MyTeamPageList =val => {
	return http.postRequest('/api/User/GetMyTeamPageList',val)
}
//获取团队列表信息
export const GetMyTeamPageList = val => {
	return http.getRequest('/api/User/GetMyTeamPageList',val)
}
//获取我的推荐人信息
export const GetDirectFatherInfo = val => {
	return http.getRequest('/api/User/GetDirectFatherInfo',val)
}
// 获取我的交易日志
export const GetTradeLogList = val => {
	return http.postRequest('/api/User/GetTradeLogList',val)
}
//获取授权信息
export const GetAuthoriztionInfo = val => {
	return http.postRequest('/api/User/GetAuthoriztionInfo',val)
}
//授权
export const AllowAuthoriztion = val => {
	return http.postRequest('/api/User/AllowAuthoriztion',val)
}
//取消授权
export const CancelAuthoriztion = val => {
	return http.postRequest('/api/User/CancelAuthoriztion',val)
}
//个人基本信息
export const GetMemberInfo = val => {
	return http.getRequest('/api/User/GetMemberInfo',val)
}
//修改会员头像
export const UploadPhoto = val => {
	return http.postRequest('/api/User/UploadPhoto',val)
}
//修改会员信息
export const UpdateUserInfo = val => {
	return http.postRequest('/api/User/UpdateUserInfo',val)
}
//获取用户LC充值(转换)明细
export const GetLCRecordPageList = val => {
	return http.postRequest('/api/User/GetLCRecordPageList',val)
}
//充值LC
export const RechargeLC = val => {
	return http.postRequest('/api/Recharge/RechargeLC',val)
}
// 获取USDT兑换LC
export const USTD2LC = val => {
	return http.getRequest('/api/Recharge/USTD2LC',val)
}
//获取用户资产信息
export const GetUserAssetsInfo = val => {
	return http.postRequest('/api/User/GetUserAssetsInfo',val)
}
//获取USDT提现,充值记录
export const GetUSDTRecordPageList = val =>{
	return http.postRequest('/api/User/GetUSDTRecordPageList',val)
}
//邀请好友
export const InviteFriends = val => {
	return http.postRequest('/api/User/InviteFriends',val)
}
//钱包明细
export const GetRechargeList = val => {
	return http.getRequest('/api/Recharge/GetRechargeList',val)
}
//收益明细
export const IncomeDetails = val => {
	return http.postRequest('/api/Recharge/GetIncomeDetails',val)
}
//我的收益统计
export const GetIncomeStatistics = val => {
	return http.postRequest('/api/Recharge/GetIncomeStatistics',val)
}
//银行列表
export const BankinfoList = val => {
	return http.postRequest('/api/Bank/BankinfoList',val)
}
//银行卡列表
export const BankList = val => {
	return http.postRequest('/api/Bank/BankList',val)
}
//提现限制条件
export const LimitationOfWithdrawal = val => {
	return http.postRequest('/api/DrawMoney/LimitationOfWithdrawal',val)
}
//用户提现申请(佣金提现接口)
export const memberDrawMoneyApply = val => {
	return http.postRequest('/api/DrawMoney/memberDrawMoneyApply',val)
}
//用户提现申请(余额提现接口)
export const memberDrawMoneyApply123 = val => {
	return http.postRequest('/api/DrawMoney/memberDrawMoneyApply123',val)
}
//获取套餐分页列表
export const GetPackagePageList = val => {
	return http.getRequest('/api/Trade/GetPackagePageList',val)
}
//获取套餐的货币列表
export const GetCurrencyList = val => {
	return http.getRequest('/api/Trade/GetCurrencyList',val)
}
//获取所有的货币列表
export const GetAllCurrencyList = val => {
	return http.getRequest('/api/Trade/GetAllCurrencyList',val)
}
//Base64文件上传
export const UploadBase = val => {
	return http.postRequest('/api/System/UploadBase64',val)
}
// multipart/form-data多文件上传
export const UploadMultiFile = val => {
	return http.postRequest('/api/System/UploadMultiFile',val)
}
//设置支付密码
export const UpdatePayPwd = val => {
	return http.postRequest('/api/User/UpdatePayPwd',val)
}
//修改登录密码
export const UpdatePassword = val => {
	return http.postRequest('/api/User/UpdatePassword',val)
}
//获取系统基础配置
export const GetWebConfiguration = val => {
	return http.postRequest('/api/System/GetWebConfiguration',val)
}
//获取注册协议
export const GetUserNotice = val => {
	return http.getRequest('/api/System/GetUserNotice',val)
}
//获取隐私协议
export const GetUserAuth = val => {
	return http.postRequest('/api/System/GetUserAuth',val)
}
//获取关于我们
export const GetAboutUs = val => {
	return http.postRequest('/api/System/GetAboutUs',val)
}
//搜索货币列表 模糊查询
export const SearchStrategyTrading = val => {
	return http.postRequest('/api/Trade/SearchStrategyTrading',val)
}
//获取首页行情
export const GetLastCandlestickAskBid = val =>{
	return http.getRequest('/api/Huobi/GetLast24hCandlestickAskBid',val)
}
//我的量化交易详情
export const StrategyTradingxq = val => {
	return http.postRequest('/api/Trade/StrategyTradingxq',val)
}
//量化交易操作策略更改
export const StrategyTradingop = val => {
	return http.postRequest('/api/Trade/StrategyTradingop',val)
}