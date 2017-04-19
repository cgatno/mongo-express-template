import mongoose from 'mongoose';

import PostModel from './Post';
import UserModel from './User';

// Set the Mongoose Promise library here so we can use Promises in models and Express routes
mongoose.Promise = global.Promise;

export const Post = PostModel;
export const User = UserModel;
