$(function(){
    $('.work-platform').height($(window).height());   

    // 选项卡点击
    $(".work-platform .tab-cont").eq(0).show();

    $(".message-tip-tab > li").each(function(index){
        if (index == $(".message-tip-tab > li").length - 1) {
            return;
        } else {
            $(this).click(function(){
                $(".work-platform .tab-cont").hide();
                $(".work-platform .tab-cont").eq(index).show();
                $(".message-tip-tab li").removeClass("current");
                $(this).addClass("current");
                $(".slidline").stop().animate({'left':169*$(this).index()},200);
                secondEllipsis();
                TabcontControl();
            });
        }
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


    // 提醒及私信模块根据内容高度展示内容

    window.onresize = function(){
        $('.work-platform').height($(window).height());
        TabcontControl();
    }

});

    function TabcontControl(){
            var tabcontHeight=$(window).height()-331,
                liGap = parseInt($(".work-platform .tab-cont-height li").css("margin-bottom"));
            $('.work-platform .remind-tab-cont').height(tabcontHeight);
            $('.work-platform .tab-cont-height').each(function(){
                var arrliHeight=[];
                var lis=$(this).get(0).getElementsByTagName("li");
                var lisheightsum=0;
                for(var i=0;i<lis.length;i++){
                    var liheight=$(lis).eq(i).outerHeight();
                    arrliHeight.push(liheight);
                }

                addHeightLoop:
                for(var i=0;i<lis.length;i++){
                    lisheightsum+=(arrliHeight[i]+liGap);
                    $(lis).show();
                    if((lisheightsum-liGap)>tabcontHeight){
                        for(var j=i;j<lis.length;j++){
                            $(lis[j]).hide();
                        }
                        $(this).next(".more").show();
                        break addHeightLoop;
                    } else {
                        $(this).next(".more").hide();
                    }
                    
                }

            });
    }
    

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
        // var $a = $("a", $(this)).eq(0);
        while ($p.outerHeight() > divH) {
            // $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
            $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]?|\W)(\.\.\.)?$/, "..."));
        }
      });
    }