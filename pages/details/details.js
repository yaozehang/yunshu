// pages/book/details.js
import {fetch} from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:"",
    bookData:{},
    isloading: false,
    isShow:false,
    updateTime:"",
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
      console.log(res.isCollect)
      this.setData({
        bookData: res,
        isloading: false,
        updateTime: res.data.updateTime,
      })
      this._update() 
    })
  },
  jumpCatalog(){
    console.log(this.data.bookId)
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
  _update() {
    var t1 = +new Date();
    var str = this.data.updateTime;
    var str = str.replace("(\\d{4})(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3 $4:$5:$6");
    var t2 = +new Date(str)
    var dif = Math.ceil((t1 - t2) / 1000);
    var res = dif < 60 ? `${dif}秒` : `${Math.floor(dif / 60)}分`;
    this.setData({
      updateTime: res
    })
  },

  bookCollect(){
    fetch.get('/collection',{
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.bookData.data.title,
      path: `/pages/details/details?id=${this.data.bookId}`,
      imageUrl:this.data.bookData.data.img
    }
  }
})