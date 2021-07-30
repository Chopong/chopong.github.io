/* toggle to show the table of contents */

function toc_toggle(e) {
	var box = document.getElementById(e);
	box.style.display = box.style.display == 'none' ? 'block': 'none';
}


/**
 * md-toc-with-scroll-bar.js ver0.1 by chopong
 * this tool is built for md user using "data-spy='scroll'" with bootstrap v4.6
 * date: 
 * 
 * This is forked and rewrited by Chopong, the original repo info is listed below
 * md-toc.js v1.0.2
 * https://github.com/yijian166/md-toc.js
 */
chopong_Toc = function (id, options) {
	this.el = document.getElementById(id);
	if (!this.el) return;
	this.options = options || {};
	this.tocLevel = parseInt(options.level) || 0;
	this.tocClass = options['class'] || 'toc';
	this.tocTop = parseInt(options.top) || document.getElementById('intro_bac').offsetHeight;
	this.elChilds = this.el.children;
	if (!this.elChilds.length) return;
	collectTitleElements();
	createTocContent();
	showToc();
	chopong_showSubToc()
};

collectTitleElements = function () {
	this._elTitlesNames = [],
		this.elTitleElements = [];
	for (var i = 1; i < 7; i++) {
		if (this.el.getElementsByTagName('h' + i).length) {
			this._elTitlesNames.push('h' + i);
		}
	}
	this._elTitlesNames.length = this._elTitlesNames.length > this.tocLevel ? this.tocLevel : this._elTitlesNames.length;

	for (var j = 0; j < this.elChilds.length; j++) {
		this._elChildName = this.elChilds[j].tagName.toLowerCase();
		if (this._elTitlesNames.toString().match(this._elChildName)) {
			this.elTitleElements.push(this.elChilds[j]);
			//this.elChilds[j].scrollHeight()
		}
	}
};

createTocContent = function () {
	this._elTitleElementsLen = this.elTitleElements.length;
	if (!this._elTitleElementsLen) return;
	this.tocContent = '';
	this._tempLists = [];

	// 本页面的完整地址，某些情况下base标签和页面地址不一致，会造成锚点混乱
	var url = "";//location.origin + location.pathname;
	for (var i = 0; i < this._elTitleElementsLen; i++) {
		var j = i + 1;
		this._elTitleElement = this.elTitleElements[i];
		this._elTitleElementName = this._elTitleElement.tagName;
		this._elTitleElementText = this._elTitleElement.innerHTML;
		this._elTitleElementID = this._elTitleElement.id; // 原来的id
		
		this.progresBar = '<div class="progress" style="height: 5px;"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%" aria-valuemin="0" aria-valuemax="100"></div></div>';
		this._elTitleElement.setAttribute('id', 'NoCN-' + i);
		this.tocContent += '<li class="nav-item"><a class="nav-link" href="' + url + '#' + 'NoCN-' + i + '">' + this._elTitleElementText + this.progresBar + '</a>';
	
		if (j != this._elTitleElementsLen) {
			this._elNextTitleElementName = this.elTitleElements[j].tagName;
			if (this._elTitleElementName != this._elNextTitleElementName) { // 这里把 h1 和 h2 层级分开了
				var checkColse = false, y = 1;
				for (var t = this._tempLists.length - 1; t >= 0; t--) {
					if (this._tempLists[t].tagName == this._elNextTitleElementName) {
						checkColse = true;
						break;
					}
					y++;
				}

				if (checkColse) {
					this.tocContent += new Array(y + 1).join('</li></ul>');
					this._tempLists.length = this._tempLists.length - y;  //更新栈的长度。先前的不需要丢弃的内容，这里我需要

				} else {
					this._tempLists.push(this._elTitleElement);
					this.tocContent += '<ul class="nav collapse nav-pills flex-column">';
				}
			}
			else {
				this.tocContent += '</li>';
			}
		} else {
			if (this._tempLists.length) {
				this.tocContent += new Array(this._tempLists.length + 1).join('</li></ul>');
			} else {
				this.tocContent += '</li>';
			}
		}
	}
	this.tocContent = '<ul class="nav nav-pills flex-column">' + this.tocContent + '</ul>';
};

showToc = function () {

	this.toc = document.createElement('nav');
	this.toc.innerHTML = this.tocContent;
	this.toc.setAttribute('class', this.tocClass);
	this.toc.setAttribute('id', "navbar-toc")
	if (!this.options.targetId) {
		// 没有传入目标id，追加到生成目录的div内
		this.el.appendChild(this.toc);
	} else {
		//有传入目标id，直接在目标id内生成div
		document.getElementById(this.options.targetId).appendChild(this.toc);
	}

	var self = this;

	if (this.tocTop > -1) {
		window.onscroll = function () {
			var curr_view_po = self.tocTop - document.documentElement.scrollTop + 10;
			var curr_view_posi = curr_view_po > 10 ? curr_view_po : 10;
			self.toc.style['position'] = 'fixed';
			self.toc.style['left']  = '10px';
			self.toc.style['top'] = curr_view_posi +'px'; // 后面要用 style
			chopong_showSubToc();
			chopong_scrollprogress();
		}
	}

};


chopong_showSubToc = function () {
	var isShow = document.querySelector('#navbar-toc').style['display'];
	if( isShow == 'none') return;
    var all_content = document.querySelector('#navbar-toc').querySelectorAll("a.nav-link");
    if (all_content) {
      all_content_size = all_content.length;
      for (var i = 0; i < all_content_size; i++) {
        class_name = all_content[i].getAttribute('class');
        next_siblings = all_content[i].nextElementSibling;
        if (class_name.match('active')) {
          var cur_expand = i;
          if (next_siblings) { next_siblings.setAttribute('class', 'nav collapse nav-pills flex-column show'); };
        } else {
          if (next_siblings) { next_siblings.setAttribute('class', 'nav collapse nav-pills flex-column'); }
        }
      }
      return cur_expand ? all_content[cur_expand].innerHTML : "Nothing";
    }
  } // 官方提供的方法不兼容，自定义函数

  


