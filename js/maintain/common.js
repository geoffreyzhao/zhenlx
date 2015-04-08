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

    // 翻页效果
    $(".pageNum .pageNumClick").click(function(){
        $(this).siblings(".paginationNum").toggle();
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