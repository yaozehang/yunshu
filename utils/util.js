const baseUrl = "https://m.yaojunrong.com"

const fetch = {
  http(url, method, data) {
    return new Promise((resolve, reject) => {
      let token  = wx.getStorageSync('token')
      let header = {
        "content-type": "application/json"
      }
      if(token){
        header.token = token;
      }
      wx.request({
        url: baseUrl + url,
        method,
        data,
        header,
        success(res) {
          if(res.header.Token){
            wx.setStorageSync('token', res.header.Token)
          }
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  get(url, data) {
    return this.http(url, "GET", data)
  },
  post(url,data){
    return this.http(url,'POST',data)
  },
  delete(url,data){
    return this.http(url,'DELETE',data)
  }
}

const login = ()=>{
  wx.login({
    success(res){
      fetch.post('/login',{
        code:res.code,
        appid:"wx3f783bf6176641d6",
        secret:"7607bcde1a47314072ef422e887d8acc"
      }).then(res =>{
      })
    }
  })
}

exports.login = login;
exports.fetch = fetch;