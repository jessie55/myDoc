# 跨域


## easyXDM

easyXDM是一个较为成熟的js跨域解决方案，并且其对各种浏览器都有不同的解决方案，兼容性较好，在ie6,7中使用的是flash，其他浏览器使用的是：PostMessageTransport。
easyXDM的使用了3个页面：当前查看页面，中间页面，iframe嵌套页面。

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

