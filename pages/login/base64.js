

// function base64(e)
// {
// 		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
// 	var t = "";
// 	var n, r, i;
// 	var s, o, u, a;
// 	var f = 0;
// 	e = e.replace(/[^A-Za-z0-9+/=]/g, "");
// 	while (f < e.length) {
// 		s = _keyStr.indexOf(e.charAt(f++));
// 		o = _keyStr.indexOf(e.charAt(f++));
// 		u = _keyStr.indexOf(e.charAt(f++));
// 		a = _keyStr.indexOf(e.charAt(f++));
// 		n = s << 2 | o >> 4;
// 		r = (o & 15) << 4 | u >> 2;
// 		i = (u & 3) << 6 | a;
// 		t = t + String.fromCharCode(n);
// 		if (u != 64) {
// 			t = t + String.fromCharCode(r)
// 		}
// 		if (a != 64) {
// 			t = t + String.fromCharCode(i)
// 		}
// 	}
// 	t = _utf8_decode(t);
// 	return t
	
	
// }

// function _utf8_decode(e) {
// 	var c1 = null;
// 		var t = "";
// 		var n = 0;
// 		var r = c1;
// 		var c2 = 0;
// 		var c3 = 0;
// 		while (n < e.length) {
// 			r = e.charCodeAt(n);
// 			if (r < 128) {
// 				t += String.fromCharCode(r);
// 				n++
// 			} else if (r > 191 && r < 224) {
// 				c2 = e.charCodeAt(n + 1);
// 				t += String.fromCharCode((r & 31) << 6 | c2 & 63);
// 				n += 2
// 			} else {
// 				c2 = e.charCodeAt(n + 1);
// 				c3 = e.charCodeAt(n + 2);
// 				t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
// 				n += 3
// 			}
// 		}
// 		return t
// 	}


// export {
//   base64,
//   _utf8_decode
// }
