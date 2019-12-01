// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      
  },
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
    onShow: function (options) {

        const db = wx.cloud.database()

        db.collection('Courses').where({
            _openid: this.data.openid,
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
    },
    ToSubmitHomework :function(e){
        wx.navigateTo({
            url: "../submitHomework/index?Course=" + e.currentTarget.dataset.course
        })
        console.log(e.currentTarget.dataset.course)
    }
})