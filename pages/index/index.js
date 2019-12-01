
function sortBy(field) {
    return (x, y) => {
        return x[field] - y[field]
    }
}
Page({
  data: {
    activeIndex: 0,

    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    array:'',
    idd:'',
    sort: 1
  },
    onShow: function (options) {
        const db = wx.cloud.database()

        db.collection('Homework').where({
                _openid: this.data.openid,
                done: false
        }).get({
                success: res => {
                    var temp = res.data
                    temp.sort(sortBy("Date"));
                    this.setData
                        ({
                            array: temp
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
  todetail(){
    wx.switchTab({
      url: '../detail/index',
    })

  }
});