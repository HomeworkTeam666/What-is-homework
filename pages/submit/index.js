// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showImageDetail: false,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
  },
  queryClassID: function(){
    var app = getApp();
    wx.request({
      url: 'http://47.99.194.172/queryClassID',
      data: { openid: getApp().globalData.openid },
      header: { 'Content-type': 'application/json' },
      method: "GET",
      success: res => {
        this.setData({
          array: res.data

        });
        console.log(res.data);
      }
    })
  },
  onLoad: function(){
    this.queryClassID()
  },
  onShow: function(){
    this.queryClassID()
  },
  deleteCourse: function(e) {
    wx.request({
      url: 'http://47.99.194.172/deleteCourse',
      data:{
        classid:e.currentTarget.dataset.classid
      },
      header:{'Content-type':'application/x-www-form-urlencoded'},
      method:'POST',
      success: res => {
        this.queryClassID()
      }
    })
  },
  ToSubmitHomework: function (e) {
    wx.navigateTo({
      url: "../submitHomework/index?course=" + e.currentTarget.dataset.course+"&classid="+e.currentTarget.dataset.classid
    })
  },
  showDetail: function(){
    this.setData({
      showImageDetail: true
    });
  }
})