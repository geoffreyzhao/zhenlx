/*  真旅行后台维护  公共功能  */

$(function() {

    /*  头部导航交互  开始  */
    recoverCurrentNav();

    $(".first-level-nav").mouseenter(function(){
        $(".second-level-nav").hide();
        $(this).find(".second-level-nav").show();
    });

    $(".first-level-nav").mouseleave(function(event){

        if (!isOuterTrigger(event, $(".headSecondLevel")) && !isOuterTrigger(event, $(this).find(".second-level-nav"))) {
            $(this).find(".second-level-nav").hide();
            recoverCurrentNav();
        }

    });

    $(".headSecondLevel").mouseleave(function(event){
        $(".second-level-nav").hide();
        recoverCurrentNav();
    });
    $(".second-level-nav").mouseleave(function(event){
        if (!isOuterTrigger(event, $(this))) {
            $(".second-level-nav").hide();
            recoverCurrentNav();
        }
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
            // var startDate = $(this).datepicker("getDate");
            // $(this).siblings('input.datepicker.endDate').datepicker("setStartDate", startDate);
        });

        // 手动清空输入框时，清除对应的时间
        $("input.datepicker.startDate").focus(function(){
            var $endDate = $(this).siblings('input.datepicker.endDate');
            if ($endDate.val() == "") {
                $endDate.datepicker("clearDates");
            } else {
                $(this).datepicker("setEndDate", $endDate.val());
            }
        });
    }

    //  结束时间
    if ($("input.datepicker.endDate").length > 0) {
        $("input.datepicker.endDate").datepicker({
            format: "yyyy-mm-dd",
            language: "zh-CN",
            autoclose: true,
            todayHighlight: true,
            weekStart: 0,
            setStartDate: $(this).siblings('input.datepicker.startDate').datepicker('getDate')
        }).on("show", function(){
            $("div.datepicker table thead .prev").html("");
            $("div.datepicker table thead .next").html("");
        }).on("changeDate", function(){
            // var endDate = $(this).datepicker("getDate");
            // $(this).siblings('input.datepicker.startDate').datepicker("setEndDate", endDate);
        });

        // 手动清空输入框时，清除对应的时间
        $("input.datepicker.endDate").focus(function(){
            var $startDate = $(this).siblings('input.datepicker.startDate');
            if ($startDate.val() == "") {
                $startDate.datepicker("clearDates");
            } else {
                $(this).datepicker("setStartDate", $startDate.val());
            }
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
    $("body").delegate(".radioContent .radio:not('.disabled')", "click", function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    });

    //复选框
    $(".checkboxContent .checkboxInfo").click(function(){
        $(this).toggleClass("active");
    });
    
    //  modal 弹窗位置居中 (modal框，需要提前定宽和高)
    if ($(".modal").length != 0) {
        $('.modal').on('show.bs.modal', function (e) {
            var top = ($(window).height() - $(this).find(".modal-dialog").height()) / 2;
            $(this).find(".modal-dialog").css({
                "margin-top": top + "px"
            });
        });
    }

    $(window).resize(function(){
        if ($(".modal-dialog:visible").length != 0) {
            var top = ($(window).height() - $(".modal-dialog:visible").height()) / 2;
            $(".modal-dialog:visible").css({
                "margin-top": top + "px"
            });
        }
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

function isOuterTrigger(event, $ele) {
    if($ele.length == 0){
        return false ;
    }
    var top = $ele.offset().top;
    var left = $ele.offset().left;
    var width = $ele.outerWidth();
    var height = $ele.outerHeight();

    var _x = event.pageX;
    var _y = event.pageY;

    if (_y > top + height || _y < top || _x > left + width || _x < left) {  //  超出范围了
        return false;
    } else {
        return true;
    }
}

/** 保存操作完成后提示窗 **/
function clickActionPopup(id){
    var screenHeight = $(window).height();
    var scrollTop = $(document).scrollTop();
    var objTop = (screenHeight - 120)/2 + scrollTop;
    $("#"+id).css("top", objTop+"px");
    $("#"+id).fadeIn();
    setTimeout(function(){
        $("#"+id).fadeOut();
    }, 2000);
}
