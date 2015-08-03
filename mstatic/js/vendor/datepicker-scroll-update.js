
	function DatepickerScroll(element, options) {

		this.element = $(element);

		// 默认参数
		var date = new Date();

		var defaults = {
			startYear: date.getFullYear() - 100,
			endYear: date.getFullYear(),
			defaultDate: new Date("1980-1-1")
		};

		this.opts = $.extend({}, defaults, options);

		// //  获取当前年份数字
		// function getCurrentYearNum() {
		// 	return parseInt($("#yearScroller li.current").html());
		// }

		// //  获取当前月份数字
		// function getCurrentMonthNum() {
		// 	return parseInt($("#monthScroller li.current").html());
		// }

		// //  获取当前日期数字
		// function getCurrentDayNum() {
		// 	return parseInt($("#dayScroller li.current").html());
		// }
	};

	DatepickerScroll.prototype = {

		_getCurrentYearNum: function(){
			return parseInt($(this.scroll_year.scroller).find("li.current").html());
		},

		_getCurrentMonthNum: function(){
			return parseInt($(this.scroll_month.scroller).find("li.current").html());
		},

		_getCurrentDayNum: function(){
			return parseInt($(this.scroll_day.scroller).find("li.current").html());
		},

		//  初始化滚动日历
		init: function(){
			initDateDOM(this.element, this.opts);
			var scrollArr = initDateIscroll();

			this.scroll_year = scrollArr[0];
			this.scroll_month = scrollArr[1];
			this.scroll_day = scrollArr[2];

			return this;
		},

		//  设置滚动日历时间
		setDate: function(date){
			var y = date.getFullYear(),
				m = date.getMonth()+1,
				d = date.getDate(),

				liHeight = $(this.scroll_year.scroller).find("li:eq(0)").outerHeight();

			//  年份滚动
			var num = (y < this.opts.startYear) ? 1 : y - this.opts.startYear + 1;
			this.scroll_year.scrollTo(0, -(num - 1) * liHeight);

			//  生成月份结构，scroll刷新，月份滚动
			$(this.scroll_month.scroller).html(geneMonthDOM());
    		this.scroll_month.refresh();
			this.scroll_month.scrollTo(0, -(m - 1) * liHeight);

			//  计算天数，生成日期结构，scroll 刷新，日期滚动
			var days = calDays(y, m);
			$(this.scroll_day.scroller).html(geneDayDOM(days));
    		this.scroll_day.refresh();
			this.scroll_day.scrollTo(0, -(d - 1) * liHeight);

			// 设置当前日期current样式
			setItemStyle(this.scroll_year, liHeight);
			setItemStyle(this.scroll_month, liHeight);
			setItemStyle(this.scroll_day, liHeight);
		},

		//  获取滚动日历时间
		getDate: function(){
			var date = new Date(this._getCurrentYearNum(), 
								this._getCurrentMonthNum()-1, 
								this._getCurrentDayNum());

			return date;
		}
	};

	//  生成 DOM 结构
	function initDateDOM($this, opts) {
		$this.append('<div class="selected-date-bar"></div>');   //  当前条

		//  年
		var yearDomStr = '<div id="yearWrapper" class="date-wrapper">'
							+'<div id="yearScroller">'
								+'<ul><li></li><li></li>';
		for (var i = opts.startYear; i <= opts.endYear; i++) {
			if (opts.defaultDate.getFullYear() == i) {
				yearDomStr += '<li class="current">' + i + '年</li>';
			} else {
				yearDomStr += '<li>' + i + '年</li>';
			}
			}
			yearDomStr += '<li></li><li></li></ul></div></div>';
			$this.append(yearDomStr);

		//  月
		var monthDomStr = '<div id="monthWrapper" class="date-wrapper">'
							+'<div id="monthScroller">'
								+'<ul><li></li><li></li>';
		for (var i = 1; i <= 12; i++) {
			if (opts.defaultDate.getMonth() + 1 == i) {
				monthDomStr += '<li class="current">' + i + '月</li>';
			} else {
				monthDomStr += '<li>' + i + '月</li>';
			}
			}
			monthDomStr += '<li></li><li></li></ul></div></div>';
			$this.append(monthDomStr);

			// 获取默认时间，显示天数
			var dayNum = calDays(opts.defaultDate.getFullYear(), opts.defaultDate.getMonth()+1);
		var dayDomStr = '<div id="dayWrapper" class="date-wrapper">'
							+'<div id="dayScroller">'
								+'<ul><li></li><li></li>';
		for (var i = 1; i <= dayNum; i++) {
			if (opts.defaultDate.getDate() == i) {
				dayDomStr += '<li class="current">' + i + '日</li>';
			} else {
				dayDomStr += '<li>' + i + '日</li>';
			}
			}
			dayDomStr += '<li></li><li></li></ul></div></div>';
			$this.append(dayDomStr);
	}

	//   初始化 IScroll, 绑定滚动事件
	function initDateIscroll() {

		var arr = [];

		//  初始化 IScroll
		var scroll_year = new IScroll('#yearWrapper', {
			mouseWheel: true,
			mouseWheelSpeed: 22
		});
    	var scroll_month = new IScroll('#monthWrapper', {
    		mouseWheel: true,
    		mouseWheelSpeed: 22
    	});
    	var scroll_day = new IScroll('#dayWrapper', {
    		mouseWheel: true,
    		mouseWheelSpeed: 22
    	});

    	dealScroll(scroll_year);
    	dealScroll(scroll_month);
    	dealScroll(scroll_day);

    	//  年份滚动结束，重置月份和日期并回滚至1月1日
    	scroll_year.on("scrollEnd", function(){

    		$("#monthScroller").html(geneMonthDOM());
    		scroll_month.refresh();
    		scroll_month.scrollTo(0, 0);

    		var days = calDays(getCurrentYearNum(), getCurrentMonthNum());
    		$("#dayScroller").html(geneDayDOM(days));
    		scroll_day.refresh();
    		scroll_day.scrollTo(0, 0);
    	});

    	//  月份滚动结束，重新生成日期DOM并回滚至1日
    	scroll_month.on("scrollEnd", function(){

    		var days = calDays(getCurrentYearNum(), getCurrentMonthNum());
    		$("#dayScroller").html(geneDayDOM(days));
    		scroll_day.refresh();
    		scroll_day.scrollTo(0, 0);
    	});

    	arr.push(scroll_year, scroll_month, scroll_day);
    	return arr;
	}

	function getCurrentYearNum() {
		return parseInt($("#yearScroller li.current").html());
	}

	function getCurrentMonthNum() {
		return parseInt($("#monthScroller li.current").html());
	}

	function getCurrentDayNum() {
		return parseInt($("#dayScroller li.current").html());
	}

	//  生成月份DOM
	function geneMonthDOM() {
		var monthDomStr = '<ul><li></li><li></li>';
		for (var i = 1; i <= 12; i ++) {
			if (i == 1) {
				monthDomStr += '<li class="current">' + i + '月</li>';
			} else {
				monthDomStr += '<li>' + i + '月</li>';
			}
		}
		monthDomStr += '<li></li><li></li></ul>';
		return monthDomStr;
	}		

	//  生成日期DOM
	function geneDayDOM(day) {
		var dayDomStr = '<ul><li></li><li></li>';
		for (var i = 1; i <= day; i ++) {
			if (i == 1) {
				dayDomStr += '<li class="current">' + i + '日</li>';	
			} else {
				dayDomStr += '<li>' + i + '日</li>';
			}
		}
		dayDomStr += '<li></li><li></li></ul>';
		return dayDomStr;
	}

	//  公共的滚动事件处理（滚动不是整条记录，调整偏移量）
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
    				scroll.scrollBy(0, -offset * flag, 50, IScroll.utils.ease.circular);
    			} else if (offset >= half_liHeight) {  //  滚至后一个
    				scroll.scrollBy(0, offset * flag, 50, IScroll.utils.ease.circular);
    			}
    		}
    	});
	}

	//  根据年份和月份，计算当月的天数 (month已经+1)
	function calDays(year, month) {
		if (month == 1 || month == 3 || month == 5 || month == 7 
			|| month == 8 || month == 10 || month == 12) {

			return 31;
		} else if (month == 4 || month == 6 || month == 9 || month == 11) {

			return 30;
		} else if (month == 2) {
			if((year%4 == 0 && year%100 != 0)||(year%100 == 0 && year%400 == 0)) {

				return 29;
			} else {

				return 28;
			}
		}
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
