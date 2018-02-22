var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  favoriteBook: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
})
//authenticate input against database documents
// statics adds methods directly to model
UserSchema.statics.authenticate = function(email, password, callback){
  //user is assumed to be a collection found?
  User.findOne({email: email})
    //perform search and call back to process
    .exec(function(error, user){
      if(error){
        return callback(error)
      }
      else if (!user){
        var err = new Error('User not found');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function(error, result){
        if(result ===true){
          return callback(null, user);
        }
        else{
          return callback();
        }
      })
    })
}
// hash password before saving it to database
UserSchema.pre('save', function(next){
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  })
})
var User = mongoose.model('User', UserSchema);

module.exports = User;
