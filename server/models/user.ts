import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  first_name: String,
  last_name: String,
  phone: String,
  birthday: Date,
  //role: { type: Array, default: ['user'] }, // ['user', 'client', 'admin']
  role: String,
  social_network: [{ network: String, token: String }],
  location: [{ country: String, city: String, zip: String, street: String, coordinates: String}]
});

// Before saving the user, hash the password
userSchema.pre('save', function(next) {
  const user = this;
  // console.log('user: pre ', user);
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
  // if (user.role) { user.role = [user.role]; }
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

export default User;
