$(function() {
	(function(window) {
		//页数相关参数
		var maxPage = 0,
			totalCount = 0,
			pageSize = 10,
			pageId = 1,
			initFlag=true;
		// 数据缓存,键为页数，值为回传数据对象
		var cache = {};
		// 获取url参数
		var urlParams = utilities.getUrlParam(window.location.search);
		// 生成代码片段
		var fragMoneyCtrl = document.createDocumentFragment();
		//生成头部
		$("header").html(utilities.getSubHeader("省钱控-最新优惠"));
		// 生成尾部
		$("footer").html(utilities.getFooter());
		// 获取产品列表
		function showList(){
			if(!cache[pageId]){
				// 没有缓存，远程获取数据
				utilities.getAjax({
					url:utilities.serverAddr+"/getmoneyctrl",
					data:{"pageid":pageId},
					dataType:"json",
					callback:showProductList
				});
			}else{
				// 使用缓存数据
				showProductList(cache[pageId])
			}
		}
		// 显示产品列表
		function showProductList(data){
			//刷新页数参数
			if(totalCount == 0){
				totalCount = data.totalCount;
				pageSize = data.pagesize;
			}
			// 缓存数据
			cacheData(data);
			// 渲染
			var o = {
				templateId: "moneyctrl-product-template",
				wrapperId: "moneyctrlWrapper",
				data: data,
				templateHelper: utilities.getNumber,
				helperName: 'getNumber'
			}
			utilities.renderFregment(o);
			// 初始化页数
			if (maxPage == 0){
				showPages();
			}
			
		}

		// 上一页、下一页、页数下拉框
		function showPages() {
			//计算页数
			var temp=[];
			//初始化
			maxPage = Math.ceil(totalCount / pageSize);
			for (var i = 1; i <= maxPage; i++) {
				temp.push('<option name="pageSelector" pageid='+i+'>'+i+'/'+maxPage+'</option>');
			}
			$("#moneyctrlSelector").html(temp.join(" "));
			initFlag=false;
		}
		// 设置缓存
		function cacheData(data){
			if (!cache[pageId]){
				cache[pageId] = data;
			}
		}
		// 初始化数据
		showList();
		// 下拉框改变事件
		$("#moneyctrlSelector").on("change",function(){
			var index = $(this)[0].selectedIndex + 1;
			if ( index != pageId ){
				pageId = index;
				if(pageId==1){
					$(".moneyctrl-btn-pre").addClass("disabled");
					$(".moneyctrl-btn-next").removeClass("disabled");
				}else if(pageId==maxPage){
					$(".moneyctrl-btn-next").addClass("disabled");
					$(".moneyctrl-btn-pre").removeClass("disabled");
				}else{
					$(".moneyctrl-btn-next").removeClass("disabled");
					$(".moneyctrl-btn-pre").removeClass("disabled");
				}
				showList();
			}
		});
		// 上一页点击事件
		$(".moneyctrl-btn-pre").on("click",function(){
			var index = $("#moneyctrlSelector")[0].selectedIndex;
			if(index !=0 ){
				$("#moneyctrlSelector")[0].selectedIndex = index - 1;
				$("#moneyctrlSelector").trigger("change");
			}
		});
		// 下一页点击事件
		$(".moneyctrl-btn-next").on("click",function(){
			var index = $("#moneyctrlSelector")[0].selectedIndex;
			if(index != maxPage-1 ){
				$("#moneyctrlSelector")[0].selectedIndex = index + 1;
				$("#moneyctrlSelector").trigger("change");
			}
		});
	})(window);
});