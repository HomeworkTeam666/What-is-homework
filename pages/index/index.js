

Page({
  data: {
    tabs: ["选项", "选项", "选项", "选项", "选项", "选项", "选项", "选项", "选项", "选项"],
    activeIndex: 0,

    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    array:'',

    sort: 1
  },
  onShow: function () {
    wx.request({
      url: 'http://47.99.194.172/homeworkQuery',
      data: { classid: this.data.openid },
      header: { 'Content-Type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: res => {
        this.setData
          ({
            array: res.data
          })
        console.log('[数据库] [查询记录] 成功: ', res)
        return res
      },
      fail: err => {
        wx.showToast
          ({
            icon: 'none',
            title: '查询记录失败'
          })
        console.error('[数据库] [查询记录] 失败：', err)
      },
      complete: function (res) { },
    })
  },
    onLoad: function (options) {
      var app = getApp();
      wx.request({
        url: 'http://47.99.194.172/studentIDQuery',
        data: {studentid:app.globalData.openid},
        header: {'Content-type':'application/json'},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: res => {
          if(res.data.message == "Not Found")
          {
            console.log("您当前未加入任何一个班级！")
          }
          else {
           wx.request({
              url: 'http://47.99.194.172/homeworkQuery',
              data: { classid: this.data.openid },
              header: { 'Content-Type': 'application/json' },
              method: 'GET',
              dataType: 'json',
              responseType: 'text',
              success: res => {
                this.setData
                  ({
                    array: res.data
                  })
                console.log('[数据库] [查询记录] 成功: ', res)
                return res
              },
              fail: err => {
                wx.showToast
                  ({
                    icon: 'none',
                    title: '查询记录失败'
                  })
                console.error('[数据库] [查询记录] 失败：', err)
              },
              complete: function (res) { },
            })
          }
          return res;
        }
      })
      
        /*
        const db = wx.cloud.database()

        db.collection('Courses').where({
                _openid: this.data.openid
        }).get({
                success: res => {
                    this.setData
                        ({
                            array: res.data
                        })
                    console.log('[数据库] [查询记录] 成功: ', res)
                    return res
                },
                fail: err => {
                    wx.showToast
                        ({
                            icon: 'none',
                            title: '查询记录失败'
                        })
                    console.error('[数据库] [查询记录] 失败：', err)
                }
            })
      */
    },

  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },

  sortClick: function (e) {
    this.setData({
      sort: e.currentTarget.dataset.id
    });
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  showdetail: function(e){
    console.log(e.currentTarget.dataset.homeworkhash)
    wx.navigateTo({
      url: '../detail/index?classname='+e.currentTarget.dataset.classname+'&content='+e.currentTarget.dataset.content +'&deadline='+e.currentTarget.dataset.deadline+'&remark='+e.currentTarget.dataset.remark+'&teacher='+e.currentTarget.dataset.teacher+'&assistant='+e.currentTarget.dataset.assistant
    })

  },
  finish: function(e){
    console.log('finish')
    wx.request({
      url: 'http://47.99.194.172/finishHomework',
      data:{homeworkhash:e.currentTarget.dataset.homeworkhash,
      openid:getApp().globalData.openid,},
      header:{'Content-type':'application/x-www-form-urlencoded'},
      method:'POST',
      success: res => {
      wx.showToast({
        title: '作业已完成！',
      })
    }
    })
  }
});