import React, {Component} from "react"
import socketIOClient from "socket.io-client"

var socket;

class SocketComponent extends Component{

    constructor(){
        console.log("socket servis");
        super();
        socket=socketIOClient("http://localhost:5000");

        console.log(socket);


    }

   
    render(){
        return(
            <> </>
        )
    }
}




export {socket,SocketComponent};