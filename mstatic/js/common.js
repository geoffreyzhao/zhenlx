$(function(){

	//  重写click事件
	FastClick.attach(document.body);

	//  弹出层出现时，禁止页面滑动
	$("div[data-role='popup']").popup({
        afteropen: function(){
            $(".ui-popup-screen").bind("touchmove", function(){  //  弹窗遮罩层禁止滑动
                return false;
            });

            $(".ui-content").bind("touchmove", function(){   //  报错框，二次确认框禁止滑动
                return false;
            });
        },
        afterclose: function() {
            $(".ui-popup-screen").unbind("touchmove");
            $(".ui-content").unbind("touchmove");
            $(document).unbind('touchmove');
        }
    });

    //移动端点击<label>包围的input控件后面的文本触发相应的事件
    $("label").click(function(){
        $(this).find("input[type='radio']").prop("checked", "checked");
        $(this).find("input[type='checkbox']").prop("checked", "checked");
    });

});