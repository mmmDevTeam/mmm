$(function() {
	(function(window) {
		// 折扣数据缓存
		var discountData = null;
		// 头部和尾部
		$("header").html(utilities.getSubHeader());
		$("footer").html(utilities.getFooter());
		// 渲染头部模板
		(function(){
			var o = {
				templateId: "moneyctrl-product-template",
				wrapperId: "sub-header",
				data: data,
				templateHelper: utilities.getNumber,
				helperName: 'getNumber'
			}
			utilities.renderFregment(o);
		})()
	})(window);
});