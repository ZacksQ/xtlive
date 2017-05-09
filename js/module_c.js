"use strict";

/*
	module.js 模块集成
	by zq 2016.12.29
*/
// alert(typeof(easemob)); 
//控制处理模块

var handleControl = function () {
	var player = document.createElement("video");
	var playprop = {
		"width": window.innerWidth,
		"height": window.innerHeight
	};
	var showEmoji = function showEmoji() {
		$(".discuss-input-pannel").toggleClass("showemoji");
		// console.log(emoji);
	};

	var countdown = function countdown() {
		console.log("countdown");
	};

	var getRequest = function getRequest() {
		var url = location.search;
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			// var str = url.substr(1);
			var strs = url.substr(1).split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
			}
		}
		return theRequest;
	};

	var rollQT = function rollQT(){
		var qt = $(".questionnaire");
		var distance = 25;
		if(qt.scrollTop()>=qt.height()){
			qt.animate({"scrollTop":0});
		}else{
			qt.animate({"scrollTop":qt.scrollTop()+distance});
		}									
	};

	var formatSeconds = function formatSeconds(value) {
		//倒计时处理
		var countdown_timer = null;

		var countdown_timer = setInterval(function () {
			if (value == 0) {
				clearInterval(countdown_timer);
				handleControl.showPlayer();
				return false;
			}
			var second = parseInt(value),
			    minute = 0,
			    hour = 0,
			    day = 0; // 小时 
			if (second > 60) {
				minute = parseInt(second / 60);
				second = parseInt(second % 60);
				if (minute > 60) {
					hour = parseInt(minute / 60);
					minute = parseInt(minute % 60);
				}
				if(hour > 24){
					day = parseInt(hour / 24);
					hour = parseInt(hour % 24);
				}
			}
			second = "0" + second, minute = "0" + minute, hour = "0" + hour, day = "0" + day;
			second = second.substring(second.length - 2);
			// $(".countdown .num").eq(5).text(second[1]);
			// $(".countdown .num").eq(4).text(second[0]);
			if (minute > 0) {
				minute = minute.substring(minute.length - 2);
				// console.log(minute[1])
				// $(".countdown .num").eq(3).text(minute[1]);
				// $(".countdown .num").eq(2).text(minute[0]);
			}
			if (hour > 0) {
				hour = hour.substring(hour.length - 2);
				// $(".countdown .num").eq(1).text(hour[1]);
				// $(".countdown .num").eq(0).text(hour[0]);
			}
			$(".countdownv2 span").text(day + "天" +hour + ":" + minute + ":"+second);
			value--;
			// console.log("second",hour+' '+minute+''+second)
		}, 1000);
	};

	var showPlayer = function showPlayer() {
		$(".countdown-wrapper").hide();
		$("#player").css("display", "flex");

		// var objectPlayer=new aodianPlayer({
		//        container:'player',//播放器容器ID，必要参数
		//        rtmpUrl: xtAPI.liveInfo["stream"],//控制台开通的APP rtmp地址，必要参数
		//        hlsUrl: 'http://27046.hlsplay.aodianyun.com/newlive2016/'+xtAPI.liveInfo["stream"]+'.m3u8',//控制台开通的APP hls地址，必要参数
		//        /* 以下为可选参数*/
		//        width: '100%',//播放器宽度，可用数字、百分比等
		//        // height: '480',//播放器高度，可用数字、百分比等
		//        autostart: true,//是否自动播放，默认为false
		//        bufferlength: '1',//视频缓冲时间，默认为3秒。hls不支持！手机端不支持
		//        maxbufferlength: '2',//最大视频缓冲时间，默认为2秒。hls不支持！手机端不支持
		//        stretching: '3',//设置全屏模式,1代表按比例撑满至全屏,2代表铺满全屏,3代表视频原始大小,默认值为1。hls初始设置不支持，手机端不支持
		//        controlbardisplay: 'enable',//是否显示控制栏，值为：disable、enable默认为disable。
		//        adveDeAddr: xtAPI.liveInfo["coverimg"],//封面图片链接
		//        adveWidth: '100%',//封面图宽度
		//        //adveHeight: 240,//封面图高度
		//        //adveReAddr: '',//封面图点击链接
		//        //isclickplay: false,//是否单击播放，默认为false
		//        isfullscreen: true//是否双击全屏，默认为true
		//    });
		// player = document.createElement("video");
		player.setAttribute("src", xtAPI.liveInfo["data"]["liveopen"] ? 'http://27046.hlsplay.aodianyun.com/devnewlive2016/' + xtAPI.liveInfo["data"]["stream"] + '.m3u8' : xtAPI.liveInfo["data"]["m3u8"]);
		player.style.background = "url(" + xtAPI.liveInfo["data"]["bakimg"] + ") no-repeat center";
		player.style.backgroundSize = "cover";
		player.setAttribute("playsinline", true);
		player.setAttribute("controls", "controls");
		player.setAttribute("webkit-playsinline", true);
		// player.setAttribute("x5-video-player-fullscreen",false);
		player.setAttribute("x-webkit-airplay", true);
		player.setAttribute("x5-video-player-type", true);
		// player.setAttribute("width","100%");
		document.getElementById("player").appendChild(player);
		document.querySelector("#player video").setAttribute("x5-video-player-type", "h5");
		var isAndroid = /Android/i.test(navigator.userAgent);

		//安卓全屏模拟
		if (isAndroid) {
			document.querySelector("#player video").setAttribute("x5-video-player-fullscreen", true);
			window.onresize = function () {
				player.style.width = window.innerWidth + "px";
				player.style.height = window.innerHeight + "px";
				// player.style["object-position"]= "0px 0px";				
			};
			player.addEventListener("x5videoenterfullscreen", function () {
				// alert("player enterfullscreen"); 
				if(xtAPI.liveInfo["data"]["advopen"]){
					player.style["object-position"] = "0px 78px";
				}else{
					player.style["object-position"] = "0px 43px";	
				}				
				$("body").addClass("androidfull androidpo");
				player.style.background = "#000";
			});
			player.addEventListener("x5videoexitfullscreen", function () {
				// player.style.width = window.innerWidth + "px";
				// player.style.height = handleControl.playprop.width/window.innerWidth*handleControl.playprop.height + "px"; 
				$("body").removeClass("androidpo");
				player.style["object-position"] = "0px 0px";
				player.style.background = "url(" + xtAPI.liveInfo["data"]["bakimg"] + ") no-repeat center";
			});
		} else {
			document.querySelector("#player video").setAttribute("x5-video-player-fullscreen", false);
		}

		var isWeixin = /MicroMessenger/i.test(navigator.userAgent);
		if(isWeixin){
			document.querySelector("video").addEventListener("loadedmetadata",function(){
				//safari中直接执行
	         		$(".player-wrapper").css("height", "auto");
		     },false);
		}else{
			document.querySelector("video").addEventListener("play",function(){
	         		$(".player-wrapper").css("height", "auto");
		     },false);
		}

		$("#tabs-container").css("height", parseInt($(window).height()) - parseInt($(".hd").height()) - parseInt($(".player-wrapper").height()) - /*parseInt($(".adv").height())*/(xtAPI.liveInfo["data"]["advopen"]?35:0) - parseInt($(".discuss-input-pannel").height()));
		player.onplaying = function () {
			// alert("op")
			$("#tabs-container").css("height", parseInt($(window).height()) - parseInt($(".hd").height()) - parseInt($(".player-wrapper").height()) - /*parseInt($(".adv").height())*/(xtAPI.liveInfo["data"]["advopen"]?35:0) - parseInt($(".discuss-input-pannel").height()));
			applicationInit.scrollIntoView();
		};
		applicationInit.scrollIntoView();
	};

	return {
		showEmoji: showEmoji,
		getRequest: getRequest,
		formatSeconds: formatSeconds,
		showPlayer: showPlayer,
		player: player,
		playprop: playprop,
		rollQT: rollQT
	};
}();

