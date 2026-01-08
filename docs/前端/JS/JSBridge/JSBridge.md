# JSBridge协议



```javascript
// 网址：https://document.chaoxing.com/web/#/1/19

//学习通头部
globalObj.CXJSBRIDGE.postNotification('CLIENT_TOOLBAR_TITLE', {'webTitle':lang('课堂教学')})

//菜单协议
globalObj.CXJSBRIDGE.postNotification('CLIENT_CUSTOM_MENU', {
      show: 1,
      icon: 'http://task.chaoxing.com/images/phone/icon-more-2.png',
      children: [{menu: lang('添加活动'), option: 'isShowAddActivityPopFunc()'}, {menu: lang('添加课件')  , option: 'uploadlocalFile()'}]
    });

//打开页面协议
globalObj.CXJSBRIDGE.postNotification('CLIENT_OPEN_URL', {"webUrl": url,"loadType":1})
```

