var base64_encode = base64_encode || function(str) { // 编码，配合encodeURIComponent使用
    var c1, c2, c3;
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var i = 0, len = str.length, strin = '';
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            strin += base64EncodeChars.charAt(c1 >> 2);
            strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
            strin += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            strin += base64EncodeChars.charAt(c1 >> 2);
            strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
            strin += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        strin += base64EncodeChars.charAt(c1 >> 2);
        strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        strin += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        strin += base64EncodeChars.charAt(c3 & 0x3F)
    }
    return strin
};

var base64_decode = base64_decode || function(input) { // 解码，配合decodeURIComponent使用
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
        enc1 = base64EncodeChars.indexOf(input.charAt(i++));
        enc2 = base64EncodeChars.indexOf(input.charAt(i++));
        enc3 = base64EncodeChars.indexOf(input.charAt(i++));
        enc4 = base64EncodeChars.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
    }
    return utf8_decode(output);
};

var utf8_decode = utf8_decode || function(utftext) { // utf-8解码
    var string = '';
    let i = 0;
    let c = 0;
    let c1 = 0;
    let c2 = 0;
    while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if ((c > 191) && (c < 224)) {
            c1 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
            i += 2;
        } else {
            c1 = utftext.charCodeAt(i + 1);
            c2 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
            i += 3;
        }
    }
    return string;
};


var b64hamcsha1 = b64hamcsha1 || function(key, data) {
	var hexcase = 0;
	var b64pad = "=";
	var chrsz = 8;
	var b64_hmac_sha1 = function(key, data) {
		return binb2b64(core_hmac_sha1(key, data))
	};
	var sha1_vm_test = function() {
		return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d"
	};
	var core_sha1 = function(x, len) {
		x[len >> 5] |= 128 << (24 - len % 32);
		x[((len + 64 >> 9) << 4) + 15] = len;
		var w = Array(80);
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var e = -1009589776;
		for (var i = 0; i < x.length; i += 16) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			var olde = e;
			for (var j = 0; j < 80; j++) {
				if (j < 16) {
					w[j] = x[i + j]
				} else {
					w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1)
				}
				var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
				e = d;
				d = c;
				c = rol(b, 30);
				b = a;
				a = t
			}
			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
			e = safe_add(e, olde)
		}
		return Array(a, b, c, d, e)
	};
	var sha1_ft = function(t, b, c, d) {
		if (t < 20) {
			return (b & c) | ((~b) & d)
		}
		if (t < 40) {
			return b ^ c ^ d
		}
		if (t < 60) {
			return (b & c) | (b & d) | (c & d)
		}
		return b ^ c ^ d
	};
	var sha1_kt = function(t) {
		return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514
	};
	var core_hmac_sha1 = function(key, data) {
		var bkey = str2binb(key);
		if (bkey.length > 16) {
			bkey = core_sha1(bkey, key.length * chrsz)
		}
		var ipad = Array(16),
			opad = Array(16);
		for (var i = 0; i < 16; i++) {
			ipad[i] = bkey[i] ^ 909522486;
			opad[i] = bkey[i] ^ 1549556828
		}
		var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
		return core_sha1(opad.concat(hash), 512 + 160)
	};
	var safe_add = function(x, y) {
		var lsw = (x & 65535) + (y & 65535);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 65535)
	};
	var rol = function(num, cnt) {
		return (num << cnt) | (num >>> (32 - cnt))
	};
	var str2binb = function(str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32)
		}
		return bin
	};
	var binb2str = function(bin) {
		var str = "";
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < bin.length * 32; i += chrsz) {
			str += String.fromCharCode((bin[i >> 5] >>> (24 - i % 32)) & mask)
		}
		return str
	};
	var binb2hex = function(binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 15) + hex_tab.charAt((binarray[i >> 2] >> ((3 -
				i % 4) * 8)) & 15)
		}
		return str
	};
	var binb2b64 = function(binarray) {
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i += 3) {
			var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 255) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) %
				4)) & 255) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 255);
			for (var j = 0; j < 4; j++) {
				if (i * 8 + j * 6 > binarray.length * 32) {
					str += b64pad
				} else {
					str += tab.charAt((triplet >> 6 * (3 - j)) & 63)
				}
			}
		}
		return str
	};
	return b64_hmac_sha1(key, data)
};

//判断undefined，null
export function empty(exp) {
	if (typeof(exp) == 'object') {
		var arr = Object.keys(exp);
		if (arr.length) {
			return true;
		} else {
			return false;
		}
	}

	if (typeof(exp) == undefined) {
		return false;
	} else {
		return true;
	}
}


//上传图片、批量上传图片
export async function UploadPictures(param,data) { // 1，count默认张数 2，sizeType图片类型sizeType 原图，compressed 压缩图 3，sourceType图片选择类型  album 从相册选图，camera 使用相机	
	let storageURL = param.storageURL; // 又拍云储存地址
	let bucketname = param.bucketname; //又拍云服务名
	let uploadURL = param.uploadURL + bucketname;
	let operator = param.operator; //又拍云操作员账号
	let pathNameFormat = param.pathNameFormat;
	let quality = param.quality;
	let expiration = param.expiration;
	
	let policy = base64_encode(JSON.stringify({
		"bucket": bucketname,
		"save-key": pathNameFormat,
		"expiration": parseInt(Date.parse(new Date()) + expiration),
	    "x-gmkerl-thumb":'/quality/'+quality 
	}));// 又拍云图片压缩
	//token方式 3b0293a4eaaed7e67404dc939b645fb1
	let authorization = "UPYUN " + operator + ":" + b64hamcsha1("e5cec5f22fd14d85124e782a9af4ceec", "POST&/" + bucketname +
		"&" + policy);
	
	
	
	let self = this
	data = data = undefined ? data : {};
	data.count = empty(data.count) ? data.count : 1;
	data.sizeType = empty(data.sizeType) ? data.sizeType : 'compressed';
	data.sourceType = empty(data.sourceType) ? data.sourceType : 'album';
	var picList = []
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: data.count,
			// #ifdef APP-PLUS 
			sizeType: data.sizeType, //注意h5不支持sizeType，sourceType
			sourceType: data.sourceType,
			// #endif
			success: (res) => {
				var tempFilePaths = res.tempFilePaths;
				var b = res.tempFilePaths.length
				for (var i = 0; i < res.tempFilePaths.length; i++) {
					uni.uploadFile({
						url: uploadURL, 
						filePath: tempFilePaths[i],
						name: 'file',
						formData: {
							policy: policy,
							authorization: authorization,
						},
						success: (res) => {

							let {
								data,
								errMsg,
								statusCode
							} = res;
							if (statusCode == 200) {
								let responseData = JSON.parse(data)
								let filePath = responseData.url;
								if (b > 1) {
									picList.push(storageURL + filePath)
									setTimeout(() => {
										if (b == picList.length) {
											resolve(picList);
										}
									}, 10)
								} else {
									picList.push(storageURL + filePath)
									resolve(picList);
								}
							}
						}
					});
				}
			},

		});

	})
}
