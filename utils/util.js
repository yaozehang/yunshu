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

const updateTime = (t) => {
  let nowTime = +new Date();
  let time = +new Date(t)
  let timeLag = Math.floor((nowTime - time) / 60000)
  let timeStr = ''
  if (timeLag < 1) {
    timeStr = '刚刚'
  } else if (timeLag >= 1 && timeLag < 60) {
    timeStr = timeLag + '分钟前'
  } else if (Math.floor(timeLag / 60) >= 1 && Math.floor(timeLag / 60) < 24) {
    timeStr = Math.floor(timeLag / 60) + '小时前'
  } else if (Math.floor(timeLag / 1440) >= 1 && Math.floor(timeLag / 1440) < 60) {
    timeStr = Math.floor(timeLag / 1440) + '天前'
  } else if (Math.floor(timeLag / 86400) >= 1 && Math.floor(timeLag / 86400) < 12) {
    timeStr = Math.floor(timeLag / 86400) + '月前'
  } else {
    timeStr = '很久'
  }
  return timeStr
}

// const updateTime= ()=>{
//   var t1 = +new Date();
//   var str = this.data.updateTime;
//   var str = str.replace("(\\d{4})(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3 $4:$5:$6");
//   var t2 = +new Date(str)
//   var dif = Math.ceil((t1 - t2) / 1000);
//   var res = dif < 60 ? `${dif}秒` : `${Math.floor(dif / 60)}分`;
//   this.setData({
//     updateTime: res
//   })
// },

exports.login = login;
exports.fetch = fetch;
exports.updateTime = updateTime;