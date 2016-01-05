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
    $(".radioContent .radio:not('.disabled')").click(function(){
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

