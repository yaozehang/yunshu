//index.js
//获取应用实例
import {fetch,login,updateTime} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 300,
    circular: true,
    isloading: false,
    pn:1,
    hasMore:true,
  },
  onLoad() {
    login()
    this.getData()
    this.getContent()
  },
  getData(){
    return new Promise((resolve,reject)=>{
      fetch.get("/swiper").then(res => {
        resolve()
        this.setData({
          swiperData: res.data,
        })
      }).catch(err=>{
        reject(reject)
      })
    })
  },
  getContent(){
    return new Promise((resolve,reject)=>{
      fetch.get('/category/books').then(res => {
        resolve()
        let newData = res.data
        for (let i = 0; i < newData.length;i++){
          for (let j = 0; j < newData [i].books.length;j++){
            let Time = newData [i].books[j].updateTime
            newData [i].books[j].timeStr = updateTime(Time);
          }
        }
        this.setData({
          mainContent: newData,
        })
      }).catch(err=>{
        reject(reject)
      })
    })   
  },

  getAllData(){
    return new Promise((resolve,reject)=>{
      this.setData({
        isloading: true
      })
      Promise.all([this.getData(),this.getContent()]).then(()=>{
        resolve()
        this.setData({
          isloading:false
        })
      }).catch(()=>{
        reject(reject)
        this.setData({
          isloading: false
        })  
      })
    })
  },

  jumpBook(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url:`/pages/details/details?id=${id}`,
    })
  },

  onPullDownRefresh() {
    this.getAllData().then(() => {
      this.setData({
        hasMore:true,
        pn:1
      })
      wx.stopPullDownRefresh()
    })
  },

  getMoreContent(){
    return new Promise((resolve) => {
      fetch.get('/category/books', { pn: this.data.pn }).then(res => {
         let newArr = [...this.data.mainContent,...res.data]
        for (let i = 0; i < newArr.length; i++) {
          for (let j = 0; j < newArr[i].books.length; j++) {
            let Time = newArr[i].books[j].updateTime
            newArr[i].books[j].timeStr = updateTime(Time);
          }
        }
        this.setData({
          mainContent: newArr,
        })
        resolve(res)      
      })
    })
  },

  onReachBottom(){
    if (this.data.hasMore){
      this.setData({
        pn:this.data.pn + 1
      })
      this.getMoreContent().then(res => {
        if (res.data.length < 2) {
          this.setData({
            hasMore: false
          })
        }
      })
    }
  },
  
})
