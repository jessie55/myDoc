# 前端路由的两种实现

## History API

两个新增的API： history.pushState 和 history.replaceState，这两个 API 都接收三个参数，分别是

- **状态对象（state object）**与用pushState()方法创建的新历史记录条目关联。无论何时用户导航到新创建的状态，popstate事件都会被触发，并且事件对象的state属性都包含历史记录条目的状态对象的拷贝。
- **标题（title）**FireFox浏览器目前会忽略该参数。考虑到未来可能会对该方法进行修改，传一个空字符串会比较安全。或者，你也可以传入一个简短的标题，标明将要进入的状态。
- **地址（URL）**新的历史记录条目的地址。浏览器不会在调用pushState()方法后加载该地址，但之后，可能会试图加载，例如用户重启浏览器。新的URL不一定是绝对路径；如果是相对路径，它将以当前URL为基准；传入的URL与当前URL应该是同源的，否则，pushState()会抛出异常。该参数是可选的；不指定的话则为文档当前URL。

**相同之处**是两个 API 都会操作浏览器的历史记录，而不会引起页面的刷新。

**不同之处**在于，pushState会增加一条新的历史记录，而replaceState则会替换当前的历史记录。

我们在控制台输入
> window.history.pushState(null, null, "https://www.baidu.com/?name=orange");


每次改变 url 页面并没有刷新，同样根据上文所述，浏览器会产生历史记录。
注意:这里的 url 不支持跨域，当我们把 www.baidu.com 换成 baidu.com 时就会报错。

这就是实现页面无刷新情况下改变 url 的前提，下面我们说下第一个参数**状态对象**。

如果运行 history.pushState() 方法，历史栈对应的纪录就会存入 状态对象，我们可以随时主动调用历史条目。

<a rel="demo" href="historyDemo.html">demo</a>
点击 Advance to 对应的 url 与模版都会 +1，反之点击 retreat to 就会都 -1，这就满足了 url 与模版视图同时变化的需求。


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

