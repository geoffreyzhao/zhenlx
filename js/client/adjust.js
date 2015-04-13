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
    	$(".main-wrapper").eq(0).css({
    		"height": (document.documentElement.clientHeight - 142) + "px"
    	});
    }
}


/*  设置中间框的位置  */

function setMainBoxPosition() {
    if ($(".main-box").length !== 0) {
        $(".main-box").eq(0).css({
            "top": ($(".main-wrapper").height() - $(".main-box").height()) / 2 + "px"
        });
    }
}