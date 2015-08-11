!(function($){
	$.fn.cusListPop = function(options){

		var defaults = {
			title: "请选择",
			scrollId: "scroll",
			maxSize: 5,
			data: [],
			currentData: undefined,
			reCreate: false,   //   是否每次弹窗关闭时销毁列表DOM，弹出时重新生成列表DOM
			callback: function(){
				//  绑定弹窗上的事件操作    			
			}
		};

		var opts = $.extend({}, defaults, options);

		return this.each(function(){
			$this = $(this);

			var container = opts.scrollId + "PopContainer",
				wrapper = opts.scrollId + "Wrapper";

			if ($("#" + container).length == 0) {

				if (opts.data.length > 0) {

					var popupTemp = "<div id='" + container + "' class='list-pop-container'>";
					popupTemp += "<div class='pop-select-title'>" + opts.title + "</div>";
					popupTemp += "<div id='" + wrapper + "' class='list-scroll-wrapper'>";
					popupTemp += "<div id='scroller'><ul class='pop-ul-list'>";

					var curIndex = -1;

					if (opts.currentData !== undefined) {

						if (typeof(opts.data[0]) == "number" || typeof(opts.data[0]) == "string") {

							curIndex = $.inArray(opts.currentData, opts.data);

						} else if (typeof(opts.data[0]) == "object") {

							curIndex = _.findIndex(opts.data, opts.currentData);
						}				
					}

					for (var i = 0; i < opts.data.length; i++) {
						
						var item = opts.data[i];

						if (typeof(item) == "number" || typeof(item) == "string") {

							if (curIndex == i) {

								popupTemp += "<li class='current'>" + item + "</li>";
								curIndex = -1;
							} else {

								popupTemp += "<li>" + item + "</li>";
							}

						} else if (typeof(item) == "object") {

							var tmp = "";
							for (var key in item) {    //  只取单一的属性值
								tmp += " data-" + key + "='" + item[key] + "'";
							}

							if (curIndex == i) {

								popupTemp += "<li" + tmp + " class='current'>" + item.name + "</li>";
								curIndex = -1;
							} else {

								popupTemp += "<li" + tmp + ">" + item.name + "</li>";
							}

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

					if (opts.reCreate) {
						$("#" + container).on("popupafterclose", function(){
							$("#" + container).remove();
						});
					}

					$("#" + container).popup("open");

				} else {
					console.log('未获取到数据');
				}
			} else {

				$("#" + container).popup("open");
			}


			$(".pop-ul-list li").on("click", function(){
				$(this).closest("#scroller").find("li").removeClass("current");
				$(this).addClass("current");
			});

			opts.callback();
		});
	}
})(jQuery);