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

    function recoverCurrentNav() {
        $(".second-level-nav").hide();
        $(".first-level-nav").each(function(){
            if ($(this).hasClass("currentStairMenu")) {
                $(this).find(".second-level-nav").show();
            }
        });
    }

    // 翻页效果
    $(".pageNum .pageNumClick").click(function(){
        $(this).siblings(".paginationNum").toggle();
    });
    
    
});