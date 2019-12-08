// pages/joinCourse/joinCourse.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid:''
    },

    joinCourse: function(e) {
      wx.request({
        url: 'http://47.99.194.172/joinCourse',
        data:{classid:e.detail.value.ClassId},
        header: { 'content-type':'application/x-www-form-urlencoded'},
        method:"GET",
        success: res => {
          wx.showModal({
            title: '提示',
            content: '加入课程成功！',
            showCancel: false,
            confirmText: '返回上级',
            success: res => {
              wx.navigateBack({
                url: '../Mine/index'
              })
            }
          })

        }
      })

        /*const db = wx.cloud.database()
        const _ = db.command
        wx.cloud.callFunction({
            name: "test",
            complete: res => {
                this.setData({
                    openid: res.result.openid
                })
                console.log('callFunction test result: ', res)
            }
        })
        db.collection('Courses').where({
            ClassId: e.detail.value.ClassId
        }).update({
            data: {
                Members : _.push(this.data.openid)
            },
            success: res => {
                console.log(res)
            }
        })*/
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})