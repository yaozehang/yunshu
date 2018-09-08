// pages/user/user.js
import {fetch} from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isMan:true,
    collectNum:0,
    isloading: false,       
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.getCollection()
  },

  getData(){
    return new Promise((resolve)=>{
      resolve()
      wx: wx.getUserInfo({
        success: res => {
          this.setData({
            userInfo: res.userInfo
          })
          this.isMan()
        },
      })
    })
  },

  getCollection(){
    fetch.get('/collection/total').then(res=>{
      this.setData({
        collectNum:res.data
      })
    })
  },

  isMan(){
    if(this.data.userInfo.gender == 1){
      this.setData({
        isMan : true
      })
    }else{
      this.setData({
        isMan : false
      })
    }
  },

  handleCollect(){
    wx.navigateTo({
      url: '/pages/collect/collection',
    })
  },

  show(){
    wx.showToast({
      title: '暂无关注',
      icon: 'none',
      duration: 1000
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})