// pages/book/details.js
import {fetch,updateTime} from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:"",
    bookData:{},
    isloading: false,
    isShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId:options.id,
    })
    this.getData()
  },
  getData(){
    this.setData({
      isloading:true
    })
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      let newData = res
      let Time = newData.data.updateTime
      newData.timeStr = updateTime(Time);  
      this.setData({
        bookData: newData,
        isloading: false,
      })
    })
  },

  jumpCatalog(){
    wx.navigateTo({
      url:`/pages/catalog/catalog?id=${this.data.bookId}`
    })
  },

  isShow(){
    let isShow = !this.data.isShow;
    this.setData({
      isShow
    })
  },

  bookCollect(){
    fetch.post('/collection',{
      bookId:this.data.bookId
    }).then(res =>{
      if (res.code == 200) {
        wx.showToast({
          title: '收藏成功',
          type: 'success',
          duration: 1000
        })
      }
      let bookData = {...this.data.bookData}
      bookData.isCollect = 1
      this.setData({
        bookData:bookData
      })
    })
  },

  cancelCollect(){
    fetch.delete(`/collection/${this.data.bookId}`).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '取消收藏成功',
          type: 'success',
          duration: 1000
        })
      }
      let bookData = { ...this.data.bookData }
      bookData.isCollect = 0
      this.setData({
        bookData: bookData
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: this.data.bookData.data.title,
      path: `/pages/details/details?id=${this.data.bookId}`,
      imageUrl:this.data.bookData.data.img
    }
  }
})