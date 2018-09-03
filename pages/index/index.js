//index.js
//获取应用实例
import {fetch} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 300,
    circular: true
  },
  onLoad() {
    this.getData()
    this.getContent()
  },
  getData(){
    fetch.get("/swiper").then(res=>{
      this.setData({
        swiperData : res.data
      })
    })
  },
  getContent(){
    fetch.get('/category/books').then(res =>{
      console.log(res),
      this.setData({
        mainContent:res.data
      })
    })
  }
})