// pages/submitHomework/submitHomework.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses:{},
    classid:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courses: options.course,
      classid: options.classid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  submitHomework: function (e) {
    console.log(e.detail.value.SubmitRemark);
    wx.request({
      url: 'http://47.99.194.172/submitHomework',
      data: {
        content: e.detail.value.SubmitContent,
        deadline: e.detail.value.SubmitDate.substring(0, e.detail.value.SubmitDate.length-2),
        remarks: e.detail.value.SubmitRemark,
        duetime: e.detail.value.SubmitDate.substring(e.detail.value.SubmitDate.length-2)+"0000",
        classid: this.data.classid,
      },
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: res => {
        wx.showToast
          ({
            icon: 'none',
            title: '作业添加成功！'
          })
        console.log('[数据库] [查询记录] 成功: ', res)
        return res
      },
      fail: err => {

        console.error('[数据库] [查询记录] 失败：', err)
      },
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

    onTrial: function (e) {
      
    /*db.collection('Courses').add({
      data: {
        SubmitDate: e.detail.value.SubmitDate,
        SubmitContent: e.detail.value.SubmitContent,
        SubmitRemark: e.detail.value.SubmitRemark,
        done: false
      },
      success: res => {
        console.log(res)
      }
    })*/
  }
})