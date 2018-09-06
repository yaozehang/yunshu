// pages/read/read.js
import {fetch} from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookData:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  getData(){
    fetch.get('/readList').then(res => {
        console.log(res)
        this.setData({
          bookData:res.data
        })
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})