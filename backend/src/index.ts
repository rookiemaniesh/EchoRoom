import { WebSocket, WebSocketServer } from "ws";
const wss= new WebSocketServer({port:8080});
let userCount=0;
interface User{
    socket:WebSocket,
    room:String
}
let allSocket:User[]=[];
wss.on("connection",(socket)=>{
   

    socket.on("message",(e)=>{
        //@ts-ignore
        const parsedMessage=JSON.parse(e);
        if(parsedMessage.type==="join"){
            allSocket.push({
               socket:socket,
               room:parsedMessage.payload.roomId 
            })
            socket.send("Connected to RoomId:"+parsedMessage.payload.roomId )
        }
        if(parsedMessage.type==="chat"){
            let currentUserRoom=null;
            for(let i=0;i<allSocket.length;i++){
                if(allSocket[i].socket==socket){
                    currentUserRoom=allSocket[i].room
                }
            }
            for(let i=0;i<allSocket.length;i++){
                if(allSocket[i].room==currentUserRoom){
                    allSocket[i].socket.send(parsedMessage.payload.message)
                }
            }
        }
        
    })
   
})