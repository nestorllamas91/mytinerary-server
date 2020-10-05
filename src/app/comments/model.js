import { model, Schema } from 'mongoose';

const commentShema = new Schema(
  {
    commentId: { type: Number, required: true, unique: true },
    itineraryId: { type: Number, required: true },
    userId: { type: Number, required: true },
    message: { type: String, required: true }
  },
  { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } }
);

const Comment = model('comments', commentShema);
export default Comment;
