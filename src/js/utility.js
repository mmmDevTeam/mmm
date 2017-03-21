(function(window) {
	var utilities = {
		//api服务器地址
		serverAddr: 'http://127.0.0.1:3000/api',
		serverDomain: 'www.mmbuy.com',
		//缓存
		// 1.缓存category的大类标题
		// 		cache.categoriyTitles.titleId="1";说明该大类已获取过子类列表
		// 2.缓存category子类数据
		//  	cache.categories.categoryid={category:'子类名',titleid:'所属大类id'}
		cache: {
			categoriyTitles: {},
			categories: {}
		},

		/*
			模板页面渲染
			scriptId: 模板配置id
			data: 数据对象，应包括模板配置所需的数据,形如{result:[{},{},{}]}
			wrapperId: 装载生成的html的容器
			templateHelper: 模板数据预处理函数
			helperName: 预处理函数名
			helperNames: 缓存所有已加载的helper名
		*/
		objTemplate: {
			templateId: null,
			data: null,
			wrapperId: null,
			templateHelper: null,
			helperName: null,
			helperNames: []
		},
		//使用jQ的ajax
		getAjax: function(obj) {
			var o = obj;
			o.method = o.method || 'GET';
			if (!o.url) {
				console.log("获取失败，url地址为空！");
				return false;
			}
			$.ajax({
				url: o.url,
				type: o.method,
				data: o.data,
				dataType: o.dataType,
				success: function(data) {
					console.log(data);
					if (o.callback) {
						o.callback(data);
					}
				}
			})
		},
		getNumber: function(data) {
			var reg = /\d+/;
			var res = 0;
			if (!data) {
				return res;
			} else {
				res = reg.exec(data);
				if (res) {
					return res[0];
				} else {
					return 0;
				}
			}
		},
		renderFregment: function(obj) {
			this.objTemplate.templateId = obj.templateId,
				this.objTemplate.data = obj.data,
				this.objTemplate.wrapperId = obj.wrapperId,
				this.objTemplate.templateHelper = obj.templateHelper //templateId,data,wrapperId,templateHelper
			this.objTemplate.helperName = obj.helperName;
			if (!this.objTemplate.templateId) {
				return console.log("template-templateId is empty!");
			}
			if (!this.objTemplate.data) {
				return console.log("template-data is empty!");
			}
			if (!this.objTemplate.wrapperId) {
				return console.log("template-wrapperId is empty!");
			}
			if (this.objTemplate.templateHelper && this.objTemplate.helperName && this.objTemplate.helperNames.indexOf(this.objTemplate.helperName) == -1) {
				template.helper(this.objTemplate.helperName, this.objTemplate.templateHelper);
			}
			var html = template(this.objTemplate.templateId, this.objTemplate.data);
			$('#' + this.objTemplate.wrapperId).html(html);
		},
		getUrlParam: function(param) {
			//获取get方式传入的参数
			var res = {},
				temp = [],
				href = null,
				index1 = 0,
				index2 = 0;
			if (param) {
				temp = param.replace(/\?/g, "").replace(/\&/g, " ").replace(/=/g, " ").split(" ");
				if (temp.length > 0) {
					for (var i = 0, len = temp.length; i < len - 1; i += 2) {
						if (temp[i] != " ") {
							res[temp[i]] = temp[i + 1];
						}
					}
				}
				return res;
			}
		},
		getHeader: function() {
			return '<div class="header-top" id="headAnchor">' +
				'<div class="row">' +
				'<div class="col-xs-8 logo">' +
				'<img src="./images/header_logo.png">' +
				'</div>' +
				'<div class="col-xs-offset-1 col-xs-3 download">' +
				'<a href="#"><img src="./images/header_app.png"></a>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="header-bottom">' +
				'<input class="header-search-input" type="text" placeholder="请输入你想比价的商品">' +
				'<a href="#" class="header-search-button">搜索</a>' +
				'</div>'
		},
		getSubHeader: function(title) {
			return '<a href="index.html" class="glyphicon glyphicon-menu-left  header-back-link"></a>' +
				'<h1>' + title + '</h1>' +
				'<a href="#" class="header-logo"><img src="./images/header_app.png"></a>'
		},
		getFooter: function() {
			return '<div class="footer-buttons clearfix">' +
				'<a href="login.html" class="col-xs-6 footer-login">登录</a>' +
				'<a href="register.html" class="col-xs-6 footer-register">注册</a>' +
				'<a href="#headAnchor" class="footer-backToTop">' +
				'<span class="glyphicon glyphicon-arrow-up"></span>' +
				'<span>返回顶部</span>' +
				'</a>' +
				'</div>' +
				'<div class="footer-info">' +
				'<div class="foot-info-wrapper">' +
				'<a href="#" class="footer-download"></a>' +
				'<span>慢慢买手机版--掌上比价平台</span>' +
				'</div>' +
				'<span>m.manmanbuy.com</span>' +
				'</div>'
		}
	};
	window.utilities = utilities;
})(window)