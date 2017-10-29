# 跨域


## easyXDM

easyXDM 是一个较为成熟的js跨域解决方案，集成了现有的多种跨域解决方案，兼容性较好，在ie6,7中使用的是flash，其他浏览器使用的是：PostMessageTransport。

easyXDM 使用了3个页面：当前查看页面，中间页面，iframe嵌套页面。







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



## easyXDM 原理
easyXDM 对不同的底层通信机制进行封装，比如上面实例中使用了 **postMessage** 机制来实现跨域双向通信。

### 子页面发送数据给主页面

easyXDM 将方法调用操作进行打包后通过 postMessage 发送给主页面，主页面的 message 处理函数收到数据后交由 easyXDM 进行解析后调起调用函数。代码调用和数据流如下图所示：

![子页面通信](./pic/pic1.jpg)

传递的数据说明：

* **defaultXXX**: 为通道标识符，页面不刷新的情况下，这个值不变
* **id**: 请求编号，自增，每发送一次请求加1
* **method**: 需要调用的方法名
* **params**: 调用方法的参数，以 JSON 格式表示
* **jsonrpc**: 表示 JSON-RPC 消息版本


### 主页面方法返回响应数据
easyXDM 同样会调用 postMessage 将方法响应发回给子页面，子页面的 message 处理函数收到数据后交由 easyXDM 进行解析，解析后执行对应的响应处理操作。代码调用和数据流如下图所示：

![主页面通信](./pic/pic2.jpg)

传递的数据说明：

* **defaultXXX**: 为通道标识符，页面不刷新的情况下，这个值不变；与子页面发送的数据一致
* **id**: 与调用方法时发送的 id 一致
* **result**: 方法响应，以 JSON 格式表示
* **jsonrpc**: 表示 JSON-RPC 消息版本

















