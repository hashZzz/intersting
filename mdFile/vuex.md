# Vuex

* 使用Vuex 

```javascript 
    //先安装vuex cnpm install vuex --save-dev
    // 在文件中Import
    import vue from "vue";
    import vuex from "vuex";
    Vue.use(vuex);
    //vuex是一个状态管理工具 
    //其中包含state getters mutations actions module五种功能
    const state = {
        //这里用来存放全局可以访问的数据 
    }
    const getters = {
        //getters相当于计算属性 
        count(state){
            //这里写计算内容
            return state.a+state.b;
        }
    }
    const mutations = {
        //mutations用来修改数据
        modifyA(state,value){
            //第一个参数是state对象，第二个是修改的值
            state.a = value.a
        }
        //可以拥有多个  通过this.$store.commit("modifyA")来触发
    }
    const actions = {
        //相当于事件 第一个参数是上下文对象，第二个是传入的参数
        modifyAction(context,params){
            context.commit("modifyA",{a:params.a});
        }
    }

    //创建一个仓库对象
    const store = new Vuex.Store({
        state,
        getters,
        mutations,
        actions,
        modules :{
            a:导入的A模块,
            b:导入的B模块
        }
    })
    //输出
    export default store;
```


* 在vuex中使用模块用法几乎等同于全局
    1. 但是在问数据的时候要使用$store.state.模块名.属性名
    1. 在命名getters的时候不能和全局重名 $store.getters.属性名
    1. mutations 直接访问 如果模块相同的mutations都会触发
    1. actions 同上
    1. 模块最后要导出 并注册模块 
    1. 模块可以拥有自己的命名空间 不会影响全局了 使用`namespaced:true`来实现 
        * 这时候访问state使用`$store.state.A.a`
        * 访问getters使用`$store.getters['A/a']`
        * mutations和actions使用 `$store.commit('A/modifyA')`;

* Vuex 的state(单一状态树) => 管理全局数据 => 每当`store.state`变化的时候就会重新取计算属性=>触发DOM更新
    * 使用`Vuex.mapState({})`来获取数据
    * 在computed中定义 
    ```javascript
        import Vuex from "vuex";
        computed:Vuex.mapState({
            //Vuex的数据导入
            count:state=>state.count,
            //原有的计算属性在这里定义，必须使用普通函数保留this的指向
            all(){
                return this.a+this.b
            }
        })
        //或者使用映射computed
        computed:{
            ...Vuex.mapState(['count'])
        }
    ```
* Vuex的getters 相当于computed计算属性 
    * 传递参数 
    ```javascript
    getDoneId:(state)=>{(id)=>{
        return state.todos.find(todo=>todo.id===id)
    }}
    store.getters.getTodoById(2)
    ```
    * mapGetters 辅助函数 可以取得全局的计算属性
    `...mapGetters(["count"])`

* Vuex的Mutations 定义在Methods中 Mutations都是同步的
* Vuex的Actions 用来提交mutations 而不是直接操作数据，可以包含异步操作 可以在actions中封装一个promise 来查看是否修改完成了
    1. 经典案例 [vuex-Actions](https://vuex.vuejs.org/zh/guide/actions.html)下拉
* 关于module Vuex允许我们将store分割成许许多多的模块 
    1. 在getter和mutation,Actions中的state(第一个参数指向都是当前模块状态) 但是在actions中 包含了第三个参数(根状态)rootState,第四个参数(根计算属性)rootGetters
    1. 默认情况所有的getters和mutations,actions 会对同一个事件进行响应，如果希望更高的封装度和复用性，可以使用namespaced
    ```javascript
            getters: {
                isAdmin () { ... } // -> getters['account/isAdmin']
            },
            actions: {
                login () { ... } // -> dispatch('account/login')
            },
            mutations: {
                login () { ... } // -> commit('account/login')
            },

    ```
    1. 在设置了namespaced的模块拥有私有的命名空间 如果想要访问根的state和getters则要通过第三个参数和第四个参数访问，如果是mutations和actions则要传递第三个参数`commit(a,b,{root:true}),dispatch(a,b,{root:true})` 或者在actions中添加`root:true`这时候函数处理程序就是一个对象
    `{root:true,handler(){//code here}}`
    1. 当在组件中使用actions的时候可以将第一个参数设置为模块路径,第二个参数是一个数组 [vue-modules-actions](https://vuex.vuejs.org/zh/guide/modules.html) 或者使用`createNamespacedHelpers`辅助函数`const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')`


    若碰见数据丢失setter getter则需要使用 data = {...oldData,newKey};