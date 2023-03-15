import { Post } from '../Post/Post';
import { postInfo, ratingElements } from '../Post/Post.constants';

import { Comments } from '../Comments/Comments';
import { Comment } from '../Comment/Comment';
import { commentsList } from '../Comments/Comments.constants';
import { AddComment } from '../AddComment/AddComment';
import { doValidDate } from '../Comment/Comment.helpers';
import { Validator } from '../Validator/Validator';

const commentContainerSelector = '.comments';

const postElement = new Post(postInfo, ratingElements);
postElement.renderPostInfo();

const createComment = comment => {
  const createComment = new Comment(comment);
  return createComment.generateComment();
};

const commentContainer = new Comments(
  { renderer: createComment },
  commentContainerSelector,
);

const newSortedList = commentsList.sort(
  (a, b) =>
    new Date(doValidDate(a.date)) - new Date(doValidDate(b.date)),
);
commentContainer.renderComments(newSortedList);

const addCommentForm = new AddComment(commentsList);
addCommentForm.renderForm();

const validator = new Validator();

const handleAddComment = evt => {
  evt.preventDefault();
  if (validator.enableValidation()) {
    addCommentForm.addComment(evt);
    const newArr = [...commentsList].slice(commentsList.length - 1);
    commentContainer.renderComments(newArr);
  }
};

const formElement = document.querySelector('.form');

formElement.addEventListener('submit', handleAddComment);
