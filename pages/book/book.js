// pages/book/book.js
import {fetch} from '../../utils/util.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleId:"",
    bookId:"",
    article:{},
    isloading:false,
    catalog:{},
    isShow:false,
    title:"",
    font:40,
    index:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
    this.setData({
      titleId: options.id,
      bookId: options.bookId      
    })
    this.getData()
    this.getCatalog()
  },

  getData(){
    this.setData({
      isloading:true
    })
    fetch.get(`/article/${this.data.titleId}`).then(res =>{
      console.log(res)
      this.setData({
        article: res.data.article.content,
        title:res.data.title,
        isloading:false,
        index: res.data.article.index
      });
    })
  },
  getCatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      console.log(res)
      this.setData({
        catalog:res.data,
      })
    })
  },
  toggleCatalog(){
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })
  },
  handleGet(event){
    const id = event.currentTarget.dataset.id
    this.setData({
      titleId:id
    })
    this.getData()
    this.toggleCatalog()
  },

  handleAdd(){
    if(this.data.font>=80){
      wx.showModal({
        title:"提示",
        content:"已经够大了",
        showCancel:false
      })
    }else{
      this.setData({
        font: this.data.font + 2
      })
    }
  },
  handleRuduce(){
    if (this.data.font <= 28) {
      wx.showModal({
        title: "提示",
        content:"太小了,你看得见么",
        showCancel: false
      })
    } else {
      this.setData({
        font: this.data.font - 2
      })
    }
  },
  handlePrev(){
    let catalog = this.data.catalog;
    if (this.data.index-1<0) {
      wx.showModal({
        title: '提示',
        content: '到头了',
        showCancel: false
      })
    } else {
      this.setData({
        titleId: this.data.catalog[this.data.index - 1]._id
      })
      this.getData();
    }
  },
  handleNext(){
    let catalog = this.data.catalog;
    if(!(catalog[this.data.index+1])){
      wx.showModal({
        title: '提示',
        content: '最后一章了',
        showCancel: false
      })
    }else{
      this.setData({
        titleId: this.data.catalog[this.data.index + 1]._id
      })
      this.getData();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})