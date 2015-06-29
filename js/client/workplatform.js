$(function(){
    $('.work-platform').height($(window).height());
    var tabcontHeight=$(window).height()-331;

    $('.work-platform .remind-tab-cont').height(tabcontHeight);
    TabcontControl();

    // 选项卡点击
    $(".tab-cont").eq(0).css("opacity",1);
    $(".message-tip-tab li").each(function(index){
        $(this).click(function(){
            $(".tab-cont").css("opacity",0);
            $(".tab-cont").eq(index).css("opacity",1);
            $(".message-tip-tab li").removeClass("current");
            $(this).addClass("current");
            $(".slidline").stop().animate({'left':169*$(this).index()},200);
            secondEllipsis();
            TabcontControl();
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


    // TabcontControl();
    function TabcontControl(){
            $('.work-platform .tab-cont-height').each(function(){
                var arrliHeight=[];
                var lis=$(this).get(0).getElementsByTagName("li");
                var lisheightsum=0;
                for(var i=0;i<lis.length;i++){
                    var liheight=$(lis).eq(i).outerHeight();
                    arrliHeight.push(liheight);
                }
                
                for(var i=0;i<lis.length && lisheightsum<=tabcontHeight;i++){
                    lisheightsum+=arrliHeight[i];                    
                    for(var j=0;j<lis.length;j++){
                        if(j<i){
                           $(lis[j]).show();
                        }else{
                            $(lis[j]).hide();
                        }
                    }
                   $(this).siblings('.more').show();
                    
                }
            });
    }

});

    

//  判断点击范围是否超出元素
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