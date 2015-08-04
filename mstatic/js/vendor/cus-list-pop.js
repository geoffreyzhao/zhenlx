!(function($){
	$.fn.cusListPop = function(options){

		var defaults = {
			title: "请选择",
			scrollId: "wrapper",
			maxSize: 5,
			data: [],
		};

		var opts = $.extend({}, defaults, options);

		return this.each(function(){
			$this = $(this);

			var contId = opts.scrollId + "PopContainer";

			if ($("#" + contId).length == 0) {     //  生成DOM并且初始化Popup,IScroll

				if (opts.data.length > 0) {

					var popupTemp = "<div id='" + contId + "' class='list-pop-container'>";
					popupTemp += "<div class='pop-select-title'>" + opts.title + "</div>";
					popupTemp += "<div id='" + opts.scrollId + "' style='height:200px;'>";
					popupTemp += "<div id='scroller'><ul class='pop-ul-list'>";

					for (var i = 0; i < opts.data.length; i++) {
						
						var item = opts.data[i];

						if (typeof(item) == "number" || typeof(item) == "string") {

							popupTemp += "<li>" + item + "</li>";

						} else if (typeof(item) == "object") {

							var tmp = "";
							for (var key in item) {    //  只取单一的属性值
								tmp += " data-" + key + "='" + item[key] + "'";
							}

							popupTemp += "<li" + tmp + ">" + item.name + "</li>";

						} else {
							console.log('数据格式错误');
						}
					}

					popupTemp += "</ul></div></div></div>";

					$(this).after(popupTemp);
					$("#" + contId).popup({
						theme: 'a',
						overlayTheme: 'b',
						transition: 'slideup',
						positionTo: 'window',
						corners: false
					});

					$("#" + contId).popup("open");

				} else {
					console.log('未获取到数据');
				}
			} else {   	//  如果已经有popup结构，跳过生成DOM和初始化，只控制弹窗
				$("#" + contId).popup("open");
			}
		});
	}
})(jQuery);