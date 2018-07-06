Function.prototype.applyFn = function (context) {
    //考虑context是否传入
    var context = context || window;
    //让属性不重复
    var prop = Math.random().toString();
    context[prop] = this;
    var args = arguments[1];
    if (args == void 0) {
        return context[prop]();
    }
    //要写入参数 使用eval的方法;
    var str = "context[prop(";
    for (var i = 0; i < args.length; i++) {
        //考虑是否为对象
        str += i == args.length - 1 ? "args[" + i + "]" : "args[" + i + "]" + ",";
    }
    str += ')]';
    var result = eval(str);
    delete context.prop;
    return result;
};