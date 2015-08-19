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
            $(document).unbind('touchmove');
            $(document).unbind('touchmove');
        }
    });

});