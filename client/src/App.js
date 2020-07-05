import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./screens/Main/Main";
import Room from "./screens/Room/Room";
import RoomChat from "./screens/RoomChat/roomChat";
import { socket, SocketComponent } from "./services/socketService";
import Register from "./screens/Register/Register";
import C2CRoom from "./screens/C2CRoom/C2CRoom";
import Broadcast from "./screens/Broadcast/Broadcast";
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

class App extends Component {



  constructor(props) {


    super(props);
    this.state = {
      show:false,
      mesaj: ''
    }

    

  }

  componentDidMount(){
    socket.on("broadcast",data=>{
      
      this.setState({mesaj: data.message, show:true});
    })
  }

  render() {
    return (
      <Router>

        <Alert show={this.state.show} variant="success">
          <Alert.Heading>Server</Alert.Heading>
          <p>
            {this.state.mesaj}
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => this.setState({show:false})} variant="outline-success">
              Kapat!
          </Button>
          </div>
        </Alert>

        <SocketComponent />
        <Route path="/Login" exact component={Main} />
        <Route path='/room' exact component={Room} />
        <Route path='/roomChat/:roomName' exact component={RoomChat} />
        <Route path='/C2CRoom/:kisiUsername' exact component={C2CRoom} />
        <Route path='/' exact component={Register} />
        <Route path='/broadcast' exact component={Broadcast} />


      </Router>
    );
  }

}

export default App;
