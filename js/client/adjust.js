$(function(){

    // setTimeout(function(){
	   setWrapperHeight();
	   setMainBoxPosition();
    // }, 100)

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

        console.log(wrapperHeight);

        if ($(".main-box").length !== 0) {
            mainBoxHeight = $(".main-box").height() + 60;
        }

        console.log(mainBoxHeight);

        wrapperHeight = (wrapperHeight <= mainBoxHeight) ? mainBoxHeight : wrapperHeight;

        console.log(wrapperHeight);

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
        $(".main-box").eq(0).css({
            "top": top + "px"
        });
    }
}