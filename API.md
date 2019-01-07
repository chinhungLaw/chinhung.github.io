
## 页面统计脚本

引入统计脚本

```html
<script type="text/javascript">
  window.NGAST = {
    root: '//upv.9game.cn/img',
    data: {
      logtype: 'ds'
    }
  };
</script>
<script src="https://image.9game.cn/s/uae/g/2q/prod/public/common/st/st.js"></script>
```

引入脚本后PV会自动统计，统计某按钮事件调用

```javascript
window.NGAST.send({
  text: 'share_btn_click'   // 自定义事件名，之后给到阿里游戏的运营同学
});
```

## 获取微信分享开放平台签名信息

*跨域需要在 *.aligames.com 下请求*

跨域测试方法: 可以在hosts文件中新增 `127.0.0.1 test.aligames.com`, 之后使用 `http://test.aligames.com:端口/xxx` 测试页面

```javascript
$.ajax({
  url: 'https://goldpage.9game.cn/api/act/wx/getWeiXinConfig',
  type: 'GET',
  contentType: 'application/json',
  data: {
  	url: location.href,
  }
});
```

返回数据格式

```json
{
  "data": {
    "data": {
      "wxAppId": "",
      "wxTimestamp": "",
      "wxNonceStr": "",
      "wxSignature": ""
    },
    "state": {
      "code": 2000000,
      "msg": "success"
    }
  }
}
```

可以参考页面: https://render.aligames.com/p/q/jcg3arof/index.html
