import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // Rich text (HTML)
  tags: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);
export default Question;
