$(function() {
	document.getElementsByTagName("header")[0].innerHTML = utilities.getHeader();
	document.getElementsByTagName("footer")[0].innerHTML = utilities.getFooter();
	utilities.getAjax({
		url: utilities.serverAddr + "/getindexmenu",
		method: "GET",
		data: "",
		dataType: "json",
		callback: showNavItems
	});
	utilities.getAjax({
		url: utilities.serverAddr + "/getmoneyctrl",
		method: "GET",
		data: "",
		dataType: "json",
		callback: showProducts
	});
	//获取导航数据
	function showNavItems(data) {
		utilities.renderFregment({
			templateId: 'index-nav-item',
			data: data,
			wrapperId: 'navWrapper'
		});
	};
	//获取产品列表
	function showProducts(data) {
		utilities.renderFregment({
			templateId: 'index-product-template',
			data: data,
			wrapperId: 'product-template',
			templateHelper: utilities.getNumber,
			helperName: 'getNumber'
		});
	}
});