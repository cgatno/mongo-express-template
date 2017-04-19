import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// Define the schema for User

const UserSchema = new mongoose.Schema({
  title: {
    type: String,
    description: 'The user\'s title.',
  },
  name: {
    type: String,
    description: 'The user\'s full name.',
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    description: 'The user\'s contact email which is also used for logging in.',
  },
  password: {
    type: String,
    description: 'The user\'s encrypted password.',
  },
  is_admin: {
    type: Boolean,
    required: true,
    default: false,
    description: 'Whether or not the user should have administrator rights.',
  },
});

// Generate relatively strong salts
const SALT_WORK_FACTOR = 10;

UserSchema.pre('save', function beforeSave(next) {
  const thisUser = this;
  // Only hash the password if it's been changed
  if (!thisUser.isModified('password')) return next();

  // Generate a new salt because we have the CPU power, BUT we have to do this synchronously to
  // avoid letting a user with an unhashed password slip through
  const hash = bcrypt.hashSync(thisUser.password, SALT_WORK_FACTOR);
  thisUser.password = hash;
  return next();
});

UserSchema.methods.comparePasswords = function _comparePasswords(checkPassword) {
  return bcrypt.compare(checkPassword, this.password).then();
};

// Initialize the actual model using Mongoose

export default mongoose.model('User', UserSchema);
