/*   真旅行客户端   公共功能   */

$(function(){
    // 组合input的得到和失去焦点为父元素添加或删除边框    
    $(".componentInput input").focus(function(){
        $(this).parents(".componentInput").addClass("addBorder")
    });
    $(".componentInput input").blur(function(){
        $(this).parents(".componentInput").removeClass("addBorder")
        });
    
    $(".componentInput .getVerificationCode").click(function(){
        $(this).addClass("retry");
        $(this).html("<span>58</span>s后重新尝试")
    });

    $(".radioContent .radio").click(function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    });
    

});


/* 设置主体背景高度  start */

/*
function setWrapperHeight() {
	document.getElementById("main-wrapper").style.cssText =
			 "height:" + (document.documentElement.clientHeight - 142) + "px";
}

setWrapperHeight();


window.onresize = function() {
	setWrapperHeight();
}
*/

/* 设置主体背景高度  end */
