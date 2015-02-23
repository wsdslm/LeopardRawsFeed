# Leopard-Raws Feed #
[http://leopard-raws.jp/](http://leopard-raws.jp/) 自定义订阅

在线地址:[http://feed.ani-fans.com/](http://feed.ani-fans.com/)

## 安装 ##

	git clone https://github.com/wsdslm/LeopardRawsFeed.git
	cd LeopardRawsFeed

安装gulp

	npm install gulp -g

安装依赖

	npm install

执行gulp任务

	gulp default

更改安全验证密码

	vi app.js
	:44
	# if (req.body.secret === '123456') {

启动应用

	node bin/www

访问应用

	http://localhost:3000