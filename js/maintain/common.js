/*  真旅行后台维护  公共功能  */

$(function() {

    /*  头部导航交互  开始  */
    recoverCurrentNav();

    $(".first-level-nav").mouseenter(function(){
        $(".second-level-nav").hide();
        $(this).find(".second-level-nav").show();
    });

    $(".first-level-nav").mouseleave(function(){
        $(this).find(".second-level-nav").hide();

        recoverCurrentNav();
    });
    /*  头部导航交互  结束  */

    

    /*  默认日历初始化  */
    if ($("input.datepicker.default").length > 0) {
        $("input.datepicker.default").datepicker({
          format: "yyyy-mm-dd",
          language: "zh-CN",
          autoclose: true,
          todayHighlight: true,
          weekStart: 0
        }).on("show", function(){
            $("div.datepicker table thead .prev").html("");
            $("div.datepicker table thead .next").html("");
        });
    }

    /*  时间区间初始化
        注意： 开始和结束时间input元素要放在同一父元素下，即二者要成为兄弟元素
        并且同一父元素下，只能有一对开始-结束时间，否则会影响changeDate时间的赋值
    */
    //  开始时间
    if ($("input.datepicker.startDate").length > 0) {
        $("input.datepicker.startDate").datepicker({
            format: "yyyy-mm-dd",
            language: "zh-CN",
            autoclose: true,
            todayHighlight: true,
            weekStart: 0
        }).on("show", function(){
            $("div.datepicker table thead .prev").html("");
            $("div.datepicker table thead .next").html("");
        }).on("changeDate", function(){
            var startDate = $(this).datepicker("getDate");
            $(this).siblings('input.datepicker.endDate').datepicker("setStartDate", startDate);
        });
    }

    //  结束时间
    if ($("input.datepicker.endDate").length > 0) {
        $("input.datepicker.endDate").datepicker({
            format: "yyyy-mm-dd",
            language: "zh-CN",
            autoclose: true,
            todayHighlight: true,
            weekStart: 0
        }).on("show", function(){
            $("div.datepicker table thead .prev").html("");
            $("div.datepicker table thead .next").html("");
        }).on("changeDate", function(){
            var endDate = $(this).datepicker("getDate");
            $(this).siblings('input.datepicker.startDate').datepicker("setEndDate", endDate);
        });
    }

    // 翻页效果
    $(".pageNum .pageNumClick").click(function(){
        $(this).siblings(".paginationNum").toggle();
    });
    
    // 下拉列表
    $(".dropdown-menu li a").click(function(){
        var thisHtml = $(this).html();
        var $thisParents = $(this).parents(".dropdown-menu li");
        $(this).parents(".dropdown-menu").siblings(".dropdownBtn").find(".activeFonts").html(thisHtml);
        $thisParents.addClass("active");
        $thisParents.siblings().removeClass("active");
    });

    //单选框
    $(".radioContent .radio").click(function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    });

    //复选框
    $(".checkboxContent .checkboxInfo").click(function(){
        $(this).toggleClass("active");
    });
    
    
});

function recoverCurrentNav() {
    $(".second-level-nav").hide();
    $(".first-level-nav").each(function(){
        if ($(this).hasClass("currentStairMenu")) {
            $(this).find(".second-level-nav").show();
        }
    });
}