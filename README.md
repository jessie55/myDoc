# 前端路由的两种实现

## History API
文档：<a rel="https://developer.mozilla.org/en-US/docs/Web/API/History" href="historyDemo.html">https://developer.mozilla.org...</a>

### pushState/replaceState

两个新增的API： history.pushState 和 history.replaceState，这两个 API 都接收三个参数，分别是

- 状态对象（state object）它可以理解为一个拿来存储自定义数据的元素。它和同时作为参数的url会关联在一起。。
- 标题（title）是一个字符串，目前各类浏览器都会忽略它（以后才有可能启用，用作页面标题），目前建议设置为空字符串。
- 地址（URL）一般会是简单的?page=2这样的参数风格的相对路径，它会自动以当前URL为基准。需要注意的是，本参数URL需要和当前页面URL同源，否则会抛出错误。


**相同之处**是两个 API 都会操作浏览器的历史记录，而不会引起页面的刷新。
**不同之处**在于，pushState会增加一条新的历史记录，而replaceState则会替换当前的历史记录。

我们在控制台输入
> window.history.pushState(null, null, "https://www.baidu.com/?name=orange");


调用pushState()方法将新生成一条历史记录，方便用浏览器的“后退”和“前进”来导航（“后退”可是相当常用的按钮）。另外，从URL的同源策略可以看出，HTML5 history API的出发点是很明确的，就是让无跳转的单站点也可以将它的各个状态保存为浏览器的多条历史记录。当通过历史记录重新加载站点时，站点可以直接加载到对应的状态。

<a rel="demo" href="historyDemo.html">demo</a>

点击 go to 对应的 url 与模版都会 +1，反之点击 back to 就会都 -1，这就满足了 url 与模版视图同时变化的需求。
每次改变 url 页面并没有刷新，浏览器会产生历史记录。

### window.onpopstate
这个事件是在浏览器取出历史记录并加载时触发的。条件比较苛刻，只有点击浏览器的“前进”、“后退”这些导航按钮，或者是由JavaScript调用的history.back()等导航方法，且切换前后的两条历史记录都属于同一个网页文档，才会触发本事件。

“同一个网页文档”请理解为JavaScript环境的document是同一个，而不是指基础URL（去掉各类参数的）相同。也就是说，只要有重新加载发生（无论是跳转到一个新站点还是继续在本站点），JavaScript全局环境发生了变化，popstate事件都不会触发。

前面2个方法所设置的状态对象，也会在这个时候通过事件的event.state返还回来。


## hash

很多框架的路由系统大多都是哈希实现的。

**hashchange 事件**监听哈希变化触发的事件。
<a rel="demo" href="hashDemo.html">demo</a>

hashchange 在低版本 IE 需要通过轮询监听 url 变化来实现，我们可以模拟如下:
<pre><code>
(function(window) {
  // 如果浏览器不支持原生实现的事件，则开始模拟，否则退出。
  if ( "onhashchange" in window.document.body ) { return; }
  var location = window.location,
  oldURL = location.href,
  oldHash = location.hash;
  // 每隔100ms检查hash是否发生变化
  setInterval(function() {
    var newURL = location.href,
    newHash = location.hash;
    // hash发生变化且全局注册有onhashchange方法（这个名字是为了和模拟的事件名保持统一）；
    if ( newHash != oldHash && typeof window.onhashchange === "function"  ) {
      // 执行方法
      window.onhashchange({
        type: "hashchange",
        oldURL: oldURL,
        newURL: newURL
      });
      oldURL = newURL;
      oldHash = newHash;
    }
  }, 100);
})(window);
</code></pre>

