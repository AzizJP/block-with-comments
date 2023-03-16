import { Post } from '../Post/Post';
import { postInfo, ratingElements } from '../Post/Post.constants';

import { Comments } from '../Comments/Comments';
import { Comment } from '../Comment/Comment';
import { commentsList } from '../Comments/Comments.constants';
import { AddComment } from '../AddComment/AddComment';
import { doValidDate } from '../Comment/Comment.helpers';
import { Validator } from '../Validator/Validator';
import {
  addCommentButtonSelector,
  commentContainerSelector,
  commentSelectors,
  formSelectors,
  postHeaderSelectors,
  promptSelector,
  ratingSelectors,
  templateSelectors,
} from './Page.constants';

const postElement = new Post(postInfo, ratingElements, promptSelector, ratingSelectors);
postElement.renderPostInfo(postHeaderSelectors);

const createComment = comment => {
  const createComment = new Comment(comment, templateSelectors);
  return createComment.generateComment(commentSelectors);
};

const commentContainer = new Comments({ renderer: createComment }, commentContainerSelector);

const newSortedList = commentsList.sort(
  (a, b) => new Date(doValidDate(a.date)) - new Date(doValidDate(b.date)),
);
commentContainer.renderComments(newSortedList);

const addCommentForm = new AddComment(
  commentsList,
  () => handleAddComment(),
  addCommentButtonSelector,
);
addCommentForm.renderForm(formSelectors);

const validator = new Validator();

const handleAddComment = () => {
  if (validator.enableValidation(formSelectors)) {
    addCommentForm.addComment();
    const newArr = [...commentsList].slice(commentsList.length - 1);
    commentContainer.renderComments(newArr);
  }
};
