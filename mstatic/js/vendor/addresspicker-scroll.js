;(function($){

	$.fn.addressPicker = function(options){

		var opts = $.extend({}, options, { 
			currentAddress: ['上海市', '上海市', '宝山区']
		});

		var cur_province = opts.currentAddress[0],
			cur_city = opts.currentAddress[1],
			cur_county = opts.currentAddress[2];

		var provinceArr = JSON.parse(sessionStorage.getItem("province")),
			cityArr = JSON.parse(sessionStorage.getItem("city")),
			countyArr = JSON.parse(sessionStorage.getItem("county"));

		return this.each(function(){
			$this = $(this);

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

			cityDomStr += geneCityDomByProvince(cur_province, cur_city);

			cityDomStr += '</div></div>';

			//  县 DOM 节点

			var countyDomStr = '<div id="countyWrapper" class="address-wrapper"><div>';

			countyDomStr += geneCountyDomByCity(cur_city, cur_county);

			countyDomStr += '</div></div>';

			//  页面追加DOM结构
			domStr += provinceDomStr + cityDomStr + countyDomStr;
			$this.append(domStr);

			//  初始化 IScroll

			var provicne_scroll = new IScroll("#" + this.id + " #provinceWrapper", {
				mouseWheel: true
			});
			var city_scroll = new IScroll("#" + this.id + " #cityWrapper", {
				mouseWheel: true
			});
			var county_scroll = new IScroll("#" + this.id + " #countyWrapper", {
				mouseWheel: true
			});

			dealScroll(provicne_scroll);
			dealScroll(city_scroll);
			dealScroll(county_scroll);

		});

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

		function geneCityDomByProvince(province, curCity) {
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

		function geneCountyDomByCity(city, curCounty) {
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
		
	}

})(jQuery)