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
    isShow:false
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
      //将markdown内容转换为towxml数据
      let data = app.towxml.toJson(res.data.article.content, 'markdown');
      //设置文档显示主题，默认'light'
      //  data.theme = 'dark';
      //设置数据
      this.setData({
        article: data,
        isloading:false
      });
    })
  },
  getCatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      console.log(res)
      this.setData({
        catalog:res.data
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})