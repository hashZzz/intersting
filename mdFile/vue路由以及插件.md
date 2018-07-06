# 常用插件

* `animate.css` 
    * 首先下载 npm i animate.css --save 
    * 使用link引入 `<link rel='stylesheet' href='animate.min.css'>` 
    * 添加 class 
    * 使用链接 - [github-animate](https://github.com/daneden/animate.cssf)

* `iscroll` 滚动插件
    * 下载iscoll 插件
    * `new IScroll(选择器或dom元素,{配置文件})`
    * 基本设置
        1. 弹簧效果使用 `bounce:true` 
        1. 滚动视图中使用点击事件 需要添加click+tap 两个属性为true
        1. 设置x,y滚动 `scrollX:true,scrollY:true`
        1. 设置滚动起始位置 `startX:0,startY:0`
        1. 滚动条相关
            * 显示滚动条 `scrollbars : true`
            * 滚动时是否显示滚动条 `fadeScrollbars : true`
            * 是否x-y同时滚动 `freeScroll:true` 
            * 触发间隔 `probeType: 1` 值为1-2-3 触发间隔从小到大



# 路由配置

* 在vue-cli中使用webpack 创建包含路由的 骨架
* webpack模版中不采用render的形式渲染组件
* 在router文件夹中引入router组件
* 类似于node使用 `Vue.use(Router)` 使用插件
* 在路由`index.js` 中引入组件
* 通过export default new Router({}) 配置并输出模块
```javascript
    export default new Router({
	routes: [
		//一个对象就是一个页面组件的配置项内容
		{
			path: '/',
			component: Home
		},
		{
			path:'/hot',
			component: Hot
		},
		{
			path:'/discover',
			component: Discover
		},
		{
			path: '/setting',
			component: Setting
		}
	]
});
    
```

* Vue的导航守卫
	 * 组件内的守卫
	 1. beforeRouterEnter 在路由进入之前调用 不能获取组件实例
	 1. beforeRouterUpdate 当当前路由改变，但是组件被复用的时候调用
	 1. brforeRouterLeave 导航离开该组件的对应路由时调用

	* 全局守卫
	1. router.beforeEach 注册全局前置守卫 当导航被触发的时候，全局的前置守卫按照顺序调用 接收三个参数`(to,from,next)` 
		* 参数1 ： 即将进入的路由对象
		* 参数2 ： 当前导航正要离开的路由
		* 参数3 ： 一定要调用这个方法来resolve这个钩子 => 执行完成进入下一个钩子函数 如果`next(false)` 则中断当前导航 跳转=>from `next('/')` 跳转到新地址
	1. router.beforeResolve 注册全局解析守卫 导航被确认之前，同时所有组件内守卫和异步路由组件被解析之后调用
	1. router.afterEach 注册后置钩子，不接受next也不会改变导航
	1. router.beforeEnter 组件路由独享的守卫


# 导航守卫解析流程

1. 导航触发
1. 在失活的组件中调用离开守卫
1. 调用全局的beforeEach守卫
1. 在重用的组件中调用beforeUpdate
1. 在路由配置中调用beforeEnter
1. 解析异步路由
1. 激活的组件中调用beforeRouterEnter
1. 调用全局的 beforeResolve首页
1. 导航被确认
1. 调用全局的afterEach钩子
1. 触发DOM更新
1. 用创建好的实例调用beforeRouterEnter守卫传给next的回调函数