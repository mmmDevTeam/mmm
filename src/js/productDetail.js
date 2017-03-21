$(function(){
	(function(window){
		// 解析url参数
		var urlParams = utilities.getUrlParam(window.location.search);
		// 获取localstorage参数
		var category = (window.localStorage.getItem("categoryId-" + urlParams.id) || "全部商品");
		var product=null;
		//头部、尾部
		document.getElementsByTagName("header")[0].innerHTML = utilities.getHeader();
		document.getElementsByTagName("footer")[0].innerHTML = utilities.getFooter();
		// 获取商品信息
		utilities.getAjax({
			url:utilities.serverAddr+"/getproduct",
			data:{productid:urlParams.pid},
			dataType:"json",
			callback:showInfo
		});
		// 显示商品信息
		function showInfo(data){
			//缓存当前产品
			product = data.result[0];
			$(".product-stores").html(product.bjShop);
			showCategoryLevel(data);
			showProductDetail();
		}
		// 显示商品类型路径
		function showCategoryLevel(data){
			var o = {
				templateId: "categories-template",
				wrapperId: "categoriesWrapper",
				data: {
					categoryId: urlParams.cid,
					productId: urlParams.pid,
					bkn: category,
					name: data.result[0].productName.split(" ")[0]
				}
			}
			utilities.renderFregment(o);
		}
		// 显示商品详情
		function showProductDetail(){
			var o = {
				templateId: "DetailContentTemplate",
				wrapperId: "detailWrapper",
				data: {
					productName: product.productName,
					productImg: product.productImg
				}
			}
			utilities.renderFregment(o);
		}
		// 获取评论数据
		utilities.getAjax({
			url:utilities.serverAddr+"/getproductcom",
			data:{productid:urlParams.pid},
			dataType:"json",
			callback:showComments
		});
		// 显示评论
		function showComments(data){

			var o = {
				templateId: "commentTemplate",
				wrapperId: "commentsWrapper",
				data: data
			}
			utilities.renderFregment(o);
		}
	})(window)
});