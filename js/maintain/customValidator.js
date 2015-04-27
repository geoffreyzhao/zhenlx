(function($){
	$.fn.customValidate = function(options){

		var opts = $.extend({
	    	validateAll: true   //  是否验证form下所有需验证字段(暂取消该属性配置)
	    }, options);

		var $curFormEle = $(this),
			result = true,
			cellphoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
			emailReg =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

		//  找到form下所有需要自定义验证的元素
		var validatedEles = $curFormEle.find("*[data-cv]");

		$curFormEle.find("input[data-cv]").each(function(){
			if ($(this).attr("readonly") !== "readonly") {
				$(this).bind("keyup", function(event) {
					if ($.trim($(this).val()) != "") {
						cleanErrorEle($(this));
					}
				});
			}
		});

		for (var i = 0; i < validatedEles.length; i++) {
			var $ve = $(validatedEles[i]);

			//  custom validator  属性值非空的进行验证
			if ($ve.data("cv") != '') {

				var validatorValues = $ve.data("cv").split(',');  // 得到所有需要验证的类型[required,email,...]
				var validatorTitle = $ve.data("ct");  // 得到验证字段名
				var validatorPosition = $ve.data("cp");  //  得到错误消息显示位置，默认bottom
				validatorTitle = (validatorTitle == undefined) ? "" : validatorTitle;

				//  当前验证元素为 input 类型
				if ($ve.is("input") && $ve.is(":visible") && $ve.attr("readonly") !== "readonly") {
					
					var $this = $ve,
						val = $.trim($this.val());					

					forValidatorValues:  //  为内层循环定义名称，以便跳出循环
					for (var j = 0; j < validatorValues.length; j++) {

						if (validatorValues[j] == "required") {   //  非空验证							

							if (val == "") {								
								geneErrorEle($this, validatorTitle+"不能为空");		//  生成报错信息DOM结构						
								result = false;
								break forValidatorValues;    //  每次只验证一个类型，若出错，则跳出循环结束该字段验证
							} else {
								cleanErrorEle($this);   //  清除报错信息DOM结构
							}
						}

						if (validatorValues[j] == "cellphone") {  //  手机号验证
							if (val != "" && !cellphoneReg.test(val)) {
								geneErrorEle($this, "手机号格式错误");								
								result = false;
								break forValidatorValues;
							} else {
								cleanErrorEle($this);
							}
						}

						if (validatorValues[j] == "email") {  //  邮箱验证
							if (val != "" && !emailReg.test(val)) {
								geneErrorEle($this, "邮箱格式错误");								
								result = false;
								break forValidatorValues;
							} else {
								cleanErrorEle($this);
							}
						}
						
					}

					// 验证直到出现不符合的字段为止，之后字段不再验证
					if (!opts.validateAll && !result) {  
						break;
					}
					
				}


				//  当前验证元素为 dropdownlist 类型
				if ($ve.hasClass("dropdown-menu")) {

					if (!$ve.find("li.active").attr('name')) {

						result = false;
						
						$ve.parent("div.dropdown").after($("<div class='verifyStyle'>" 
						+"<i class='verifyIcon'></i><span class='verifyFonts'>"
						+validatorTitle+"不能为空</span></div>"));

						setErrorElePosition($ve);
					} else {
						$ve.parent("div.dropdown").siblings('.verifyStyle').remove();
					}
				}
			}
		}

		return result;
	}

	function geneErrorEle($this, msg) {
		$this.addClass("verifyBox");
		if ($this.next("div.verifyStyle").length == 0) {
			$this.after($("<div class='verifyStyle'>" 
						+"<i class='verifyIcon'></i><span class='verifyFonts'>"
						+msg+"</span></div>"));
		} else {
			$this.next("div.verifyStyle").find(".verifyFonts").html(msg);
		}
		setErrorElePosition($this);
	}

	function cleanErrorEle($this) {
		if ($this.next("div.verifyStyle").length != 0) {
			$this.removeClass('verifyBox');
			$this.next('div.verifyStyle').remove();
		}
	}

	function setErrorElePosition($this) {

		var pos = $this.data("cp");

		var height = $this.outerHeight(),
			width = $this.outerWidth(),
			offsetTop = $this.offset().top,
			offsetLeft = $this.offset().left;

		var $errEle = $this.next("div.verifyStyle"),
			err_height = $errEle.height(),
			err_outerHeight = $errEle.outerHeight(),
			err_width = $errEle.width(),
			err_outerWidth = $errEle.outerWidth();

		console.log(err_height);

		var w, left, top;

		if (pos == "right") {

			left = offsetLeft + width;
			$errEle.css({
				"width": err_outerWidth + "px",
				"left": left + "px",
				"top": offsetTop + "px",
				"padding-top": (height - err_height)/2 + "px",
				"padding-bottom": (height - err_height)/2 + "px"
			});

		} else if (pos == "top") {

			w = (width >= err_outerWidth) ? width : err_outerWidth;
			top = offsetTop - err_outerHeight;
			$errEle.css({
				"width": w + "px",
				"left": offsetLeft + "px",
				"top": top + "px"
			});

		} else if (pos == "left") {

			left = offsetLeft - err_outerWidth;
			$errEle.css({
				"width": err_outerWidth + "px",
				"left": left + "px",
				"top": offsetTop + "px",
				"padding-top": (height - err_height)/2 + "px",
				"padding-bottom": (height - err_height)/2 + "px"
			});

		} else {  //  其他情况均视为默认在下方显示

			w = (width >= err_outerWidth) ? width : err_outerWidth;
			$errEle.css({
				"width": w + "px",
				"left": offsetLeft + "px"
			});
		}
	}

})(jQuery);