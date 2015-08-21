
	function AddressPicker(element, options){

		this.elementId = element;

		var opts = $.extend({}, { 
			currentAddress: ['上海市', '上海市', '宝山区']
		}, options);

		this.opts = opts;

		this.cur_province = opts.currentAddress[0];
		this.cur_city = opts.currentAddress[1];
		this.cur_county = opts.currentAddress[2];

		this.provinceArr = JSON.parse(sessionStorage.getItem("province"));
		this.cityArr = JSON.parse(sessionStorage.getItem("city"));
		this.countyArr = JSON.parse(sessionStorage.getItem("county"));
	};

	AddressPicker.prototype = {

		_initDOM: function() {

			var cur_province = this.cur_province,
				cur_city = this.cur_city,
				cur_county = this.cur_county,
				provinceArr = this.provinceArr,
				cityArr = this.cityArr,
				countyArr = this.countyArr;

			var domStr = '<div class="selected-address-bar"></div>';

			//  省 DOM 节点

			var provinceDomStr = '<div id="provinceWrapper" class="address-wrapper"><div><ul><li></li><li></li>';

			for (var i = 0; i < provinceArr.length; i++) {

				if (provinceArr[i] == cur_province) {
					provinceDomStr += '<li class="current">' + provinceArr[i] + '</li>';	
				} else {
					provinceDomStr += '<li>' + provinceArr[i] + '</li>';
				}
			}

			provinceDomStr += '<li></li><li></li></ul></div></div>';

			//  市 DOM 节点
			
			var cityDomStr = '<div id="cityWrapper" class="address-wrapper"><div>';

			cityDomStr += geneCityDomByProvince(cur_province, cur_city, cityArr);

			cityDomStr += '</div></div>';

			//  县 DOM 节点

			var countyDomStr = '<div id="countyWrapper" class="address-wrapper"><div>';

			countyDomStr += geneCountyDomByCity(cur_city, cur_county, countyArr);

			countyDomStr += '</div></div>';

			//  页面追加DOM结构
			domStr += provinceDomStr + cityDomStr + countyDomStr;

			$(this.elementId).append(domStr);

			//  设置弹窗基本方法
			$(this.elementId).closest("div[data-role='popup']").on("popupafteropen", function(){

				$(".ui-popup-screen").bind("touchmove", function(){  //  弹窗遮罩层禁止滑动
			        return false;
			    });

			    $(".addresspicker-top-block").bind("touchmove", function(){  //  弹窗遮罩层禁止滑动
			        return false;
			    });
			});

			var tmp = this.elementId;
			$(tmp).closest("div[data-role='popup']").find(".dp-cancel-btn").click(function(){
				$(tmp).closest("div[data-role='popup']").popup("close");
			});

			$(tmp).closest("div[data-role='popup']").find(".dp-sure-btn").click(function(){
				$(tmp).closest("div[data-role='popup']").popup("close");
			});
		},

		_initIScroll: function() {
			var province_scroll = new IScroll(this.elementId + " #provinceWrapper", {
				mouseWheel: true,
				bounce: false
			});
			var city_scroll = new IScroll(this.elementId + " #cityWrapper", {
				mouseWheel: true,
				bounce: false
			});
			var county_scroll = new IScroll(this.elementId + " #countyWrapper", {
				mouseWheel: true,
				bounce: false
			});

			// dealScroll(province_scroll);
			// dealScroll(city_scroll);
			// dealScroll(county_scroll);

			var global_provinceArr = this.provinceArr,
				global_cityArr = this.cityArr,
				global_countyArr = this.countyArr;


			var liHeight = $(province_scroll.wrapper).find("li:eq(0)").outerHeight();

	    	var province_start_posY,
	    		province_end_posY,
	    		city_start_posY,
	    		city_end_posY,
	    		county_start_posY,
	    		county_end_posY;

	    	//  省份滚动处理

	    	province_scroll.on("scrollStart", function(){
	    		province_start_posY = province_scroll.y;
	    	});

			$(province_scroll.scroller).on("scrollstop", function(){
				province_end_posY = province_scroll.y;

	    		var dist = Math.abs(province_end_posY - province_start_posY),
	    			passLiNum = Math.round(dist / liHeight),
	    			offset = dist % liHeight,
	    			curLiNum = $(province_scroll.scroller).find("li.current").index() + 1,
	    			flag = (province_end_posY - province_start_posY > 0) ? 1 : -1,
	    			scrollNum = curLiNum - (flag * passLiNum);

	    		province_scroll.scrollTo(0, -(scrollNum - 3) * liHeight, 300, IScroll.utils.ease.quadratic);

	    		setTimeout(function(){
		    		$(province_scroll.wrapper).find("li").removeClass("current");
					$(province_scroll.wrapper).find("li").eq(scrollNum-1).addClass("current");
	    		}, 300);
			});

			//  省滚动结束，重置市和县/区(第一个市下面的县区)，并滚至第一个
			province_scroll.on("scrollEnd", function(){

				var province = $(province_scroll.scroller).find("li.current").html(),
					cityArr = getCityArrByProvince(province, global_cityArr),
					city = cityArr[0],
					countyArr = getCountyArrByCity(city, global_countyArr),
					county = countyArr[0];

				$(city_scroll.scroller).html(geneCityDomByProvince(province, city, global_cityArr));
				city_scroll.refresh();
				city_scroll.scrollTo(0, 0);

				$(county_scroll.scroller).html(geneCountyDomByCity(city, county, global_countyArr));
				county_scroll.refresh();
				county_scroll.scrollTo(0, 0);
			});

			//  市滚动处理

			city_scroll.on("scrollStart", function(){
	    		city_start_posY = city_scroll.y;
	    	});

			$(city_scroll.scroller).on("scrollstop", function(){
				city_end_posY = city_scroll.y;

	    		var dist = Math.abs(city_end_posY - city_start_posY),
	    			passLiNum = Math.round(dist / liHeight),
	    			offset = dist % liHeight,
	    			curLiNum = $(city_scroll.scroller).find("li.current").index() + 1,
	    			flag = (city_end_posY - city_start_posY > 0) ? 1 : -1,
	    			scrollNum = curLiNum - (flag * passLiNum);

	    		city_scroll.scrollTo(0, -(scrollNum - 3) * liHeight, 300, IScroll.utils.ease.quadratic);

	    		setTimeout(function(){
		    		$(city_scroll.wrapper).find("li").removeClass("current");
					$(city_scroll.wrapper).find("li").eq(scrollNum-1).addClass("current");
	    		}, 300);
			});

			//  市滚动结束，重置县区列表内容，并滚至第一个
			city_scroll.on("scrollEnd", function(){

				var city = $(city_scroll.scroller).find("li.current").html(),
					countyArr = getCountyArrByCity(city, global_countyArr),
					county = countyArr[0];

				$(county_scroll.scroller).html(geneCountyDomByCity(city, county, global_countyArr));
				county_scroll.refresh();
				county_scroll.scrollTo(0, 0);
			});

			//  县滚动处理

			county_scroll.on("scrollStart", function(){
	    		county_start_posY = county_scroll.y;
	    	});

			$(county_scroll.scroller).on("scrollstop", function(){
				county_end_posY = county_scroll.y;

	    		var dist = Math.abs(county_end_posY - county_start_posY),
	    			passLiNum = Math.round(dist / liHeight),
	    			offset = dist % liHeight,
	    			curLiNum = $(county_scroll.scroller).find("li.current").index() + 1,
	    			flag = (county_end_posY - county_start_posY > 0) ? 1 : -1,
	    			scrollNum = curLiNum - (flag * passLiNum);

	    		county_scroll.scrollTo(0, -(scrollNum - 3) * liHeight, 300, IScroll.utils.ease.quadratic);

	    		setTimeout(function(){
		    		$(county_scroll.wrapper).find("li").removeClass("current");
					$(county_scroll.wrapper).find("li").eq(scrollNum-1).addClass("current");
	    		}, 300);
			});

			return [province_scroll, city_scroll, county_scroll];
		},

		init: function() {

			this._initDOM();
			var scrollArr = this._initIScroll();

			this.province_scroll = scrollArr[0];
			this.city_scroll = scrollArr[1];
			this.county_scroll = scrollArr[2];

			this.setAddress(this.opts.currentAddress);

			return this;
		},

		getAddress: function() {
			return [$(this.province_scroll.scroller).find("li.current").html(),
					$(this.city_scroll.scroller).find("li.current").html(),
					$(this.county_scroll.scroller).find("li.current").html()];
		},

		setAddress: function(arr) {
			var province = arr[0],
				city = arr[1],
				county = arr[2];

			var liHeight = $(this.province_scroll.scroller).find("li:eq(0)").outerHeight();

			//  省滚动
			var num_province = $.inArray(province, this.provinceArr);
			this.province_scroll.scrollTo(0, -num_province*liHeight);

			//  生成市结构，scroll刷新，月份滚动
			$(this.city_scroll.scroller).html(geneCityDomByProvince(province, city, this.cityArr));
    		this.city_scroll.refresh();
    		var num_city = $.inArray(city, getCityArrByProvince(province, this.cityArr));
			this.city_scroll.scrollTo(0, -num_city*liHeight);

			//  生成县/区结构，scroll 刷新，日期滚动
			$(this.county_scroll.scroller).html(geneCountyDomByCity(city, county, this.countyArr));
    		this.county_scroll.refresh();
    		var num_county = $.inArray(county, getCountyArrByCity(city, this.countyArr));
			this.county_scroll.scrollTo(0, -num_county*liHeight);

			// 设置当前地址current样式
			setItemStyle(this.province_scroll, liHeight);
			setItemStyle(this.city_scroll, liHeight);
			setItemStyle(this.county_scroll, liHeight);
		}
	};		

	function dealScroll(scroll) {
		var start_posY,
    		end_posY,
    		dist,	// 滚动差
    		liHeight = $(scroll.wrapper).find("li:eq(0)").outerHeight(),
    		half_liHeight = liHeight / 2,
    		flag,	// 滚动方向
    		offset;	// 滚动偏移量

		scroll.scrollTo(0, -($(scroll.wrapper).find("li.current").index()-2) * liHeight);

    	scroll.on("scrollStart", function(){
    		start_posY = scroll.y;
    	});

    	scroll.on("scrollEnd", function(){
    		end_posY = scroll.y;
    		dist = Math.abs(end_posY - start_posY);

    		setItemStyle(scroll, liHeight);

    		// scrollBy  Y 为正 向下滚动,  Y 为负  向上滚动

    		offset = dist % liHeight;

    		if (offset != 0) {

    			flag = (end_posY - start_posY > 0) ? 1 : -1;   //  判断滚动方向 上|下

    			if (offset < half_liHeight) {  //  滚至前一个
    				scroll.scrollBy(0, -offset * flag, 300, IScroll.utils.ease.quadratic);
    			} else if (offset >= half_liHeight) {  //  滚至后一个
    				scroll.scrollBy(0, offset * flag, 300, IScroll.utils.ease.quadratic);
    			}
    		}
    	});
	}

	function getCityArrByProvince(province, cityArr) {

		var pluck_provinceArr = _.pluck(cityArr, 'parent'),
			index = _.indexOf(pluck_provinceArr, province),
			res_cityArr = cityArr[index].children;

		return res_cityArr;
	}

	function geneCityDomByProvince(province, curCity, cityArr) {

		var pluck_provinceArr = _.pluck(cityArr, 'parent'),
			index = _.indexOf(pluck_provinceArr, province),
			res_cityArr = cityArr[index].children;

		var resCityDomStr = '<ul><li></li><li></li>';

		for (var i = 0; i < res_cityArr.length; i++) {

			if (res_cityArr[i] == curCity) {
				resCityDomStr += '<li class="current">' + res_cityArr[i] + '</li>';	
			} else {
				resCityDomStr += '<li>' + res_cityArr[i] + '</li>';
			}
		}

		resCityDomStr += '<li></li><li></li></ul>';
		return resCityDomStr;
	}

	function getCountyArrByCity(city, countyArr) {
		var pluck_cityArr = _.pluck(countyArr, 'parent'),
			index = _.indexOf(pluck_cityArr, city),
			res_countyArr = countyArr[index].children;

		return res_countyArr;
	}

	function geneCountyDomByCity(city, curCounty, countyArr) {
		var pluck_cityArr = _.pluck(countyArr, 'parent'),
			index = _.indexOf(pluck_cityArr, city),
			res_countyArr = countyArr[index].children;

		var resCountyDomStr = '<ul><li></li><li></li>';

		for (var i = 0; i < res_countyArr.length; i++) {

			if (res_countyArr[i] == curCounty) {
				resCountyDomStr += '<li class="current">' + res_countyArr[i] + '</li>';	
			} else {
				resCountyDomStr += '<li>' + res_countyArr[i] + '</li>';
			}
		}

		resCountyDomStr += '<li></li><li></li></ul>';
		return resCountyDomStr;
	}

	//  设置当前日期样式
	function setItemStyle(scroll, liHeight) {
		var scrollY = scroll.y,
			scroll_num = Math.abs(scrollY) / liHeight;

		if (Math.round(scroll_num) == scroll_num) {
			$(scroll.wrapper).find("li").removeClass("current");
			$(scroll.wrapper).find("li").eq(scroll_num+2).addClass("current");
		}
	}
		
