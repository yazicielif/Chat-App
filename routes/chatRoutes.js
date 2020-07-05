const mongoose = require('mongoose');
const User = require("../models/user");

module.exports = (app) => {
  app.post('/api/register', (req,res) => {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isAdmin: false
    }
    User.findOne({email: req.body.email})
    .then(user => {
      if(!user){
        bcrypt.hash(req.body.password, 10, (err,hash) => {
          userData.password = hash
          User.create(userData)
          .then(user => {
            res.json({status: user.email + ' registered!'})
          })
          .catch(err => {
            res.send('error: '+ err)
          })
        })
      }else{
        res.json({error: 'User already exists'})
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
   });


   app.post('/api/login', (req,res) => {
   console.log('İstek Geliyor')
    User.findOne({username: req.body.username})
    .then(user => {
      if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
          res.send({success:true})
        }else{
          res.send('error')
        }
      }else{
        res.json({error: 'Böyle bir kullanıcı yok'})
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
   });
  
}