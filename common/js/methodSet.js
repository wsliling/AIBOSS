//验证手机号是否合法
const isMobile = /^1[3-9]\d{9}$/
export const checkTelphone = phone => {
	return isMobile.test(phone)
}