//应用初始化模块
var applicationInit = function () {

	var _live_hd_classname = '';

	//初始化
	var init = function init() {

		// $('body').on('touchmove', function (event) {
		//     event.preventDefault();
		// });				
		// resizePlayer();
		// scrollIntoView();
		$(".discuss-input-pannel").show();
		initEmoji();
		$(".redpacked-xll-bottom").each(function () {
			$(this).attr("href", "withdraw.html?liveid=" + handleControl.getRequest()["liveid"]);
		});
		$("#gotocenter a").attr("href", "usercenter.html?liveid=" + handleControl.getRequest()["liveid"]);
		xtAPI.getWxsign();
		// xtAPI.invite();
	};

	//表情初始化
	var initEmoji = function initEmoji() {

		var facelist = $("#facelist ul");
		if (!facelist.html()) {
			var emoji = WebIM.Emoji.map;
			for (var faceitem in emoji) {
				facelist.append("<li><img data-text='" + faceitem + "' src='" + WebIM.Emoji.path + emoji[faceitem] + "'/></li>");
			}
			// }
		}
		facelist.find('li').click(function () {
			// console.log($(this).find("img").attr("data-text"));
			var _this = $(this);
			$("#msg-input").val($("#msg-input").val() + _this.find("img").attr("data-text"));
		});
	};

	var tabInit = function tabInit() {
		// alert($(".live-items .hd").children().length)
		var _live_items_classname = '';
		switch ($(".live-items .hd").children().length) {
			case 2:
				_live_items_classname = 'twoitems';
				break;
			case 3:
				_live_items_classname = 'threeitems';
				break;
			case 4:
				_live_items_classname = 'fouritems';
				break;
			default:
				_live_items_classname = '';
				break;
		}
		$(".live-items .hd").addClass(_live_items_classname);

		var tabsSwiper = new Swiper('#tabs-container', {
			speed: 500,
			noSwiping: true,
			onSlideChangeStart: function onSlideChangeStart() {
				$(".hd li.active").removeClass('active');
				$(".hd li").eq(tabsSwiper.activeIndex).addClass('active');
			}
		});

		$(".hd li").on('touchstart mousedown', function (e) {
			e.preventDefault();
			$(".hd li.active").removeClass('active');
			$(this).addClass('active');
			tabsSwiper.slideTo($(this).index());
		});

		$(".hd li").click(function (e) {
			e.preventDefault();
		});

		var rank_tabsSwiper = new Swiper('#rank-container', {
			speed: 500,
			noSwiping: true,
			onSlideChangeStart: function onSlideChangeStart() {
				$(".rank-hd li.active").removeClass('active');
				$(".rank-hd li").eq(rank_tabsSwiper.activeIndex).addClass('active');
			}
		});

		$(".rank-hd li").on('touchstart mousedown', function (e) {
			e.preventDefault();
			$(".rank-hd li.active").removeClass('active');
			$(this).addClass('active');
			rank_tabsSwiper.slideTo($(this).index());
		});

		$(".rank-hd li").click(function (e) {
			e.preventDefault();
		});
	};

	//容器尺寸控制
	var resizePlayer = function resizePlayer() {
		$(".player-wrapper").css("height", $(window).width() * 2 / 3);
		// $(".player-wrapper").css("height",$(window).width()*4/5);
		// console.log(parseInt($(window).height()) , parseInt($(".hd").height()) , parseInt($(".player-wrapper").height()) , parseInt($(".adv").height()) , parseInt($(".discuss-input-pannel").height()));
		$("#tabs-container").css("height", parseInt($(window).height()) - parseInt($(".hd").height()) - parseInt($(".player-wrapper").height()) - /*parseInt($(".adv").height())*/(xtAPI.liveInfo["data"]["advopen"]?35:0) - parseInt($(".discuss-input-pannel").height()));
	};

	var scrollIntoView = function scrollIntoView() {
		if ($(".discuss-pannel").parent().hasClass("swiper-slide-active")) {
			document.getElementById("sth").scrollIntoView();
		}
	};

	return {
		init: init,
		scrollIntoView: scrollIntoView,
		resizePlayer: resizePlayer,
		tabInit: tabInit
	};
}();

