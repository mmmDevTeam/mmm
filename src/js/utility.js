(function(window){
	var utilities={
		//使用jQ的ajax
		getAjax : function(obj){
			var o = obj;
			o.method = o.method || 'GET';
			if ( !o.url ) {
				console.log("获取失败，url地址为空！");
				return false;
			}
			$.ajax({
				url:o.url,
				type:o.method,
				data:o.data,
				dataType:o.dataType,
				success:function(data){
					console.log(data);
					if (o.callback){
						o.callback(data);
					}
				}
			})
		},
		getNumber:function(data){
			var reg = /\d+/;
			var res = 0; 
			if (!data){
				return res;
			}else{
				res = reg.exec(data);
				if (res){
					return res[0];
				}
				else{
					return 0;
				}
			}
		}
	};
	window.utilities=utilities;
})(window)