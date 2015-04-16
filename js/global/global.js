/*   真旅行公共功能 （包含客户端及后台维护）   */

(function($) {
	$.fn.slideNav = function(o) {
	    o = $.extend({
	    		fx: "linear", 
	    		speed: 500, 
	    		click: function(){

	    		}
	    	}, o || {});

	    return this.each(function() {
	        var me = $(this), 
	        	noop = function(){},
	            $slider = $(this).children('.slider'),
	            $li = $("li", this), 
	            curr = $("li.current", this)[0] || $($li[0]).addClass("current")[0];

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
	            me.children('.stay').removeClass('stay');
	            $slider.css({ "left": el.offsetLeft+"px", "width": el.offsetWidth+"px" });
	            curr = el;
	            me.children('li').removeClass('current');
	            $(el).addClass("current");
	        };

	        function move(el) {
	            $slider.each(function() {
	                $(this).dequeue();
	            }).animate({
	                width: el.offsetWidth,
	                left: el.offsetLeft
	            }, o.speed, o.fx);

	            if (!$(el).hasClass("current")) {
	            	$(curr).addClass("stay");
	            } else  {
	            	$(curr).removeClass("stay");
	            }
	        };

	    });
	};
})(jQuery);