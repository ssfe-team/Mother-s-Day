require(['jquery', 'b', 'barrager'], function($, b, barrager) {
    $(document).ready(function() {
        // 绑定页面的resize事件以在变化时更新html的font-size
        $(window).resize(setFontSize);
        checkLogin(); // 获取用户登录信息
      setTimeout(function () {
        $(".line-1").animate({
          top:'.5rem',
          opacity: '1'
        });
      },200);
      setTimeout(function () {
        $(".line-2").animate({
          top:'.9rem',
          opacity: '1'
        });
      },300);
      setTimeout(function () {
        $(".line-3").animate({
          top:'1.4rem',
          opacity: '1'
        });
      },400);
      setTimeout(function () {
        $(".line-4").animate({
          top:'1.8rem',
          opacity: '1'
        });
      },500);
      setTimeout(function () {
        $(".slide-left").animate({
          top:'2.8rem',
          opacity: '1'
        });
      },100);
      setTimeout(function () {
        $(".footer").animate({
          bottom:'.2rem',
          opacity: '1'
        });
      },100);
    });
    document.addEventListener('touchstart', touch, false);
    document.addEventListener('touchmove', touch, false);
    document.addEventListener('touchend', touch, false);

    function touch(event) {
        var event = event || window.event;

        switch (event.type) {
            case "touchstart":
                window.touchX = event.touches[0].clientX;
                break;
            case "touchend":
                if ((window.touchX - event.changedTouches[0].clientX) > 30) {
                    window.location.href = 'question.html';
                }
                break;
        }
    }
    // 设置html的font-size
    function setFontSize() {
        document.getElementsByTagName('html')[0].style.fontSize = (window.innerWidth / 375) * 100 + 'px';
    }
    // 获取用户登录信息
    function checkLogin() {
        $.ajax({
            url: "/user/getUserInfo.do",
            dataType: "json",
            type: "GET",
            success: function(data) {
                if (data.LoginTimeOut) {
                    // 用户未登录
                    applyWechatLogin();
                }
            },
            error: function() {
                console.log("网络错误！");
            }
        });
    }
    // 获取微信上自动注册创客贴账号的链接
    function applyWechatLogin() {
        $.ajax({
            url: "/login/webWxFWHLogin.do",
            dataType: "json",
            type: "POST",
            data: {
                redirect_url: window.location.href
            },
            success: function(data) {
                if (data.code == 1) {
                    window.location.href = data.url;
                } else {
                    console.log("出错啦!")
                }
            }
        });
    }
});
