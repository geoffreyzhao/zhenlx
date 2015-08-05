!(function($){
	$.fn.cusListPop = function(options){

		var defaults = {
			title: "请选择",
			scrollId: "scroll",
			maxSize: 5,
			data: [],
		};

		var opts = $.extend({}, defaults, options);

		return this.each(function(){
			$this = $(this);

			var container = opts.scrollId + "PopContainer",
				wrapper = opts.scrollId + "Wrapper";

			if ($("#" + container).length == 0) {     //  生成DOM并且初始化Popup,IScroll

				if (opts.data.length > 0) {

					var popupTemp = "<div id='" + container + "' class='list-pop-container'>";
					popupTemp += "<div class='pop-select-title'>" + opts.title + "</div>";
					popupTemp += "<div id='" + wrapper + "' class='list-scroll-wrapper'>";
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

					var liHeight = $("#" + wrapper).find("li:eq(0)").outerHeight(),
						listHeight = (opts.data.length >= opts.maxSize) ? 
										opts.maxSize * liHeight : opts.data.length * liHeight,
						titleHeight = $("#" + container).find(".pop-select-title").outerHeight();

					$("#" + container).css({
						height: (listHeight + titleHeight) + "px"
					});

					$("#" + wrapper).css({
						top: titleHeight + "px"
					});

					setTimeout(function(){
						new IScroll("#" + wrapper, {
							mouseWheel: true
						});
					}, 200);

						
					$("#" + container).popup({
						theme: 'a',
						overlayTheme: 'b',
						positionTo: 'window',
						transition: 'slideup',
						corners: false
					});

					$("#" + container).popup("open");

				} else {
					console.log('未获取到数据');
				}
			} else {   	//  如果已经有popup结构，跳过生成DOM和初始化，只控制弹窗
				$("#" + container).popup("open");
			}
		});
	}
})(jQuery);