//应用初始化模块
var xtAPI = function () {

	var commonUrl = 'http://jcs.xiangtazhibo.com/';

	var appid = 'wx9e47b80badd07ab2';

	var request = handleControl.getRequest();

	var user = {}; //用户信息对象

	var loaditem = {}; //首页加载项

	var liveInfo = {}; //直播加载信息

	var share = {
		tit: "",
		des: "我正在象塔看直播",
		img: "http://" + commonUrl + "/newlive/web/images/sharelogo.png",
		link: commonUrl + "newlive/web/index.html?liveid=" + request["liveid"]
	};
	var from = 1;

	var wechatlogin = function wechatlogin() {

		Date.prototype.Format = function (fmt) {
			//日期格式化处理
			//author: meizz 
			var o = {
				"M+": this.getMonth() + 1, //月份 
				"d+": this.getDate(), //日 
				"h+": this.getHours(), //小时 
				"m+": this.getMinutes(), //分 
				"s+": this.getSeconds(), //秒 
				"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
				"S": this.getMilliseconds() //毫秒 
			};
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o) {
				if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}return fmt;
		};

		var postdata = {};
		if(request["code"]){
			postdata.code = request["code"];	
			if (request["state"] != "STATE" && request["state"] != "") {
				postdata.inviter = request["state"];
				postdata.liveid = request["liveid"];
			}
		this.from = request["from"];
		switch(this.from){
			case "singlemessage":
				this.from = 3;
			break;
			case "timeline":
				this.from = 2;
			break;
			default:
				this.from = 1;
			break;
		}

		$.ajax({
			url: commonUrl + 'newlive/tUser/wxWeblogin.do',
			type: 'post',
			dataType: 'json',
			data: postdata,
			success: function success(d) {

				if (d["success"] == true /*|| localStorage.getItem("userid") != null*/) {
					xtAPI.user = d["data"];
					// alert(d["data"]["usercode"])
					// resolve(xtAPI.user);
					Promise.all([xtAPI.liveInfo()]).then(function (result) {
						console.log("result:", result); //用户信息返回
						// var user = result[0],
						var watchtype = result[0]["auth"]["authwatch"];
						var defaultmask = 'images/authbg.png';
						
						if (watchtype == 0) {
							if(result[0]["auth"]["leaderimgOpen"] != 0){
								//欢迎页
								$(".welcome").css("backgroundImage","url("+result[0]["auth"]["leaderimg"]+")").show();
								$(".welcome").click(function(){
									$(this).fadeOut(1000);
								});
								setTimeout(function(){
									$(".welcome").fadeOut(1000);
								},3000);
							}
							initLiving();
						} else {
							if(result[0]["auth"]["leaderimgOpen"] != 0){
								$(".auth-mask").css("backgroundImage","url("+result[0]["auth"]["leaderimg"]+")");
							}
							else{
								$(".auth-mask").css("backgroundImage","url("+defaultmask+")");
							}								

							console.log('showmodel'); //授权观看
							$(".auth-model-text").text(result[0]["auth"]["authtitle"]);
							var ajaxurl = '';
							postdata = { liveid: request["liveid"] };
							var count_down, tsetcountd;

							(function () {
								$(".loading").fadeOut();
								switch (watchtype) {
									case 1:
										$(".auth-model-body").prepend('<div>' + '<input type="text" placeholder="请输入直播密码" name="password">' + '</div>');
										ajaxurl = 'newlive/tLivechannel/loadChannelByPwd.do';

										break;
									case 2:
										$(".auth-model-body").prepend('<div>' + '<input type="tel" placeholder="输入你的手机号" name="telphone">' + '</div>' + '<div>' + '<input type="text" id="code" placeholder="输入短信验证码"><button class="btn-default getcode">获取验证码</button>' + '</div>');
										count_down = 50;
										tsetcountd = null;

										// function countDownSendCode(){
										//   if(count_down>0){
										//     $(".getcode").text("重发("+count_down+"s)");
										//     count_down--;
										//   }else{
										//     clearInterval(tsetcountd);
										//     $(".getcode").text("获取验证码");
										//     $(".getcode").bind("click",sendCode);     
										//     count_down=50;   
										//   }
										// }

										var sendCode = function sendCode() {
											var phone = $("input[name=telphone]").val();
											layui.use(['layer'], function () {
												var rg = new RegExp(/^[1]+[3,4,5,7,8]+\d{9}$/);
												if (!rg.test(phone)) {
													layer.msg("请输入正确的手机号");
													return false;
												}
												$(".getcode").unbind("click");

												$.ajax({
													url: xtAPI.commonUrl + 'newlive/tLivechannel/sendCodeBeforeLoad.do',
													type: 'post',
													data: { liveid: request["liveid"], phone: phone },
													dataType: 'json',
													success: function success(d) {
														if (d["success"]) {
															layer.msg("验证码已发送");
															tsetcountd = setInterval(function () {
																if (count_down > 0) {
																	$(".getcode").text("重发(" + count_down + "s)");
																	count_down--;
																} else {
																	clearInterval(tsetcountd);
																	$(".getcode").text("获取验证码");
																	$(".getcode").bind("click", sendCode);
																	count_down = 50;
																}
															}, 1000);
														} else {
															layer.msg("验证码发送失败，请稍后再试");
															$(".getcode").bind("click", sendCode);
														}
													}
												});
											});
										};

										$(".getcode").bind("click", sendCode);
										ajaxurl = 'newlive/tLivechannel/loadChannelByPhone.do';

										break;
									case 3:
										$(".auth-model-body").prepend('<div class="redtip">' + '本次直播需支付' + (result[0]["auth"]["paymoneyint"] / 100).toFixed(2) + '元' + '</div>');
										$(".watchlive").text("付费观看");
										break;
								}
							})();

							$(".auth-model-tit").text(result[0]["auth"]["authtitle"]);
							$("#auth-wrapper").show();

							$(".watchlive").click(function () {
								if (watchtype == 3) {
									//付费观看预支付
									$.ajax({
										url: xtAPI.commonUrl + 'newlive/tLivechannel/buyChannelBefore.do',
										dataType: 'json',
										type: 'post',
										data: { liveId: request["liveid"] },
										success: function success(d) {
											var jsondata = d["data"];
											wxPay.brandwcpayrequest["package"] = jsondata["package"];
											wxPay.brandwcpayrequest["paySign"] = jsondata["paySign"];
											wxPay.brandwcpayrequest["timeStamp"] = jsondata["timeStamp"];
											wxPay.brandwcpayrequest["nonceStr"] = jsondata["nonceStr"];
											WeixinJSBridge.invoke('getBrandWCPayRequest', wxPay.brandwcpayrequest, function (res) {
												// alert(res.err_msg)
												// if (res.errMsg == "getBrandWCPayRequest:fail,没有此SDK或暂不支持此SDK模拟") {
												if (res.err_msg == "get_brand_wcpay_request:ok") {
													$.ajax({
														url: xtAPI.commonUrl + 'newlive/tLivechannel/loadChannelByFee.do',
														dataType: 'json',
														type: 'post',
														data: postdata,
														success: function success(d) {
															if (d["success"]) {
																$("#auth-wrapper").hide();
																xtAPI.liveInfo = d;
																initLiving();
															} else {
																layui.use(['layer'], function () {
																	layer.msg("验证失败");
																});
															}
														}
													});
												} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
											});
										}
									});
								} else {
									postdata.code = $("#code").val();
									postdata.watchpwd = $("input[name=password]").val();
									$.ajax({
										url: xtAPI.commonUrl + ajaxurl,
										dataType: 'json',
										type: 'post',
										data: postdata,
										success: function success(d) {
											if (d["success"]) {
												$("#auth-wrapper").hide();
												xtAPI.liveInfo = d;
												initLiving();
											} else {
												layui.use(['layer'], function () {
													layer.msg("验证失败");
												});
											}
										}
									});
								}
							});
						}

						function initLiving() {
							Promise.all([xtAPI.loadindexitem(), xtAPI.giftlist(), easemob]).then(function (result) {
								var liveinfo = xtAPI.liveInfo["data"],
								    indexitem = result[0],
								    giftlist = result[1],
								    easemob = result[2];
								// loadhistorymsg = result[4];
								$(".loading").fadeOut();
								$("body").addClass(liveinfo["skinid"]);

								var _request = xtAPI.request;

								share.tit = liveinfo["sharetitle"]?liveinfo["sharetitle"]:liveinfo["channelname"];
								document.title = liveinfo["channelname"];
								var $body = $('body');
								var $iframe = $('<iframe src="images/sharelogo.png"></iframe>');
								$iframe.on('load',function() {
								  setTimeout(function() {
								      $iframe.off('load').remove();
								  }, 0);
								}).appendTo($body);
								share.des = liveinfo["sharecontent"]?liveinfo["sharecontent"]:share.des;
								// share.img = liveinfo["shareimg"];
								applicationInit.init();
								handleControl.playprop.width = liveinfo["width"];
								handleControl.playprop.height = liveinfo["height"];
								// alert("user",user)
								if (xtAPI.user) {
									localStorage.setItem("nickname", xtAPI.user["nickname"]);
									localStorage.setItem("headimg", xtAPI.user["headimg"]);
									localStorage.setItem("usercode", xtAPI.user["usercode"]);
									localStorage.setItem("password", xtAPI.user["password"]);
									localStorage.setItem("userid",xtAPI.user["userid"]);
								}

								for (var i = 0, menu_length = indexitem["menu"].length; i < menu_length; i++) {
									var menutype = indexitem["menu"][i]["menutype"];
									$(".live-items .hd").append("<li>" + indexitem["menu"][i]["menuname"] + "</li>");

									var swcontent = '<div class="swiper-slide swiper-no-swiping">';
									switch (menutype) {
										case 6:
											swcontent += '<div class="content-slide followus" ><img src="' + indexitem["menu"][i]["menucontent"] + '"/></div>';
										break;
										case 4:
											swcontent += '<div class="content-slide discuss-pannel">' + '<ul class="message-list">' + '<li>' +
											// '<img src="http://wx.qlogo.cn/mmopen/dH8QVxmk2IXOezlo6KALUQqHlicM2xJoczZrLxib1fzGUN42e5FEibeKNeiccmRrs3ibM1xsszibPKSgiaruXibODZWpow/0" alt="" class="headimg fl">'+
											// 						'<div class="message fl robredpacket">'+
											// 							'<div class="rptxt"><p>恭喜发财.大吉大利</p><p>领取红包</p></div>'+
											// 					'<img src="images/redpacket-xl.png" class="response" />'+
											// 				'</div>'+
											'</li>' + '</ul>' + '<div id="sth"></div>' + '</div>';
											break;
										case 5:
											swcontent += '<div class="content-slide rank-wrapper">';
											if (indexitem["menu"][i]["menucontent"] == "3") {
												swcontent += '<ul class="rank-hd"><li class="active">打赏榜</li><li>邀请榜</li></ul>';
											}

											swcontent += '<div id="rank-container" class="swiper-container"><div class="swiper-wrapper">';
											if (indexitem["menu"][i]["menucontent"] == "3" || indexitem["menu"][i]["menucontent"] == "2") {
												swcontent += '<div class="swiper-slide swiper-no-swiping"><ul class="ranklist" id="payrank"></ul></div>';
											}
											if (indexitem["menu"][i]["menucontent"] == "3" || indexitem["menu"][i]["menucontent"] == "1") {
												swcontent += '<div class="swiper-slide swiper-no-swiping">';
												if (liveinfo["inviteopen"] == 1) swcontent += '<a href="invite.html?liveid=' + _request["liveid"] + '&nickname='+localStorage.getItem("nickname")+'&headImg='+localStorage.getItem("headimg")+'&userId='+localStorage.getItem("userid")+'" class="generate-card">点击生成我的邀请卡</a>';
												swcontent += '<ul class="ranklist" id="inviterank"></ul></div>';
											}
											swcontent += '</div></div></div>';
											break;
										default:
											swcontent += '<div class="content-slide contmenu">' + indexitem["menu"][i]["menucontent"] + '</div>';
										break;
									}
									swcontent += '</div>';
									$(".swiper-wrapper.menutab").append(swcontent);
								}
								if(liveinfo["questopen"]){
									// $("#tabs-container").prepend("<div class='questionnaire'> <p><img src='images/questionnarieicon.png' />问卷调查："+liveinfo["questtitle"]+"</p><a href='"+liveinfo["questUrl"]+"' class='fr'>点击进入</a></div>");

									$(".questionnaire").show().append("<div class='qtitems'> <p><img src='images/questionnarieicon.png' />"+liveinfo["questtitle"]+"</p><a href='"+liveinfo["questUrl"]+"' class='fr'>点击进入</a></div>")
								}
								if(liveinfo["voteopen"]){
									// $("#tabs-container").prepend("<div class='questionnaire'> <p><img src='images/questionnarieicon.png' />互动投票："+liveinfo["votename"]+"</p><a href='vote.html?voteid="+liveinfo["voteId"]+"' class='fr'>点击进入</a></div>");
									$(".questionnaire").show().append("<div class='qtitems'> <p><img src='images/questionnarieicon.png' />"+liveinfo["votename"]+"</p><a href='vote.html?voteid="+liveinfo["voteId"]+"' class='fr'>点击进入</a></div>");
								}

								setInterval(handleControl.rollQT,5000);

								// if(liveinfo["logoopen"]){
								if (indexitem["logo"]["logoimg"]) {
									$(".anchorheadimg").html('<img src="' + indexitem["logo"]["logoimg"] + '" alt="" class="response">');
									share.img = indexitem["logo"]["logoimg"];
									// $(".anchorheadimg").html(`<img src="${indexitem["logo"]["logoimg"]}" alt="" class="response">`);
								}
								// }


								if (liveinfo["advopen"]&&indexitem["adv"].length!=0) {
									$(".adv").html('<a href="' + indexitem["adv"][0]["advurl"] + '"><img src="' + indexitem["adv"][0]["advtitle"] + '" class="response" alt=""></a>');
								} else {
									$(".adv").remove();
								}
								if (liveinfo["chatcheck"] == 1) {
									chatCheck=true
									$(".discuss-input #msg-input").attr({ "readonly": false, "placeholder": '弹幕审核已开启' });
								}
								if (liveinfo["chatopen"] == 0) {
									chatOpen=false;
									$(".discuss-input #msg-input").attr({ "readonly": true, "placeholder": '全员禁言中' });
								}
								$(".live-items .hd li:first").addClass("active");

								applicationInit.tabInit();
								applicationInit.resizePlayer();
								$(".player-wrapper").css("backgroundImage", "url(" + liveinfo["bakimg"] + ")");
								var timecountend = indexitem["timer"]["timecountend"];
								if (liveinfo["liveopen"] == 0 && liveinfo["videoopen"] == 0) {
									$(".countdown-label").hide();
									$(".countdown-label").text("直播已结束");
									if (liveinfo["timecountopen"] != 1 ){
										$(".countdown-wrapper").hide();
									}else{
										if(timecountend > 0)
											handleControl.formatSeconds(timecountend);
									}
									
								} else {
									if (liveinfo["timecountopen"] != 1 || timecountend < 0) {
										handleControl.showPlayer();
										// $(".countdown").hide();
									} else {
										// console.log("调用倒计时");									
										handleControl.formatSeconds(timecountend);
										// setInterval(function(){										
										// },1000);
									}
								}

								for (var i = 0, giftlist_length = giftlist.length; i < giftlist_length; i++) {
									$(".money-choose").append("<li data-gift-id=" + giftlist[i]["id"] + ">" + giftlist[i]["giftname"] + "</li>");
								}

								$(".money-choose li:first").addClass("money-selected");

								$(".money-choose li").click(function () {
									var _this = $(this);
									$(".money-choose li[class=money-selected]").removeClass("money-selected");
									_this.addClass("money-selected");
									if (_this.attr("data-gift-id") == 6) {
										$(".redpacked-xll-body").addClass("showcustom");
									}
								});

								$(".sendbtn").click(function () {
									easemob.sendToAPI($("#msg-input").val(), 1);
									// easemob.sendMsg($("#msg-input").val());
								});

								// $(".generate-card").attr("href", "invite.html?liveid=" + _request["liveid"]);

								var rewardlist = indexitem["rewardlist"],
								    invitelist = indexitem["invitelist"],
								    rewardlistlength = rewardlist.length,
								    invitelistlength = invitelist.length;

								for (var i = 0; i < rewardlistlength; i++) {
									var uname = rewardlist[i]["sendername"];
									$("#payrank").append('<li>' + '<img src="' + rewardlist[i]["headimg"] + '" alt="" class="headimg fl">' + 'No.' + (i+1) + ' ' + (uname.length>6?(uname.substring(0,6)+'...'):uname) + '<span class="fr">打赏'+rewardlist[i]["total"]+'元</span></li>');
								}

								for (var i = 0; i < invitelistlength; i++) {
									var uname = invitelist[i]["username"];
									$("#inviterank").append('<li>' + '<img src="' + invitelist[i]["headimg"] + '" alt="" class="headimg fl">' + 'No.' + (i+1) + ' ' + (uname.length>6?(uname.substring(0,6)+'...'):uname) + '<span class="fr">邀请'+invitelist[i]["total"]+'人</span></li>');
								}

								// $(".numcount").text('1154人');
								$(".numcount").text(liveinfo["uv"] + '人');
								$(".anchorheadimg img").attr("src", indexitem["logo"]["logoimg"]);
								// $(".adv img").attr("src",indexitem["adv"][0]["advurl"]);
								// try{
								easemob.roomId = liveinfo["chatroomid"];
								easemob.options.user = localStorage.getItem("usercode");
								easemob.options.pwd = localStorage.getItem("password");

								$.post(commonUrl + "newlive/im/getoldMsg.do", { "chatroomid": easemob.roomId, "perNumber": 10, "createtime": new Date().Format("yyyy-MM-dd hh:mm:ss") }, function (d) {
									// console.log(d)
									if (d["success"] == true) {
										for (var _i = d["data"]["historylist"].length - 1; _i >= 0; _i--) {
											easemob.appendMsg(d["data"]["historylist"][_i], 'txt');
										}
									}
									easemob.initWEBIM();
								});

								var functions = indexitem["function"];
								for (var i = 0; i < functions.length; i++) {
									switch (functions[i]["functiontype"]) {
										case 1:
											$(".tocustomer").show();
											break;
										case 3:
											$(".redpacket-l").show();
											break;
									}
								}
								// }
								// catch(e){
								// alert(e)
								// }

								//检查上传的照片格式是否正确
function checkFileType(dom) {
	var rt = false;
	layui.use(['layer'], function () {
		var layer = layui.layer;
		var filePath = dom.value;
		if (filePath) {
			var extname = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length).toLowerCase();
			if (extname != "bmp" && extname != "jpg" && extname != "gif" && extname != "png" && extname != "jpeg") {
				layer.msg("只能上传照片");
				rt = false;
			} else {
				if (dom.files[0].size / 1024 > 15000) {
					layer.msg("图片不能大于15M");
					rt = false;
				}
				rt = true;
			}
		} else {
			//     //layer.msg("请上传照片");
			rt = false;
		}
	});
	return rt;
}

$("input[name='sendpic']").change(function () {
	var pic = $("input[name='sendpic']");
	if (checkFileType(pic[0])) {
		layui.use(['layer'], function () {
			layer.open({
				title: '发送图片',
				area: ['80%', '80%'],
				content: '<div style="justify-content: center;display: flex;align-items: center;height: 100%; margin-bottom:0"><img src="" id="previewsend" /></div>'
				// ,content: `<div style="justify-content: center;display: flex;align-items: center;height: 100%; margin-bottom:0"><img src="" id="previewsend" /></div>`
				, closeBtn: 0,
				btn: ['发送', '取消'],
				yes: function yes(index, layero) {
					layer.close(index);
				}
			});
		});
		var oFile = pic[0].files[0];
		var oReader = new FileReader();
		oReader.onload = function (e) {
			$("#previewsend").attr("src", e.target.result);
		};
		oReader.readAsDataURL(oFile);
	}
});
var getoken = new Promise(function (resolve) {
	$.post(xtAPI.commonUrl + "newlive/mImhistory/getImgUptoken.do", function (d) {
		qiniu_token = d["data"]["uptoken"];
		var uploader = Qiniu.uploader({
			runtimes: 'html5,flash,html4', // 上传模式,依次退化
			browse_button: 'pickfiles', // 上传选择的点选按钮，**必需**
			// 在初始化时，uptoken, uptoken_url, uptoken_func 三个参数中必须有一个被设置
			// 切如果提供了多个，其优先级为 uptoken > uptoken_url > uptoken_func
			// 其中 uptoken 是直接提供上传凭证，uptoken_url 是提供了获取上传凭证的地址，如果需要定制获取 uptoken 的过程则可以设置 uptoken_func
			uptoken: qiniu_token, // uptoken 是上传凭证，由其他程序生成
			// uptoken_url: '/uptoken',         // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
			// uptoken_func: function(file){    // 在需要获取 uptoken 时，该方法会被调用
			//    // do something
			//    return uptoken;
			// },
			get_new_uptoken: false, // 设置上传文件的时候是否每次都重新获取新的 uptoken
			// downtoken_url: '/downtoken',
			// Ajax请求downToken的Url，私有空间时使用,JS-SDK 将向该地址POST文件的key和domain,服务端返回的JSON必须包含`url`字段，`url`值为该文件的下载地址
			unique_names: true,              // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
			// save_key: true,                  // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
			domain: 'http://img.xiangtazhibo.com/', // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
			// container: 'container',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
			max_file_size: '100mb', // 最大文件体积限制
			flash_swf_url: 'path/of/plupload/Moxie.swf', //引入 flash,相对路径
			max_retries: 3, // 上传失败最大重试次数
			dragdrop: false, // 开启可拖曳上传
			drop_element: 'container', // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
			chunk_size: '4mb', // 分块上传时，每块的体积
			auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
			multi_selection: false,
			//x_vars : {
			//    自定义变量，参考http://developer.qiniu.com/docs/v6/api/overview/up/response/vars.html
			//    'time' : function(up,file) {
			//        var time = (new Date()).getTime();
			// do something with 'time'
			//        return time;
			//    },
			//    'size' : function(up,file) {
			//        var size = file.size;
			// do something with 'size'
			//        return size;
			//    }
			//},
			init: {
				'FilesAdded': function FilesAdded(up, files) {
					plupload.each(files, function (file) {
						// 文件添加进队列后,处理相关的事情
					});
				},
				'BeforeUpload': function BeforeUpload(up, file) {
					// 每个文件上传前,处理相关的事情
				},
				'UploadProgress': function UploadProgress(up, file) {
					// 每个文件上传时,处理相关的事情
				},
				'FileUploaded': function FileUploaded(up, file, info) {
					// 每个文件上传成功后,处理相关的事情
					// 其中 info 是文件上传成功后，服务端返回的json，形式如
					// {
					//    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
					//    "key": "gogopher.jpg"
					//  }
					// 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

					var domain = up.getOption('domain');
					var res = $.parseJSON(info);
					var sourceLink = domain + res.key; //获取上传成功后的文件的Url
					easemob.sendToAPI(sourceLink, 7);
					$(".function-menu").removeClass("showfuntion");
				},
				'Error': function Error(up, err, errTip) {
					//上传出错时,处理相关的事情
				},
				'UploadComplete': function UploadComplete() {
					//队列文件处理完毕后,处理相关的事情
				}
			}
		});
	});
});

							});
						}
						//promise end
					});
				} else {
					// resolve(false);
					window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + xtAPI.appid + "&redirect_uri=" + xtAPI.commonUrl + "newlive/web/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state="+from+"#wechat_redirect";
				}		
			}
			});
		}else{
			$(".callfunctionbtn").hide();
			$.ajax({
				url: commonUrl + 'newlive/stemp/getChannelAuth.do',
				type: 'post',
				dataType: "json",
				data: {liveId: request["liveid"]},
				success: function(d){
					if(d["data"]["authwatch"]!=0){
						window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + xtAPI.appid + "&redirect_uri=" + xtAPI.commonUrl + "newlive/web/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state="+from+"#wechat_redirect";
					}else{
						
						Promise.all([xtAPI.getChannelInfo(),xtAPI.loadindexitem()]).then(function (result) {
								var liveinfo = xtAPI.liveInfo["data"] = result[0],
									indexitem = result[1];
									$(".loading").fadeOut();
$("body").addClass(liveinfo["skinid"]);
								var _request = xtAPI.request;

								share.tit = liveinfo["sharetitle"]?liveinfo["sharetitle"]:liveinfo["channelname"];
								document.title = liveinfo["channelname"];
share.des = liveinfo["sharecontent"]?liveinfo["sharecontent"]:share.des;
handleControl.playprop.width = liveinfo["width"];
								handleControl.playprop.height = liveinfo["height"];
if (liveinfo["advopen"]&&indexitem["adv"].length!=0) {
									$(".adv").html('<a href="' + indexitem["adv"][0]["advurl"] + '"><img src="' + indexitem["adv"][0]["advtitle"] + '" class="response" alt=""></a>');
								} else {
									$(".adv").remove();
								}
								if (liveinfo["chatcheck"] == 1) {
									chatCheck=true
									$(".discuss-input #msg-input").attr({ "readonly": false, "placeholder": '弹幕审核已开启' });
								}
								if (liveinfo["chatopen"] == 0) {
									chatOpen=false;
									$(".discuss-input #msg-input").attr({ "readonly": true, "placeholder": '全员禁言中' });
								}						
								applicationInit.init();

								for (var i = 0, menu_length = indexitem["menu"].length; i < menu_length; i++) {
									var menutype = indexitem["menu"][i]["menutype"];
									$(".live-items .hd").append("<li>" + indexitem["menu"][i]["menuname"] + "</li>");

									var swcontent = '<div class="swiper-slide swiper-no-swiping">';
									switch (menutype) {
										case 6:
											swcontent += '<div class="content-slide followus" ><img src="' + indexitem["menu"][i]["menucontent"] + '"/></div>';
										break;
										case 4:
											swcontent += '<div class="content-slide discuss-pannel">' + '<ul class="message-list">' + '<li>' +
											// '<img src="http://wx.qlogo.cn/mmopen/dH8QVxmk2IXOezlo6KALUQqHlicM2xJoczZrLxib1fzGUN42e5FEibeKNeiccmRrs3ibM1xsszibPKSgiaruXibODZWpow/0" alt="" class="headimg fl">'+
											// 						'<div class="message fl robredpacket">'+
											// 							'<div class="rptxt"><p>恭喜发财.大吉大利</p><p>领取红包</p></div>'+
											// 					'<img src="images/redpacket-xl.png" class="response" />'+
											// 				'</div>'+
											'</li>' + '</ul>' + '<div id="sth"></div>' + '</div>';
											break;
										case 5:
											swcontent += '<div class="content-slide rank-wrapper">';
											if (indexitem["menu"][i]["menucontent"] == "3") {
												swcontent += '<ul class="rank-hd"><li class="active">打赏榜</li><li>邀请榜</li></ul>';
											}

											swcontent += '<div id="rank-container" class="swiper-container"><div class="swiper-wrapper">';
											if (indexitem["menu"][i]["menucontent"] == "3" || indexitem["menu"][i]["menucontent"] == "2") {
												swcontent += '<div class="swiper-slide swiper-no-swiping"><ul class="ranklist" id="payrank"></ul></div>';
											}
											if (indexitem["menu"][i]["menucontent"] == "3" || indexitem["menu"][i]["menucontent"] == "1") {
												swcontent += '<div class="swiper-slide swiper-no-swiping">';
												if (liveinfo["inviteopen"] == 1) swcontent += '<a href="javascript:;" class="generate-card">点击生成我的邀请卡</a>';
												swcontent += '<ul class="ranklist" id="inviterank"></ul></div>';
											}
											swcontent += '</div></div></div>';
											break;
										default:
											swcontent += '<div class="content-slide contmenu">' + indexitem["menu"][i]["menucontent"] + '</div>';
										break;
									}
									swcontent += '</div>';
									$(".swiper-wrapper.menutab").append(swcontent);
								}
								$(".live-items .hd li:first").addClass("active");
if (indexitem["logo"]["logoimg"]) {
									$(".anchorheadimg").html('<img src="' + indexitem["logo"]["logoimg"] + '" alt="" class="response">');
									share.img = indexitem["logo"]["logoimg"];
									// $(".anchorheadimg").html(`<img src="${indexitem["logo"]["logoimg"]}" alt="" class="response">`);
								}
if (liveinfo["advopen"]&&indexitem["adv"].length!=0) {
									$(".adv").html('<a href="' + indexitem["adv"][0]["advurl"] + '"><img src="' + indexitem["adv"][0]["advtitle"] + '" class="response" alt=""></a>');
								} else {
									$(".adv").remove();
								}
var timecountend = indexitem["timer"]["timecountend"];
if (liveinfo["liveopen"] == 0 && liveinfo["videoopen"] == 0) {
									$(".countdown-label").hide();
									$(".countdown-label").text("直播已结束");
									if (liveinfo["timecountopen"] != 1 ){
										$(".countdown-wrapper").hide();
									}else{
										if(timecountend > 0)
											handleControl.formatSeconds(timecountend);
									}
									
								} else {
									if (liveinfo["timecountopen"] != 1 || timecountend < 0) {
										handleControl.showPlayer();
										// $(".countdown").hide();
									} else {
										// console.log("调用倒计时");									
										handleControl.formatSeconds(timecountend);
										// setInterval(function(){										
										// },1000);
									}
								}
var rewardlist = indexitem["rewardlist"],
								    invitelist = indexitem["invitelist"],
								    rewardlistlength = rewardlist.length,
								    invitelistlength = invitelist.length;

								for (var i = 0; i < rewardlistlength; i++) {
									var uname = rewardlist[i]["sendername"];
									$("#payrank").append('<li>' + '<img src="' + rewardlist[i]["headimg"] + '" alt="" class="headimg fl">' + 'No.' + (i+1) + ' ' + (uname.length>6?(uname.substring(0,6)+'...'):uname) + '<span class="fr">打赏'+rewardlist[i]["total"]+'元</span></li>');
								}

								for (var i = 0; i < invitelistlength; i++) {
									var uname = invitelist[i]["username"];
									$("#inviterank").append('<li>' + '<img src="' + invitelist[i]["headimg"] + '" alt="" class="headimg fl">' + 'No.' + (i+1) + ' ' + (uname.length>6?(uname.substring(0,6)+'...'):uname) + '<span class="fr">邀请'+invitelist[i]["total"]+'人</span></li>');
								}

								// $(".numcount").text('1154人');
								$(".numcount").text(liveinfo["uv"] + '人');
								$(".anchorheadimg img").attr("src", indexitem["logo"]["logoimg"]);

applicationInit.tabInit();
								applicationInit.resizePlayer();
								$(".player-wrapper").css("backgroundImage", "url(" + liveinfo["bakimg"] + ")");
$(".numcount").text(liveinfo["uv"] + '人');

easemob.roomId = liveinfo["chatroomid"];
								easemob.options.user = '5337c9f4aac94047b63a4935902ae767';
								easemob.options.pwd = '5337c9f4aac94047b63a4935902ae767';

								$.post(commonUrl + "newlive/im/getoldMsg.do", { "chatroomid": easemob.roomId, "perNumber": 10, "createtime": new Date().Format("yyyy-MM-dd hh:mm:ss") }, function (d) {
									// console.log(d)
									if (d["success"] == true) {
										for (var _i = d["data"]["historylist"].length - 1; _i >= 0; _i--) {
											easemob.appendMsg(d["data"]["historylist"][_i], 'txt');
										}
									}
									easemob.initWEBIM();

									$(".sendbtn,.generate-card").click(function () {
										$("#iosDialog1").fadeIn(200);
									});
									$(".weui-dialog__btn_default").click(function () {
										$("#iosDialog1").fadeOut(200);
									});
									$(".weui-dialog__btn_primary").click(function(){
										window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + xtAPI.appid + "&redirect_uri=" + xtAPI.commonUrl + "newlive/web/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
									});
								});

						})
						
					}
				}
			});
		}
		
			// }
		// });
	};

	var liveInfo = function liveInfo() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newlive/tLivechannel/loadChannel.do',
				type: 'post',
				dataType: 'json',
				data: { "liveid": request["liveid"],"userOrigin": xtAPI.from },
				success: function success(d) {
					// checkSession(d["code"]);
					if (d["code"] == 1013) {
						window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + xtAPI.appid + "&redirect_uri=" + xtAPI.commonUrl + "newlive/web/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
					} else {
						xtAPI.liveInfo = d["data"];
						resolve(xtAPI.liveInfo);
					}
				}
				// ,error:function(){
				// 	window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa5af90cb393880b6&redirect_uri=http://www.xiangtazhibo.com/newlive/web/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
				// }
			});
		});
	};

	var getChannelInfo = function getChannelInfo() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newlive/stemp/getChannelInfo.do',
				type: 'post',
				dataType: 'json',
				data: { "liveId": request["liveid"],"userOrigin": xtAPI.from },
				success: function success(d) {
					// checkSession(d["code"]);
					if (d["code"] == 1013) {
						window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + xtAPI.appid + "&redirect_uri=" + xtAPI.commonUrl + "newlive/web/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
					} else {
						xtAPI.liveInfo = d["data"];
						resolve(xtAPI.liveInfo);
					}
				}
				// ,error:function(){
				// 	window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa5af90cb393880b6&redirect_uri=http://www.xiangtazhibo.com/newlive/web/index.html?liveid=" + request["liveid"] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
				// }
			});
		});
	};

	var giftlist = function giftlist() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newlive/tGift/getGifts.do',
				type: 'post',
				dataType: 'json',
				data: { "type": 2 },
				success: function success(d) {
					resolve(d["data"]);
				}
			});
		});
	};

	var loadindexitem = function loadindexitem() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newlive/tLivechannel/getLoaditems.do',
				type: 'post',
				dataType: 'json',
				data: { "liveid": request["liveid"], types: "1,2,3,4,5,6,7" },
				success: function success(d) {
					if (d["success"] == true) {
						resolve(d["data"]);
					}
				}
			});
		});
	};

	var loadhistorymsg = function loadhistorymsg() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newlive/im/getHistoryMsg.do',
				type: 'post',
				dataType: 'json',
				data: { "groupid": easemob.roomId, "startnum": 0, "pernum": 10 },
				success: function success(d) {
					if (d["success"] == true) {
						resolve(d["data"]);
					}
				}
			});
		});
	};

	var getredpacket = function getredpacket(rpid) {
		$("#getredpacket .desc").html('');
		$.ajax({
			url: commonUrl + 'newlive/tHongbao/grapHongbao.do',
			type: 'post',
			dataType: 'json',
			data: { 'liveid': request["liveid"], 'hongbaoid': rpid },
			success: function success(d) {
				if(d["success"]){					
					var getmoney = parseInt(d["data"]["getMoney"]);
					if (getmoney > 0) {
						$("#getredpacket .desc").html("<p>恭喜您获得" + (getmoney/100).toFixed(2) + "元红包</p><p>红包直接发送到您的账户中，请注意查收</p>");
					} else {
						$("#getredpacket .desc").html("<p>红包已经被抢光了</p><p></p>");
					}
					$("#getredpacket").addClass("show");
				}else{
						$("#getredpacket .desc").html("<p>"+d.msg+"</p><p></p>");
						$("#getredpacket").addClass("show");	
					}					
				}
				
		
		});
	};

	var accountmoney = function accountmoney() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newlive/tAccount/getAccountMoney.do',
				type: 'post',
				dataType: 'json',
				success: function success(d) {
					if (d["code"] == 1013) {
						resolve(false);
					} else {
						resolve(d["data"]);
					}
				}
			});
		});
	};

	var getPhoneUserAccount = function getPhoneUserAccount() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newlive/tUser/getPhoneUserAccount.do',
				type: 'post',
				dataType: 'json',
				success: function success(d) {
					if (d["code"] == 1013) {
						resolve(false);
					} else {
						resolve(d["data"]);
					}
				}
			});
		});
	};

	var withdraw = function withdraw() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newlive/tAccount/getDrawedRecords.do',
				type: 'post',
				dataType: 'json',
				success: function success(d) {
					resolve(d["data"]);
				}
			});
		});
	};

	var getAccountRecord = function getAccountRecord() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newlive/tAccountrecord/getAccountRecord.do',
				type: 'post',
				data: { userType: 2, type: 2 },
				dataType: 'json',
				success: function success(d) {
					resolve(d["data"]);
				}
			});
		});
	};

	var webGetChannels = function webGetChannels() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newlive/tLivechannel/webGetChannels.do',
				type: 'post',
				dataType: 'json',
				data: { liveid: request["liveid"] },
				success: function success(d) {
					if (d["code"] == 1013) {
						resolve(false);
					} else {
						resolve(d["data"]);
					}
				}
			});
		});
	};

	var webGetCases = function webGetCases() {
		return new Promise(function (resolve) {
			$.ajax({
				url: commonUrl + 'newlive/tLivechannel/getRecommendLiveChannels.do',
				type: 'post',
				dataType: 'json',
				data: { liveid: request["liveid"] },
				success: function success(d) {
					if (d["code"] == 1013) {
						resolve(false);
					} else {
						resolve(d["data"]);
					}
				}
			});
		});
	};

	var applicationmoney = function applicationmoney() {
		$.ajax({
			url: commonUrl + 'newlive/tAccount/drawMoney.do',
			data: { "money": Number($("#withdrawmoney").val()).toFixed(2) }, //Number后NaN判断下呢？！
			dataType: 'json',
			type: 'post',
			success: function success(d) {
				// if(d["code"]==1901){}
				// console.log(accountmoney)
				var withdrawpic = '';
				switch (d["code"]) {
					case 1901:
						withdrawpic = 'images/accountsuccess.png';
						break;
					case 1507:
						withdrawpic = 'images/nomoney.png';
						break;
					default:
						withdrawpic = 'images/withdrawerror.png';
						break;
				}
				$(".redpacket-wrapper img").attr("src", withdrawpic);
				// $(".account").text(accountmoney["[[PromiseValue]]"]);
				// Promise.all([accountmoney]).then(function(result){
				// 	$(".account").text(result[0]);
				// });

				$.ajax({
					url: commonUrl + 'newlive/tAccount/getAccountMoney.do',
					type: 'post',
					dataType: 'json',
					success: function success(d) {
						$(".account").text(d["data"]["money"]);
					}
				});

				$(".returnmessgae").text(d["msg"]);
				$("#withdrawmoney").val('');
				$("#redpacket-dialog").addClass("show");
			}
		});
	};

	var anchor_applicationmoney = function anchor_applicationmoney() {
		$.ajax({
			url: commonUrl + 'newlive/tAccount/drawMoneyPhoneUser.do',
			data: { "money": Number($("#withdrawmoney").val()).toFixed(2) }, //Number后NaN判断下呢？！ 我就不判断~
			dataType: 'json',
			type: 'post',
			success: function success(d) {
				// if(d["code"]==1901){}
				// console.log(accountmoney)
				var withdrawpic = '';
				switch (d["code"]) {
					case 1901:
						withdrawpic = 'images/accountsuccess.png';
						break;
					case 1507:
						withdrawpic = 'images/nomoney.png';
						break;
					default:
						withdrawpic = 'images/withdrawerror.png';
						break;
				}
				$(".redpacket-wrapper img").attr("src", withdrawpic);

				$.ajax({
					url: commonUrl + 'newlive/tUser/getPhoneUserAccount.do',
					type: 'post',
					dataType: 'json',
					success: function success(d) {
						$(".account").text(d["data"]["money"]);
					}
				});

				$(".returnmessgae").text(d["msg"]);
				$("#withdrawmoney").val('');
				$("#redpacket-dialog").addClass("show");
			}
		});
	};

	var getWxsign = function getWxsign() {
		$.ajax({
			url: commonUrl + "newlive/wechat/getWxSign.do",
			type: "post",
			dataType: "json",
			data: {
				url: window.location.href
			},
			success: function success(data) {
				// alert(data["data"]["signature"]);
				if (data["success"] == true) {
					wx.config({
						debug: false,
						appId: xtAPI.appid,
						timestamp: data["data"]["timestamp"],
						nonceStr: data["data"]["nonceStr"],
						signature: data["data"]["signature"],
						jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
					});

					wx.ready(function () {
						wx.onMenuShareTimeline({
							title: share.des, /*分享标题*/
							link: share.link, /*分享链接*/
							imgUrl: share.img, /*分享图标*/
							success: function success() {
								// show_weui_alert("","分享成功");
							},
							cancel: function cancel() {
								// show_weui_alert("","分享已取消");
							},
							fail: function fail() {
								// show_weui_alert("","分享失败");
							}
						});

						wx.onMenuShareAppMessage({
							title: share.tit, /*分享标题*/
							desc: share.des, // 分享描述
							link: share.link, /*分享链接*/
							imgUrl: share.img, /*分享图标*/
							success: function success() {
								// show_weui_alert("","分享成功");
							},
							cancel: function cancel() {
								// show_weui_alert("","分享已取消");
							},
							fail: function fail() {
								// show_weui_alert("","分享失败");
							}

						});
					});
				}
			}
		});
	};

	var invite = function invite() {
		$("#invite-dialog").html("<img src='" + commonUrl + "newlive/tLivechannel/makeQrcode.do?liveid=" + request["liveid"] + "'/>");
	};

	return {
		request: request,
		commonUrl: commonUrl,
		appid: appid,
		user: user,
		wechatlogin: wechatlogin,
		liveInfo: liveInfo,
		loadindexitem: loadindexitem,
		invite: invite,
		giftlist: giftlist,
		withdraw: withdraw,
		getredpacket: getredpacket,
		accountmoney: accountmoney,
		applicationmoney: applicationmoney,
		getWxsign: getWxsign,
		webGetChannels: webGetChannels,
		share: share,
		getPhoneUserAccount: getPhoneUserAccount,
		anchor_applicationmoney: anchor_applicationmoney,
		getAccountRecord: getAccountRecord,
		from: from,
		webGetCases: webGetCases,
		getChannelInfo: getChannelInfo
	};
}();

