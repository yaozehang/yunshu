// pages/read/read.js
import {fetch,updateTime} from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookData:[],
    isloading:false,
    hasMove:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  getData(){
    return new Promise(resovle =>{
      fetch.get('/readList').then(res => {
        resovle();
        let Data = res.data
        for (let i = 0; i < Data.length; i++) {
          let index = Data[i].title.index
          let total = Data[i].title.total
          let percent = Math.floor((index/total)*100)
          Data[i].percent = percent
          let Time = Data[i].updatedTime
          Data[i].timeStr = updateTime(Time); 
         } 
        this.setData({
          bookData: Data,
        })

     })    
    })
  },

  onPullDownRefresh(){
    this.setData({
      isloading: true
    })
    this.getData().then(() => {
      this.setData({
        isloading:false
      })
      wx.stopPullDownRefresh()      
    })
  },

  onReachBottom(){
    this.setData({
      hasMore: true
    })
    this.getData().then(() => {
      this.setData({
        hasMore: false
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})