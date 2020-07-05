var mongoose = require('mongoose');
var generalRoomSchema = new mongoose.Schema({

    
  msg: {
    type: String,
    required: true,
  
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: String,
    required: true,
 },
 roomName: {
    type: String,
    required: true,
 }
});
var generalRoom = mongoose.model('generalRoom', generalRoomSchema);
module.exports = generalRoom;