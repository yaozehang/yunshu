const baseUrl = ''
const fetch = {
  http (url,method,data){
    wx.request({
      urel:baseUrl + url,
      data,
      method,
      header:{
        'content-type' : 'application/json'
      },
      success(res){
        resolve(res.data)
      },
      fail(err){
        reject(err)
      }
    })
  },
  get(url,data){
    return this.http
  }
}
