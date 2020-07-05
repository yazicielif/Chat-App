import Button from 'react-bootstrap/Button'
import React, { Component } from "react"
import { socket } from '../../services/socketService'
const moment = require("moment")



class C2CRoom extends Component {


  constructor(props) {


    super(props);
    this.state = {

      message: "",
      messages: [],
      kisiUsername: ""

    }

    socket.on("C2CMesajAl", data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
    })

    socket.on("C2CMesajlari", data => {
      this.setState({ messages: data });
    })

    socket.emit("C2CRoomMesajlariCek", { kisiUsername: this.props.match.params.kisiUsername, username: localStorage.getItem("user") });
  }



  leaveRoom = () => {
    socket.emit("odadanAyril", { roomName: this.props.match.params.roomName, username: localStorage.getItem("user") });
    this.props.history.push("/room");
  }

  mesajGonder = (e) => {
    e.preventDefault();
    socket.emit("C2CMesajGonder", { kisiUsername: this.props.match.params.kisiUsername, username: localStorage.getItem("user"), msg: this.state.message });
    this.setState({ messages: [...this.state.messages, { username1: localStorage.getItem("user"), msg: this.state.message, time: moment().format('LT') }] });
  }
  change = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }


  render() {
    return (

      <div class="chat-container">
        <header class="chat-header">
          <h1><i class="fas fa-smile"></i> Chat App</h1>

          <Button variant="primary" type="submit" onClick={this.leaveRoom}>
            Odadan Çık
                        </Button>


        </header>
        <main class="chat-main">
          <div class="chat-sidebar">
            <h3><i class="fas fa-comments"></i> Kullanıcı Adı:</h3>
            <h2 id="room-name">{this.props.match.params.kisiUsername}</h2>


          </div>
          <div class="chat-messages">

            {this.state.messages.map(message => {
              if (localStorage.getItem("user") == message.username1) {
                return (
                  <div class="mine messages">
                    <div class="message">
                      <p class="meta">{message.username} <span>{message.time}</span></p>
                      <p class="text">
                        {message.msg}
                      </p>
                    </div>
                  </div>
                )
              }
              else {

                return (
                  <div class="yours messages">
                    <div class="message">
                      <p class="meta">{message.username1} <span>{message.time}</span></p>
                      <p class="text">
                        {message.msg}
                      </p>
                    </div>
                  </div>
                )

              }
            })}


          </div>
        </main>
        <div class="chat-form-container">
          <form id="chat-form" >
            <input
              id="msg"
              type="text"
              placeholder="Bir mesaj yaz"
              required
              autocomplete="off"
              onChange={this.change}
              name="message"
            />
            <Button variant="primary" type="submit" onClick={this.mesajGonder}>
              Gönder
                        </Button>
          </form>
        </div>
      </div>








    )
  }



}

export default C2CRoom;