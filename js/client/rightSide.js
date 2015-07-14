$(function(){
	$(".feedback .modal").modal({
        backdrop:"static",
        keyboard: false,
        show: false
    });
    $(".feedback .feedbackbtn").click(function(){
        $("#ac-feedbackHintWindow").modal("show");
    });

    resizeModalTop();

    $(window).resize(function(){
        var top = ($(window).height() - $(".feedback .modal-dialog:visible").height()) / 2;
        $(".feedback .modal-dialog").css({
            "margin-top": top + "px"
        });
    });
   
	$('.feedback .modal').on('show.bs.modal', function (e) {
		setTimeout(function(){
		    var bodyPaddingR=parseInt($('body').css('padding-right'));
		    $('.rightSide').css('right',bodyPaddingR);
		},1);
	});
	$('.feedback .modal').on('hidden.bs.modal', function (e) {
	    	$('.rightSide').css('right','0');			
	});

	/*微信hover*/
	$('.wechatbtn').hover(function(){
		$('.wechatQR').toggle();
	});

	/*返回顶部*/
	var windowHeight=$(window).height();
	$(window).scroll(function(){
		var scrollHeight=$(window).scrollTop();
		if(scrollHeight>windowHeight){
			$('.returnTop').fadeIn(300);
		}else{
			$('.returnTop').fadeOut(300);
		}
	});
	$('.returnTop').click(function(){
		$('html,body').stop().animate({scrollTop:0},800);
	})

});

 function resizeModalTop() {
    $('.feedback .modal').on('show.bs.modal', function (e) {
        var top = ($(window).height() - $(this).find(".feedback .modal-dialog").height()) / 2;
        $(this).find(".feedback .modal-dialog").css({
            "margin-top": top + "px"
        });
    });
    
}