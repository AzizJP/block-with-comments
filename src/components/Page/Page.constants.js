export const postHeaderSelectors = {
  createdId: 'date-created',
  updatedId: 'date-updated',
  viewedId: 'viewed',
};

export const commentContainerSelector = '.comments';
export const promptSelector = 'post__prompt';
export const addCommentButtonSelector = 'add-comment__button';

export const ratingSelectors = {
  reatingSelector: 'post__rating',
  incrementId: 'rating-increment',
  decrementId: 'rating-decrement',
  counterSelector: 'post__rating_counter',
};

export const templateSelectors = {
  templateId: 'comments',
  cloneSelector: 'comment',
};

export const formSelectors = {
  formSelector: 'form',
  formWrapperSelector: 'form__wrapper',
  inputId: 'user-name',
  inputErrorId: 'user-error',
  textareaId: 'comment-text',
  textareaErrorId: 'text-error',
  dateInputId: 'comment-date',
  submitButtonId: 'submit-button',
  cancelButtonId: 'cancel-button',
};

export const commentSelectors = {
  nameSelector: 'comment__user-name',
  textSelector: 'comment__user-text',
  dateSelector: 'comment__info-date',
  trashButtonId: 'trash',
  likeButtonId: 'like',
};
