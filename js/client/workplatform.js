$(function(){
    $(".loginBtn").click(function(event){
            $(".login-entrance").hide();
            $(".after-login").show();
            $(".workpla-login").hide();
            $(".workpla-afterlogin").show();
            event.stopPropagation();
        });

    $(".exitbtn").click(function(event){
        $(".after-login").hide();
        $(".login-entrance").show();
        $(".workpla-login").show();
        $(".workpla-afterlogin").hide();
        event.stopPropagation();
    });

    // 选项卡点击
    $(".tab-cont").eq(0).show();
    $(".message-tip-tab li").each(function(index){
        $(this).click(function(){
            $(".tab-cont").hide();
            $(".tab-cont").eq(index).show();
            $(".message-tip-tab li").removeClass("current");
            $(this).addClass("current");
            $(".slidline").stop().animate({'left':169*$(this).index()},200);
            secondEllipsis();
        });
    });

    // 提醒底部圆点hover
    $(".remind-tab-cont").eq(0).show();
    $(".remind-tab-dot li").each(function(index){
        $(this).hover(function(){
            $(".remind-tab-cont").hide();
            $(".remind-tab-cont").eq(index).show();
            $(".remind-tab-dot li").removeClass("current");
            $(this).addClass("current");
            // $(".slidline").animate({'left':169*$(this).index()},200);
        });
    });
    // 私信底部原点hover
    $(".privletter-tab-cont").eq(0).show();
    $(".privletter-tab-dot li").each(function(index){
        $(this).hover(function(){
            $(".privletter-tab-cont").hide();
            $(".privletter-tab-cont").eq(index).show();
            $(".privletter-tab-dot li").removeClass("current");
            $(this).addClass("current");
            // $(".slidline").animate({'left':169*$(this).index()},200);
            secondEllipsis();
        });
    });
  
    // 工作台侧边按钮点击
    $('.workplabtn').click(function(event){
      workplatformChange();
      event.stopPropagation();
    });

    $("body").click(function(event){
        if (!isOuterTrigger(event, $(".work-platform"))){
            var leftvalue=parseInt($('.work-platform').css('left'));
            if(leftvalue==0){
              $('.work-platform').stop().animate({'left':'-385px'},300,function(){
                $('.work-platform').stop().animate({'left':'-358px'});
              });
            } 
          }
     });
    

});

//  判断点击范围是否超出元素
    function isOuterTrigger(event, $ele) {
        var top = $ele.offset().top;
        var left = $ele.offset().left;
        var width = $ele.outerWidth();
        var height = $ele.outerHeight();

        var _x = event.pageX;
        var _y = event.pageY;

        if (_y > top + height || _y < top || _x > left + width || _x < left) {
            return false;
        } else {
            return true;
        }
    }

     function workplatformChange(){
            var leftvalue=parseInt($('.work-platform').css('left'));
            if(leftvalue==0){
              $('.work-platform').stop().animate({'left':'-385px'},300,function(){
                $('.work-platform').stop().animate({'left':'-358px'});
              });
            }else if(leftvalue==-358){
              $('.work-platform').stop().animate({'left':'-385px'},400,function(){
                $('.work-platform').stop().animate({'left':'0'});
              });
            }
     }

     function secondEllipsis(){
     $(".secondEllipsis").each(function(){
        var divH = $(this).height();
        var $p = $("p", $(this)).eq(0);
        var $a = $("a", $(this)).eq(0);
        while ($p.outerHeight() > divH) {
            $a.text($a.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
            }
      });
    }