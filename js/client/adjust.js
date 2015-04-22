$(function(){

    setWrapperHeight();
    setMainBoxPosition();

	window.onresize = function(){
		setWrapperHeight();
		setMainBoxPosition();
	}

});


/* 设置主体背景高度  */

function setWrapperHeight() {
    if ($(".main-wrapper").length !== 0) {

        var wrapperHeight = document.documentElement.clientHeight - 142;
        var mainBoxHeight = 0;

        if ($(".main-box").length !== 0) {
            mainBoxHeight = $(".main-box").height() + 60;
        }

        wrapperHeight = (wrapperHeight <= mainBoxHeight) ? mainBoxHeight : wrapperHeight;

    	$(".main-wrapper").eq(0).css({
    		"min-height": wrapperHeight + "px"
    	});
    }
}


/*  设置中间框的位置  */

function setMainBoxPosition() {
    if ($(".main-box").length !== 0) {
        var top = ($(".main-wrapper").height() - $(".main-box").height()) / 2;
        top = top < 30 ? 30 : top;   // top 最小值设为 30
        $(".main-box:visible").eq(0).css({
            "top": top + "px"
        });
    }
}