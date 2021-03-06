require(['jquery', 'b', 'wxjsapi', 'barrager'], function($, b, wx,barrager) {

  var wxConfig = {
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: '', // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'onVoicePlayEnd',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard'
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  };
  $.ajax({
    url: "/login/getWxDyhJsApiConfig.do",
    dataType: "json",
    type: "GET",
    success: function(data) {
      wxConfig.appId = data.appId;
      wxConfig.timestamp = data.timestamp;
      wxConfig.nonceStr = data.nonceStr;
      wxConfig.signature = data.signature;
      wx.config(wxConfig);
    },
    error: function() {
      console.log("请求config失败");
    }
  });
  //wx.config(wxConfig);
  wx.ready(function(){
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
    // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
    // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    wx.checkJsApi({
      jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function(res) {
        console.log('suc');
        console.log(JSON.stringify(res));
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      }
    });
    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
      wx.onMenuShareAppMessage({
        title: '她不在你的城市，在你的心里吗？',
        desc: '她的世界很小，只装满了你。你的世界很大，却常忽略了她',
        link: 'https://www.chuangkit.com/mod/activity/motherday/index.html',
        imgUrl: 'https://imgpub.chuangkit.com/barrageImg/share.jpg@100w',
        trigger: function (res) {
           //不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
           //alert('用户点击发送给朋友');
        },
        success: function (res) {
           //alert('已分享');
        },
        cancel: function (res) {
           //alert('已取消');
        },
        fail: function (res) {
           //alert(JSON.stringify(res));
        }
      });
      // alert('已注册获取“发送给朋友”状态事件');

    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
      
      wx.onMenuShareTimeline({
        title: '她不在你的城市，在你的心里吗？',
        link: 'https://www.chuangkit.com/mod/activity/motherday/index.html',
        imgUrl: 'https://imgpub.chuangkit.com/barrageImg/share.jpg@100w',
        trigger: function (res) {
          // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
           //alert('用户点击分享到朋友圈');
        },
        success: function (res) {
          //alert('已分享');
        },
        cancel: function (res) {
          //alert('已取消');
        },
        fail: function (res) {
          //alert(JSON.stringify(res));
        }
      });
      // alert('已注册获取“分享到朋友圈”状态事件');
  });
  wx.error(function (res) {
    // alert(res.errMsg);
  });

  $(document).ready(function(){
    // 绑定页面的resize事件以在变化时更新html的font-size
    $(window).resize(setFontSize);
  });
  // 设置html的font-size
  function setFontSize() {
    document.getElementsByTagName('html')[0].style.fontSize = (window.innerWidth / 375) * 100 + 'px';
  }
  document.addEventListener('touchstart',touch, false);
  document.addEventListener('touchmove',touch, false);
  document.addEventListener('touchend',touch, false);

  function touch (event){
    var event = event || window.event;

    switch(event.type){
      case "touchstart":
        window.touchX =  event.touches[0].clientX;
        break;
      case "touchend":
        if((event.changedTouches[0].clientX - window.touchX) > 30) {
          window.location.href = 'question.html';
          console.log('后退');
        }
        break;
    }
  }
  $("#share-button").click(function () {
    $(".modal").css("display","block");
  });
  $(".modal").click(function () {
    $(".modal").css("display","none");
  });
  $(".gift-button").click(function () {
    $("#myvideo").css("display","block");
    window.a = 1;
    document.getElementById("myvideo").play();
  });
  $("#myvideo").click(function () {
    $("#myvideo").css("display","none");
    document.getElementById("myvideo").pause();
  });

  $('#myvideo')[0].onpause = function() {
    $("#myvideo").css("display","none");
  }
});
