// pages/collect/collection.js
import { fetch } from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectData:[],
    isloading: false,   
    isShow:false, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  getData(){
    return new Promise((resolve)=>{
      fetch.get('/collection').then(res=>{
        resolve()
        console.log(res)
        this.setData({
          collectData:res.data
        })
      })
    })
  },

  handleBook(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },

  deleteBox(){
    let isShow = !isShow
    this.setData({
      isShow,   
    })
  },

  deleteBook(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    // let collectData = this.data.collectData.filter((i) => {
    // return i.book._id !== id
    // })
    fetch.delete(`/collection/${id}`, id).then(res => {
        this.setData({
          isShow:false
        })
      this.onReachBottom()
      })

  },


  onPullDownRefresh() {
    this.setData({
      isloading: true
    })
    this.getData().then(() => {
      this.setData({
        isloading: false
      })
      wx.stopPullDownRefresh()
    })
  },

  onReachBottom() {
    this.setData({
      hasMore: true
    })
    this.getData().then(() => {
      this.setData({
        hasMore: false
      })
    })
  },
  // / collection /: id

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})