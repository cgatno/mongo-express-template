import mongoose from 'mongoose';

// Define the schema for a post
// TODO: Incorporate this with markdown - it'll make it easier to write posts!

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    description: 'The post\'s title.',
  },
  body: {
    type: String,
    description: 'The post\'s content body.',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Initialize the actual model using Mongoose

export default mongoose.model('Post', PostSchema);
