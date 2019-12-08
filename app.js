const UserService = require("./services/user");

//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
            wx.cloud.init({
              // env 参数说明：
              //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
              //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
              //   如不填则使用默认环境（第一个创建的环境）
              // env: 'my-env-id',
              traceUser: true,
            })
        }

    this.globalData = {
      userInfo: null,
      openid: ''
    }

    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        //登录态过期
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            //UserService.login(res.code);
            var Params = {
              code: res.code, //临时登录凭证
              //key: self.data.MD5Key
            };
            //生成加密key
            //Params.key = self.MD5(Params.code + "&" + self.getNowTime() + "&" + Params.key);
            wx.request({
              url: 'http://47.99.194.172/getOpenId', //此处填写第三方的接口地址
              data: '=' + JSON.stringify(Params),
              header: {
                'content-type': 'application/json'
              },
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              success: function (res) {
                var openid = res.data.RntData.openid //返回openid
                this.data.openid = openid;
                console.log(openid);
              }
            })
          }
          
        });
      }
    })
    var self=this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //UserService.login(res.code);
        console.log("code:"+res.code);
        //生成加密key
        //Params.key = this.MD5(Params.code + "&" + this.getNowTime() + "&" + Params.key);
        wx.request({
          url: 'http://47.99.194.172/getOpenId', //此处填写第三方的接口地址
          data: {code:res.code},
          header: {
            'content-type': 'application/json'
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          dataType:'json',
          responseType: 'text',
          success: function (res) {
            var openid = res.data.openid //返回openid
            console.log(openid);
            self.globalData.openid = openid;

          }
        })
      }

    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            withCredentials: false,
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              console.log(res);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  }

})