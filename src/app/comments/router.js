import { Router } from 'express';
const routerComment = Router();

import * as controllerComment from '$server/app/comments/controller';

routerComment.post('/comments', controllerComment.createComment);
routerComment.get('/comments/:itineraryId', controllerComment.readCommentsByItineraryId);
routerComment.put('/coments/:commentId', controllerComment.updateCommentByCommentId);
routerComment.delete('/comments/:commentId', controllerComment.deleteCommentByCommentId);

export default routerComment;
