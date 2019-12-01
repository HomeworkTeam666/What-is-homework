// pages/createCourse/index.js
var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function generateMixed(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;

}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        Random:'',
        openid:''
    },

    createCourse: function (e) {

        const db = wx.cloud.database()
        var Random = generateMixed(5)
        db.collection('Courses').add({
            data: {
                Courses: e.detail.value.courseName,
                Teacher: e.detail.value.teacher,
                StudentName: e.detail.value.studentName,
                ClassId: Random,
                Members: [this.data.openid]
            },
            success: res => {
                console.log(res)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})