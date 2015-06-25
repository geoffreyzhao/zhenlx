$(function(){
	$(".top-nav-item").click(function(){
		$(this).siblings("li").removeClass("current");
		$(this).addClass("current");
	});
});