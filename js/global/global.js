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
})(jQuery);