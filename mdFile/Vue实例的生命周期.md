# Vue的生命周期

**所有的vue生命周期钩子都不能使用箭头函数**
1. `new Vue()` 之后开始加载生命周期钩子函数 只是读取没有调用
1. beforeCreat
    * 这个生命周期钩子用于实例初始化之后发生在数据观测和配置event/watcher之前调用   
1. created 
    * 在这个钩子中实例已经加载完成了data，watch/event事件回调，但是`$el`不可见
    * 执行完这一步开始判断是否存在`el`属性 如果没有则判断是否动态挂载`$mount(el)` 之后进入beforeMount
    * 判断是否有对应的DOM
1. beforeMount 
    * 这个钩子开始之后渲染实例对应的DOM节点
1. mounted
    * 这个钩子之后就可以执行DOM操作了！因为已经将实例的DOM渲染到DOM树中
    * 之后一个实例就创建完成了
1. beforeUpdate
    * 当数据发生改变 且数据绑定到了DOM节点上 才会发生改变 可以在这一步修改数据
1. updated
    * 在这一步改变的数据已经渲染上去了

1. beforeDestroy 
    * 删除关于内存泄漏的问题
1. destroyed 
    * 已经切断了和实例的关系


* 实例的方法
    * `$mount(el)` 动态挂载el
    * `vm.$on`和`vm.$emit` 自定义事件的监听，自定义事件的触发 先`on`再`emit`
    
    ```javascript
        vm.$on("事件名",(value)=>{
            console.log(value)
        });
        vm.emit("事件名","我是value");
    ```
    * `vm.$forceUpdate` 迫使Vue实例重新渲染DOM。例如swiper
