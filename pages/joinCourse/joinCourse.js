// pages/joinCourse/joinCourse.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid:''
    },

    joinCourse: function(e) {
        const db = wx.cloud.database()
        const _ = db.command
        db.collection('Courses').where({
            ClassId: e.detail.value.ClassId
        }).update({
            data: {
                Members : _.push(this.data.openid)
            },
            success: res => {
                console.log(res)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.cloud.callFunction({
            name: "test",
            complete: res => {
                this.setData({
                    openid: res.result.openid
                })
                console.log('callFunction test result: ', res)
            }
        })
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