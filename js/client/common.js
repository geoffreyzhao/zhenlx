/*   真旅行客户端   公共功能   */

$(function(){
    // 组合input的得到和失去焦点为父元素添加或删除边框    
    $(".componentInput input").focus(function(){
        $(this).parents(".componentInput").addClass("addBorder")
    });
    $(".componentInput input").blur(function(){
        $(this).parents(".componentInput").removeClass("addBorder")
        });
    
    //单选框
    $(".radioContent .radio").click(function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    });

    //复选框
    $(".checkboxContent .checkbox").click(function(){
        $(this).toggleClass("active");
    });

    // 下拉列表
    $(".dropdown-menu li a").click(function(){
        var thisHtml = $(this).html();
        var $thisParents = $(this).parents(".dropdown-menu li");
        $(this).parents(".dropdown-menu").siblings(".dropdownBtn").find(".activeFonts").html(thisHtml);
        $thisParents.addClass("active");
        $thisParents.siblings().removeClass("active");
    });

});

