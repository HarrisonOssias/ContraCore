const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  timeline: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      date: {
        start: Date,
        end: Date
      },
      title: String,
      cost: Number
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      commentText: String
    }
  ],
  title: String
});

module.exports = mongoose.model('project', ProjectSchema);
