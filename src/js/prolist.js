$(function() {
	(function(window) {
		//当前页、总页数
		var maxPage = 0,
			totalCount = 0,
			pageSize = 10,
			pageId = 1,
			initFlag=true;
		var urlParams = utilities.getUrlParam(window.location.search);
		document.getElementsByTagName("header")[0].innerHTML = utilities.getHeader();
		document.getElementsByTagName("footer")[0].innerHTML = utilities.getFooter();
		// 显示产品类型等价
		function showCategoryLevel(name) {
			var o = {
				templateId: "categories-template",
				wrapperId: "categoriesWrapper",
				data: {
					id: urlParams.id,
					bk: urlParams.bk,
					bkn: decodeURI(urlParams.bkn),
					name: name
				}
			}
			utilities.renderFregment(o);
		}
		// 显示商品数据
		function showList() {
			utilities.getAjax({
				url: utilities.serverAddr + '/getproductlist',
				data: {
					"categoryid": urlParams.id,
					"pageid": pageId
				},
				dataType: "json",
				callback: function(data) {
					totalCount = data.totalCount;
					pageSize = data.pagesize;
					utilities.renderFregment({
						templateId: 'prolist-product-template',
						data: data,
						wrapperId: "prolistWrapper"
					});
					if(initFlag){
						showPages();
					}
				}
			});
		}
		// 请求类型数据
		function getCatogeryInfo(id) {
			utilities.getAjax({
				url: utilities.serverAddr + '/getcategorybyid',
				data: {
					"categoryid": id
				},
				dataType: "json",
				callback: function(data) {
					showCategoryLevel(data.result[0]["category"]);
				}
			});
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
			$("#proSelector").html(temp.join(" "));
			initFlag=false;
		}
		// 下拉框改变事件
		$("#proSelector").on("change",function(){
			var index = $(this)[0].selectedIndex + 1;
			if ( index != pageId ){
				pageId = index;
				if(pageId==1){
					$(".pro-btn-pre").addClass("disabled");
					$(".pro-btn-next").removeClass("disabled");
				}else if(pageId==maxPage){
					$(".pro-btn-next").addClass("disabled");
					$(".pro-btn-pre").removeClass("disabled");
				}else{
					$(".pro-btn-next").removeClass("disabled");
					$(".pro-btn-pre").removeClass("disabled");
				}
				showList();
			}
		});
		// 上一页点击事件
		$(".pro-btn-pre").on("click",function(){
			var index = $("#proSelector")[0].selectedIndex;
			if(index !=0 ){
				$("#proSelector")[0].selectedIndex = index - 1;
				$("#proSelector").trigger("change");
			}
		});
		// 下一页点击事件
		$(".pro-btn-next").on("click",function(){
			var index = $("#proSelector")[0].selectedIndex;
			if(index != maxPage-1 ){
				$("#proSelector")[0].selectedIndex = index + 1;
				$("#proSelector").trigger("change");
			}
		});
		getCatogeryInfo(urlParams.id);
		showList();
	})(window);
});