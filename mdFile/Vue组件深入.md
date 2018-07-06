# 组件

* 组件的`$ref`属性 
    1. 我们可以通过对标签设置ref属性 来给元素加上标志`<btn ref='btn'></btn>` 之后我们就可以通过`this.$refs.btn`来访问到组件对象或者DOM节点，可以拿到数据也能触发子组件中的methods方法
    1.  组件的ref都是唯一标志 如果使用同一个名字 则只会选择到后创建的那个ref节点 使用多个相同的组件要使用`v-for`来创建相同的ref节点 这时候得到的就是一个数组

* 组件的slot标签
    1. 在使用render的时候 组件中的值都会被替换掉 这时候如果要接收的时候可以使用一个`slot`接收父组件中的`innerHTML`内容,指定位置接收需要在父组件中添加`slot`属性 接着在子组件使用`name`接收 即可
* 组件的生命周期 => 类似与实例的生命周期
    1. 添加了一个`activated` 函数和`deactivated` 函数 在组件中使用`<keep-alive></keep-alive>` 即使设置`v-if` 也不会被销毁，而是被缓存了起来

* 动态组件 `<component></component>`=> 通过`:is` 绑定组件名称

```javascript

    <component v-bind:is='whatCom'></component>
    data(){
  	return {
  		whatCom: 'phone-com'
  	}
  }
```

* 动画 => 通过`transition`标签和`transition-group`标签 产生动画和过渡效果 通过设置name属性生成动画 CSS对应类名为
    1. name-enter
    1. name-enter-to
    1. name-enter-active
    1. name-leave
    1. name-leave-to
    1. name-leave-active
    1. 其中起点设置为name-enter => 终点 name-enter-to =>中间的过渡效果由 name-enter-active 完成