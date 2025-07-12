import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  content: { type: String, required: true }, // Rich text (HTML)
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isAccepted: { type: Boolean, default: false },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const Answer = mongoose.model('Answer', answerSchema);
export default Answer;