chopong_scrollprogress = function(){
	// 页面的总搞得
	let pageHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
	// 浏览器视口高度
	let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
	// 可滚动的高度
	let scrollAvail = pageHeight - windowHeight;





	this._elTitleElementsLen = this.elTitleElements.length;
	if (!this._elTitleElementsLen) return;
	this.tocContent = '';
	this._tempLists = [];

	this._elTitleElementHeadLoca = new Array(this._elTitleElementsLen).fill(0); // 顶部距离顶部计算高度
	this._elTitleElementFootLoca = new Array(this._elTitleElementsLen).fill(0); // 脚部距离顶部计算高度
	this._elTitleElementIndex	 = []
	for(var i = 0; i<this._elTitleElementsLen;i++){
		this._elTitleElementHeadLoca[i] = this.elTitleElements[i].offsetTop;
		this._elTitleElementFootLoca[i] = this._elTitleElementHeadLoca[i];
	}

	// 本页面的完整地址，某些情况下base标签和页面地址不一致，会造成锚点混乱
	for (var i = 0; i < this._elTitleElementsLen; i++) {
		var j = i + 1;
		this._elTitleElement = this.elTitleElements[i];
		this._elTitleElementName = this._elTitleElement.tagName;
		
		if (j != this._elTitleElementsLen) {
			this._elNextTitleElementName = this.elTitleElements[j].tagName;
			if (this._elTitleElementName != this._elNextTitleElementName) { // 这里把 h1 和 h2 层级分开了
				var checkColse = false, y = 1;
				for (var t = this._tempLists.length - 1; t >= 0; t--) {
					if (this._tempLists[t].tagName == this._elNextTitleElementName) {
						checkColse = true;
						break;
					}
					y++;
				}

				if (checkColse) {
					this._elTitleElementFootLoca[i] = this._elTitleElementHeadLoca[j]; // 自己的脚
					//this._tempLists.length = this._tempLists.length - y;  //更新栈的长度。先前的不需要丢弃的内容，这里我需要
					for( k = 0; k < y ; k++){
						this._elTitleElementFath = this._tempLists.pop() // pop() 方法用于删除并返回数组的最后一个元素。
						var indexoffath = this.elTitleElements.indexOf(this._elTitleElementFath);
						this._elTitleElementFootLoca[indexoffath] = this._elTitleElementHeadLoca[j];  //前面父亲的脚
					}
				} else {
					this._tempLists.push(this._elTitleElement);
				}
			}
			else {
				this._elTitleElementFootLoca[i] = this._elTitleElementHeadLoca[j];
			}
		} else {
			this._elTitleElementFootLoca[i] = this.el.scrollTop + this.el.scrollHeight// 最后一个的脚部
			if (this._tempLists.length) {				
				for(var k = this._tempLists.length -1; k >=0 ;k--){
					var indexoffath = this.elTitleElements.indexOf(this._tempLists[k]);
					this._elTitleElementFootLoca[indexoffath] = this.el.scrollTop + this.el.scrollHeight;  //前面父亲的脚
				}
			} else {
			}
		}
	}

	var scrollbars = document.querySelectorAll('div.progress-bar');
		
		// 获取滚动条的高度
		let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

		for (var i = 0; i < this._elTitleElementsLen; i++) {
			this.elChildheight = this._elTitleElementFootLoca[i] - this._elTitleElementHeadLoca[i];
	
			if( scrollTop + windowHeight >= pageHeight ){
				scrollbars[i].style.width = "100%"
			} else {
				if(scrollTop < this._elTitleElementHeadLoca[i]){
					scrollbars[i].style.width = "0%";
				} else if(scrollTop >= this._elTitleElementFootLoca[i]){
					scrollbars[i].style.width = "100%";
				} else if(scrollTop < this._elTitleElementFootLoca[i] && scrollTop > this._elTitleElementHeadLoca[i]){
					scrollbars[i].style.width = ((scrollTop-this._elTitleElementHeadLoca[i])/this.elChildheight)*100 +'%';
				}	
				}
		}

		//return (scrollTop/scrollAvail)*100 +'%' + this.elChildheight;
		// 计算占比
	//	document.querySelector('.progress').style.height = (scrollTop/scrollAvail)*100 +'%'
};
/*
 document.body  返回文档的body元素
 document.documentElement  返回文档的根节点
 window.onscroll  浏览器窗口滚动时触发
 querySelector  获取类名为progress的元素
 element.scrollHeight  返回元素的整体高度
 element.scrollWidth  返回元素的整体宽度
 element.scrollLeft  返回元素左边缘与视图之间的距离
 element.scrollTop  返回元素上边缘与视图之间的距离

 element.offsetTop 返回元素与顶部之间的距离，
 */


 chopong_getBaiduAnalysis = function(){		
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		 // hm.src = "https://openapi.baidu.com/rest/2.0/tongji/report/getData?access_token=121.0564893b0332c417d654cc2a9d246768.Ymr19p37GZu9bB7hJv-5u5qej21odKU_tDIUGS8.mSAvQA&site_id=17009435&start_date=20200101&end_date=20210729&metrics=pv_count&method=overview%2FgetCommonTrackRpt";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
}


