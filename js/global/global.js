/*   真旅行公共功能 （包含客户端及后台维护）   */

(function($) {
	$.fn.slideNav = function(o) {
	    o = $.extend({
	    		fx: "linear", 
	    		speed: 500,
	    		changeTextColor: false,
	    		click: function(){

	    		}
	    	}, o || {});

	    return this.each(function() {
	        var me = $(this), 
	        	noop = function(){},
	            $slider = $(this).children('.slider'),
	            $li = $("li", this), 
	            curr = $("li.current", this)[0] || $($li[0]).addClass("current")[0],
	            liTextColor = $("li", this).not(".current").not(".slider").css("color");

	        $li.not(".slider").hover(function() {
	            move(this);
	        }, noop);

	        $(this).hover(noop, function() {
	            move(curr);
	        });

	        $li.click(function(e) {
	            setCurr(this);
	            return o.click.apply(this, [e, this]);
	        });

	        setCurr(curr);

	        function setCurr(el) {
	            $slider.css({ "left": el.offsetLeft+"px" });
	            curr = el;
	            me.children('li').removeClass('current');
	            $(el).addClass("current");
	        };

	        function move(el) {
	            $slider.each(function() {
	                $(this).dequeue();
	            }).animate({
	                left: el.offsetLeft
	            }, o.speed, o.fx);

	            if (!!o.changeTextColor && typeof(o.changeTextColor) == "string") {

		            $(el).animate({
		            	color: o.changeTextColor
		            }, o.speed).dequeue();

		            $(el).siblings('li').not(".slider").animate({
		            	color: liTextColor
		            }, o.speed).dequeue();
	            }

	        };

	    });
	};


	//  模块悬停，随着需求和使用产品逐步优化
	$.fn.fixedBar = function(options) {

		var opts = $.extend({
			offsetX : 0,
			offsetY : 0
		}, options);		

		return this.each(function(){

			var top = $(this).offset().top,
				left = $(this).offset().left,
				marginTop = $(this).css("margin-top"),
				$that = $(this);

			$(window).scroll(function(event) {
				if ($(window).scrollTop() >= top) {
					$that.css({
						position: "fixed",
						top: (0 - parseInt(marginTop) + opts.offsetY) + "px",
						left: left + "px"
					});
				} else {
					$that.css({
						position: "static"
					});
				}
			});

		});
	}

	//  common tab bar
	$.fn.tabBar = function(){
		return this.each(function(){

			var $that = $(this);

			resetCommonTab();
	        $that.find("li.tab-item").click(function(){
	            $(this).siblings("li").removeClass("current");
	            $(this).addClass("current");
	            resetCommonTab();
	        });
		    
			function resetCommonTab() {
			    $that.find("li.placement").removeClass("left-active").removeClass("right-active");
			    $that.find("li.current").prev(".placement").addClass("left-active");
			    $that.find("li.current").next(".placement").addClass("right-active");

			    var h = $that.height(),
			        w = $that.width() - $that.find("li.rest").position().left;

			    $that.find("li.rest").css({
			        height: h + "px",
			        width: w + "px"
			    });
			}
		});
	}
})(jQuery);