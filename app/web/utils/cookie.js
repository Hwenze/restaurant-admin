/**
 * 处理cookie的对象
 */
const Cookie = {
	/**
	 * 设置cookie数据
	 * @param {string} name 数据名
	 * @param {*} value 数据值
	 * @param {[object]} param cookie参数
	 */
	set: function (name, value, param) {
		let str = name + '=' + value + ';';
		if (param) {
			for (let key in param) {
				if (key == 'secure') {
					if (param[key]) {
						str = str + key + ';';
					}
				} else {
					str = str + key + '=' + param[key] + ';'
				}
			}
		}
		document.cookie = str;
	},
	/**
	 * 获取cookie
	 * @returns {object} 包含所有cookie数据的对象,用数据名调用
	 */
	get: function () {
		if (document.cookie == '') {
			return {};
		}
		var obj = {};
		var cookies = document.cookie.split('; ');
		for (var i = 0; i < cookies.length; i++) {
			obj[cookies[i].split('=')[0]] = cookies[i].split('=')[1];
		}
		return obj;
	},
	has: function (name) {
		if (this.get()) {
			return this.get()[name];
		}
		return false;
	},
	/**
	 * 删除cookie
	 * @param {string} name 数据名
	 */
	remove: function (name) {
		var now = new Date();
		now.setDate(now.getDate() - 1);
		this.set(name, 'null', { expires: now.toUTCString(), path: '/' });
	}
}

export default Cookie;