$(function() {
	//category页面中被点击的产品大类div的id，
	//用来渲染子类以及点击其他大类时关闭已打开的子类
	var currentTitleId = '';
	document.getElementsByTagName('header')[0].innerHTML = utilities.getHeader();
	document.getElementsByTagName('footer')[0].innerHTML = utilities.getFooter();
	// 大类
	utilities.getAjax({
		url: utilities.serverAddr + "/getcategorytitle",
		method: "GET",
		data: "",
		dataType: "json",
		callback: showTitles
	});

	//获取产品大类数据
	function showTitles(data) {
		utilities.renderFregment({
			templateId: 'category-title-template',
			data: data,
			wrapperId: 'titleWrapper'
		});
		//绑定点击显示和关闭子类事件
		$(".category-title-top").on("click", function() {
			var titleid = this.getAttribute("titleid")
			if (titleid !== currentTitleId) {
				if (currentTitleId) {
					closeCategories(currentTitleId);
				}
				currentTitleId = titleid;
				if (utilities.cache.categoriyTitles[currentTitleId]) {
					$("#titleWrapper div[titleid=" + currentTitleId + "]").next().css("display", "block");
				} else {
					utilities.getAjax({
						url: utilities.serverAddr + "/getcategory",
						method: "GET",
						data: {
							"titleid": currentTitleId
						},
						dataType: "json",
						callback: showCategories
					});
				}
			}
		});
	}
	//获取产品子类数据
	function showCategories(data) {
		utilities.renderFregment({
			templateId: 'categoriesTemplate',
			data: data,
			wrapperId: "categoryWrapper" + currentTitleId
		});
		$("#titleWrapper div[titleId=" + currentTitleId + "]").next().css("display", "block");
		//缓存大类title
		if (!utilities.cache.categoriyTitles[currentTitleId]) {
			utilities.cache.categoriyTitles[currentTitleId] = "1";
		}
		//利用localstorage缓存子类
		if (data.result.length > 0) {
			var temp = window.localStorage.getItem("categoryId-" + data.result[0].categoryId);
			if (!temp) {
				//未缓存过
				for (var i = 0, len = data.result.length; i < len; i++) {
					window.localStorage.setItem("categoryId-" + data.result[i].categoryId, data.result[i].category);
				}
			}

		}
	}
	//关闭产品子类div
	function closeCategories(titleId) {
		$('#titleWrapper div[titleId=' + titleId + "]").next().css("display", "none");
	}

});