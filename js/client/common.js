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

    //单选框
    $(".radioContent .radio").click(function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    });

    //复选框
    $(".checkboxContent .checkbox").click(function(){
        $(this).toggleClass("active");
    });

});