var wxPay = function () {

	var brandwcpayrequest = {
		"appId": xtAPI.appid,
		"timeStamp": "",
		"nonceStr": "",
		"package": "",
		"signType": "MD5",
		"paySign": ""
	};

	// var init = function(){
	// 	if (typeof WeixinJSBridge == "undefined"){
	// 	   if( document.addEventListener ){
	// 	       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	// 	   }else if (document.attachEvent){
	// 	       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
	// 	       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	// 	   }
	// 	}
	// };

	//调用微信JS api 支付
	var onBridgeReady = function onBridgeReady(type, giftid, sendmoney) {
		$.ajax({
			type: "post",
			url: xtAPI.commonUrl + "newlive/tGiftrecord/getWxPayidForgift.do",
			data: { "type": type, "liveid": xtAPI.request["liveid"], "giftid": giftid, besenderid: "f44aa085334c47b899597d5441f293f5", "sendmoney": sendmoney },
			datatype: "json",
			success: function success(data) {
				var jsondata = data["data"];
				brandwcpayrequest["package"] = jsondata["package"];
				brandwcpayrequest["paySign"] = jsondata["paySign"];
				brandwcpayrequest["timeStamp"] = jsondata["timeStamp"];
				brandwcpayrequest["nonceStr"] = jsondata["nonceStr"];
				WeixinJSBridge.invoke('getBrandWCPayRequest', brandwcpayrequest, function (res) {
					$(".ctdialog").removeClass("show");
					if (res.err_msg == "get_brand_wcpay_request:ok") {
						$(".ctdialog").removeClass("show");
					} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
				});
			},
			error: function error() {
				alert("请求异常");
			}
		});
	};

	var sendtocustomer = function sendtocustomer(money, hongbaotype, sendtxt, detailnum) {
		if(parseFloat((money / detailnum)) >= 0.01){
			$.ajax({
				type: "post",
				url: xtAPI.commonUrl + "newlive/tHongbao/sendHongbao.do",
				data: { "money": money, "liveid": xtAPI.request["liveid"], "hongbaotype": hongbaotype, sendtxt: sendtxt, "detailnum": detailnum },
				datatype: "json",
				success: function success(data) {
					var jsondata = data["data"];
					brandwcpayrequest["package"] = jsondata["package"];
					brandwcpayrequest["paySign"] = jsondata["paySign"];
					brandwcpayrequest["timeStamp"] = jsondata["timeStamp"];
					brandwcpayrequest["nonceStr"] = jsondata["nonceStr"];
					WeixinJSBridge.invoke('getBrandWCPayRequest', brandwcpayrequest, function (res) {
						$(".ctdialog").removeClass("show");
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							$(".ctdialog").removeClass("show");
						} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
					});
				},
				error: function error() {
					alert("请求异常");
				}
			});
		}else{
			layui.use(['layer'], function () {
				layer.msg("红包数值填写的不正确");
			});
		}
	};

	return {
		onBridgeReady: onBridgeReady,
		sendtocustomer: sendtocustomer,
		brandwcpayrequest: brandwcpayrequest
	};
}();
