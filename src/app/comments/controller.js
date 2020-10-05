import Comment from '$server/app/comments/model';

import { HandlerResponseError } from '$server/app/_utils/http-responses/handlers';
import resStatuses from '$server/app/_utils/http-responses/statuses';
const path = __filename;

export async function createComment(req, res, next) {
  const origin = { functionName: 'createComment()', path };
  try {
    const itineraryId = Number(req.body.itineraryId);
    const userId = Number(req.body.userId);
    const message = req.body.message;
    const lastComment = await Comment.find({}).sort({ commentId: -1 }).limit(1);
    const commentId = lastComment.length !== 0 ? lastComment[0].commentId + 1 : 1;
    const newComment = new Comment({
      commentId,
      itineraryId,
      userId,
      message
    });
    const createdComment = await newComment.save();
    res.send({ createdComment });
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function readCommentsByItineraryId(req, res, next) {
  const origin = { functionName: 'readCommentsByItineraryId()', path };
  try {
    const itineraryId = Number(req.params.itineraryId);
    const readComments = await Comment.find({ itineraryId }).sort({ commentId: 1 });
    res.send({ readComments });
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function updateCommentByCommentId(req, res, next) {
  const origin = { functionName: 'updateCommentByCommentId()', path };
  try {
    const commentId = Number(req.params.commentId);
    const requestedComment = await Comment.findOne({ commentId });
    requestedComment.message = req.body.message;
    const updatedComment = await requestedComment.save();
    res.send({ updatedComment });
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteCommentByCommentId(req, res, next) {
  const origin = { functionName: 'deleteCommentByCommentId()', path };
  try {
    const commentId = Number(req.params.countryId);
    await Comment.deleteOne({ commentId });
    res.end();
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}
