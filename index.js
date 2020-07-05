const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const http = require('http');
const cors = require("cors");
const User = require("./models/user");
const generalRoom = require("./models/generalRoom");
const C2CRoom = require("./models/C2CRoom");
const bcrypt = require("bcrypt");
const moment = require("moment")


const app = express();
const server = http.createServer(app);
const server2 = http.createServer(app);
const io = socketio(server);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/hilalelif`);

app.use(express.json({ limit: '50mb' }));       // to support JSON-encoded bodies
app.use(express.urlencoded({ limit: '50mb', extended: true })); // to support URL-encoded bodies
app.use(cors);

//IMPORT ROUTES

var odadakiler = []
var kisiler = []



io.on("connect", (socket) => {

  socket.on('broadcastGonder', (data) => {
    console.log('-->',data)
    io.sockets.emit('broadcast', { message: data.mesaj });
  })


  socket.on('register', (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
      isAdmin: false
    }
    User.findOne({ email: data.email })
      .then(user => {
        if (!user) {
          bcrypt.hash(data.password, 10, (err, hash) => {
            userData.password = hash
            User.create(userData)
              .then(user => {
                socket.emit("register", { response: true });
              })
              .catch(err => {
                console.log('error:', err)
                socket.emit("register", { response: false });
              })
          })
        } else {
          console.log('kullanıcı var')
          socket.emit("register", { response: false });
        }
      })
      .catch(err => {
        console.log('error:', err)
        socket.emit("register", { response: false });
      })
  });



  socket.on("login", data => {
    console.log('İstek Geliyor')
    User.findOne({ username: data.username })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(data.password, user.password)) {
            socket.emit("login", { response: true });
            var kisi = { username: data.username, socketID: socket.id };
            kisiler.push(kisi);
          } else {
            console.log('şifre yanlış')
            socket.emit("login", { response: false });
          }
        } else {
          console.log('kullanıcı yok')
          socket.emit("login", { response: false });
        }
      })
      .catch(err => {
        console.log(err)
        socket.emit("login", { response: false });
      })
  })




  socket.on("odayaKatıl", data => {
    socket.join(data.roomName);
    var user = { username: data.username, roomName: data.roomName };
    odadakiler.push(user);
    var a = odadakiler.filter(x => x.roomName === data.roomName);
    console.log("-->", a);
    io.to(data.roomName).emit('odayaYeniGelenMesaj', { username: "Admin", msg: "Kullanıcı odaya katıldı", time: moment().format('LT'), users: a });


  })



  socket.on("C2CMesajGonder", data => {
    var a = kisiler.find(x => x.username === data.kisiUsername);
    var C2CRoomData = {
      msg: data.msg,
      username1: data.username,
      username2: data.kisiUsername,
      time: moment().format('LT')
    }
    C2CRoom.create(C2CRoomData)
      .then(() => {
        if (a) {
          io.to(a.socketID).emit('C2CMesajAl', { username: data.username, msg: data.msg, time: moment().format('LT') });
        }

      })
      .catch(err => {
        console.log('error:', err)
      })

  })

  socket.on("mesajGönder", data => {

    var generalRoomData = {
      msg: data.message,
      username: data.username,
      roomName: data.roomName,
      time: moment().format('LT')

    }
    generalRoom.create(generalRoomData)
      .then(() => {
        io.to(data.roomName).emit('odayaMesaj', { username: data.username, msg: data.message, time: moment().format('LT') });
      })
      .catch(err => {
        console.log('error:', err)
      })


  })

  socket.on("odaMesajlariCek", data => {

    generalRoom.find({ roomName: data.roomName.roomName }, function (err, response) {

      socket.emit("odaMesajlari", response)
    })

  })

  socket.on("C2CRoomMesajlariCek", data => {

    C2CRoom.find({ $or: [{ username1: data.username, username2: data.kisiUsername }, { username1: data.kisiUsername, username2: data.username }] }, function (err, response) {

      socket.emit("C2CMesajlari", response)
    })

  })

  socket.on("odadanAyril", data => {

    socket.leave(data.roomName);

    odadakiler = odadakiler.filter(function (e) {
      return e.username != data.username;
    });
    var a = odadakiler.filter(x => x.roomName === data.roomName);
    io.to(data.roomName).emit('odayaYeniGelenMesaj', { username: "Admin", msg: "Kullanıcı odadan çıktı", time: moment().format('LT'), users: a });

  })



  socket.on("disconnect", () => {
    kisiler = kisiler.filter(function (e) {
      return e.socketID != socket.id;
    });
  })
})


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});

