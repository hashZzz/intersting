//引入ws
const web=require("ws");
//实例化websocket 类似于new net.Socket();参数是一个对象，配置文件
const server = new web.Server({port:9000});
//服务器端依旧需要创建用户容器
let clients=[];
//连接的时候的事件 参数回调，回调参数是一个响应对象
server.on("connection",(client)=>{
    client.id=clients.length;
    clients.push(client);
    //当客户端接收到响应的时候发生的函数处理程序    
    client.on("message",(data)=>{
        for(var i=0;i<clients.length;i++){
            if(clients[i]){
                clients[i].send(data);
            }
        }
    });
    client.on("close",()=>{
        clients[client.id]=null;
    })
    client.on("error",()=>{
        clients[client.id]=null;
    });
});
