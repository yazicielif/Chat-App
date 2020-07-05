import React, { Component } from "react"
import { socket } from '../../services/socketService'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class RoomChat extends Component {

  constructor(props) {


    super(props);
    socket.emit("odayaKatıl", { roomName: this.props.match.params.roomName, username: localStorage.getItem("user") });

    this.state = {
      messages: [],
      message: "",
      users: []

    }

    socket.emit("odaMesajlariCek", { roomName: this.props.match.params });

    socket.on("odaMesajlari", data => {
      console.log(data);
      this.setState({ messages: data })
    })

    socket.on("odayaMesaj", data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
    })

    socket.on("odayaYeniGelenMesaj", data => {
      var message = { username: data.username, msg: data.msg, time: data.time };
      this.setState({ messages: [...this.state.messages, message] });
      this.setState({ users: data.users });
      console.log(data.users);


    })

  }

  onSubmit = (e) => {
    e.preventDefault()
    socket.emit("mesajGönder", { username: localStorage.getItem("user"), message: this.state.message, roomName: this.props.match.params.roomName });

  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }


  leaveRoom = () => {
    socket.emit("odadanAyril", { roomName: this.props.match.params.roomName, username: localStorage.getItem("user") });
    this.props.history.push("/room");


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
            <h3><i class="fas fa-comments"></i> Oda Adı:</h3>
            <h2 id="room-name">{this.props.match.params.roomName}</h2>
            <h3><i class="fas fa-users"></i> Kullanıcılar</h3>
            <ul id="users"></ul>
            {this.state.users.map(user => {
              return (
                <>
                  <li>
                    {user.username}
                  </li>
                </>
              )
            })}

          </div>
          <div class="chat-messages">

            {this.state.messages.map(message => {

              if (localStorage.getItem("user") == message.username) {
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
                      <p class="meta">{message.username} <span>{message.time}</span></p>
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
              onChange={this.onChange}
              name="message"
            />

            <Button variant="primary" type="submit" onClick={this.onSubmit}>
              Gönder
                        </Button>


          </form>
        </div>
      </div>



    )
  }











}


export default RoomChat;