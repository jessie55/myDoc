# 前端路由的两种实现

## History API

两个新增的API： history.pushState 和 history.replaceState，这两个 API 都接收三个参数，分别是

- 状态对象（state object）与用pushState()方法创建的新历史记录条目关联。无论何时用户导航到新创建的状态，popstate事件都会被触发，并且事件对象的state属性都包含历史记录条目的状态对象的拷贝。
- 标题（title）FireFox浏览器目前会忽略该参数。考虑到未来可能会对该方法进行修改，传一个空字符串会比较安全。或者，你也可以传入一个简短的标题，标明将要进入的状态。
- 地址（URL）新的历史记录条目的地址。浏览器不会在调用pushState()方法后加载该地址，但之后，可能会试图加载，例如用户重启浏览器。新的URL不一定是绝对路径；如果是相对路径，它将以当前URL为基准；传入的URL与当前URL应该是同源的，否则，pushState()会抛出异常。该参数是可选的；不指定的话则为文档当前URL。

相同之处是两个 API 都会操作浏览器的历史记录，而不会引起页面的刷新。

不同之处在于，pushState会增加一条新的历史记录，而replaceState则会替换当前的历史记录。

我们在控制台输入
> window.history.pushState(null, null, "https://www.baidu.com/?name=orange");



![scrollIntoViewIfNeeded search on github](./scrollIntoViewIfNeeded-search-on-github.png)

这已经是一个被广泛使用的 API 了。

所以我创建了这个 repo，整理一些比较实用的但是却不经常见的前端技术。

## 建议

关于碎片化阅读其实我是持反对意见的，碎片化阅读只能作为自己知识的补充，但是真正想学好前端，还是应该多看书，从头构建自己的**完整知识体系**，然后把碎片化阅读作为自己知识体系中知识点的补充。

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/cn/"><img alt="知识共享许可协议" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/3.0/cn/88x31.png" /></a><br />本<span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" rel="dct:type">作品</span>由<a xmlns:cc="http://creativecommons.org/ns#" href="http://justjavac.com" property="cc:attributionName" rel="cc:attributionURL">justjavac</a>创作，采用<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/cn/">知识共享署名-非商业性使用-相同方式共享 3.0 中国大陆许可协议</a>进行许可。凡是转载的文章，翻译的文章，或者由其他作者投稿的文章，版权归原作者所有。
