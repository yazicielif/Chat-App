var mongoose = require('mongoose');
var C2CRoomSchema = new mongoose.Schema({

    
  msg: {
    type: String,
    required: true,
  
  },
  username1: {
    type: String,
    required: true,
    trim: true
  },
  username2: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: String,
    required: true,
 },

});
var C2CRoom = mongoose.model('C2CRoom', C2CRoomSchema);
module.exports = C2CRoom;