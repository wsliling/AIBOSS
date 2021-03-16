import Vue from 'vue'
Vue.filter('TradingTypeName',(e)=>{
	switch(e){
		case 0: return '全部';
		case 1: return '策略循环';
		case 2: return '单次策略';
		case 3: return '停止补单';
		// case 4: return '清仓卖出';
		case 4: return '';
		// default: return '未知'
		default: return ''
	}
})

Vue.filter('decimal',(val,v)=>{
	return Math.round(val*Math.pow(10,v))/Math.pow(10,v)
})

// Vue.filter('four',(val,v = 4)=>{
// 	let tempVal = val
// 	val = Number(val)
// 	// console.log('Number.isInteger(val):',val,Number.isInteger(val))
// 	if(val == 0 || Number.isInteger(val)) {
// 		return val
// 	}else if(val + 0 != val) {
// 		// 非数字
// 		return tempVal
// 	}
// 	let myNumber =  Number(Number(val).toFixed(v))
// 	// console.log(val,myNumber,Number.isInteger((Number(myNumber))))
// 	if(Number.isInteger(myNumber)) {
// 		return Number(myNumber).toFixed(0)
// 	}
// 	// return Number(val).toPrecision(v) // 保留有效位数,4位,左边数起来
// 	return Number(val).toFixed(v)
// })

Vue.filter('four',(num,len = 4)=>{
	var numStr = num.toString();
	if (len == null || len == undefined) {
		len = numStr.length;
	}
	var index = numStr.indexOf('.');
	if (index == -1) {
		index = numStr.length;
		numStr += ".0000000000000";
	} else {
		numStr += "0000000000000";
	}
	var newNum = numStr.substring(0, index + len + 1);
	newNum = parseFloat(newNum)
	if(Number.isInteger(Number(newNum))) {
		return parseInt(Number(newNum))
	}else {
		return newNum;
	}
})


Vue.filter('four13',(num,len = 4)=>{
	var numStr = num.toString();
	if (len == null || len == undefined) {
		len = numStr.length;
	}
	var index = numStr.indexOf('.');
	if (index == -1) {
		index = numStr.length;
		numStr += ".0000000000000";
	} else {
		numStr += "0000000000000";
	}
	var newNum = numStr.substring(0, index + len + 1);
	newNum = parseFloat(newNum)
	if(Number.isInteger(Number(newNum))) {
		return String(parseInt(Number(newNum))).slice(0,14)
	}else {
		return String(newNum).slice(0,14);
	}
})
Vue.filter('four10',(num,len = 4)=>{
	var numStr = num.toString();
	if (len == null || len == undefined) {
		len = numStr.length;
	}
	var index = numStr.indexOf('.');
	if (index == -1) {
		index = numStr.length;
		numStr += ".0000000000000";
	} else {
		numStr += "0000000000000";
	}
	var newNum = numStr.substring(0, index + len + 1);
	newNum = parseFloat(newNum)
	if(Number.isInteger(Number(newNum))) {
		return String(parseInt(Number(newNum))).slice(0,11)
	}else {
		return String(newNum).slice(0,11);
	}
})
