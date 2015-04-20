(function($){
	$.fn.customValidate = function(options){

		var opts = $.extend({
	    	validateAll: true   //  是否验证form下所有需验证字段
	    }, options);

		var $curFormEle = $(this),
			result = true,
			cellphoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
			emailReg =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

		//  找到form下所有需要自定义验证的元素
		var validatedEles = $curFormEle.find("*[data-cv]");

		for (var i = 0; i < validatedEles.length; i++) {
			var $ve = $(validatedEles[i]);

			//  custom validator  属性值非空的进行验证
			if ($ve.data("cv") != '') {

				var validatorValues = $ve.data("cv").split(',');  // 得到所有需要验证的类型[required,email,...]
				var validatorTitle = $ve.data("ct");  // 得到验证字段名

				//  当前验证元素为 input 类型
				if ($ve.is("input")) {
					
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
							if (!cellphoneReg.test(val)) {
								geneErrorEle($this, "手机号格式错误");								
								result = false;
								break forValidatorValues;
							} else {
								cleanErrorEle($this);
							}
						}

						if (validatorValues[j] == "email") {  //  邮箱验证
							if (!emailReg.test(val)) {
								geneErrorEle($this, "邮箱格式错误");								
								result = false;
								break forValidatorValues;
							} else {
								cleanErrorEle($this);
							}
						}						
					}

					if (!opts.validateAll && !result) {  //  验证直到出现不符合的字段为止，之后字段不再验证
						break;
					}
					
				}


				//  当前验证元素为 dropdownlist 类型
				if ($ve.hasClass("dropdown-menu")) {

					var $this = $ve;

					if (!$this.find("li.active").attr('name')) {
						$this.parent("div.dropdown").after($("<div class='verifyStyle' style='width: " + $this.outerWidth() + "px;'>" 
						+"<i class='verifyIcon'></i><span class='verifyFonts'>"
						+validatorTitle+"不能为空</span></div>"));
					} else {
						$this.parent("div.dropdown").siblings('.verifyStyle').remove();
					}
				}
			}
		}

		return result;
	}

	function geneErrorEle($this, msg) {
		$this.addClass("verifyBox");
		if ($this.siblings("div.verifyStyle").length == 0) {
			$this.after($("<div class='verifyStyle' style='width: " + $this.outerWidth() + "px;'>" 
						+"<i class='verifyIcon'></i><span class='verifyFonts'>"
						+msg+"</span></div>"));
		} else {
			$this.siblings("div.verifyStyle").find(".verifyFonts").html(msg);
		}
	}

	function cleanErrorEle($this) {
		if ($this.siblings("div.verifyStyle").length != 0) {
			$this.removeClass('verifyBox');
			$this.siblings('div.verifyStyle').remove();
		}
	}
})(jQuery);