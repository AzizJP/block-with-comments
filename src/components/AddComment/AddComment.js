export class AddComment {
  constructor(commentList, handleAddComment, addCommentButtonSelector) {
    this._commentList = commentList;
    this._isOpen = false;
    this._comment = {};
    this._isAdded = false;
    this._handleAddComment = handleAddComment;
    this._addCommentButton = document.querySelector(`.${addCommentButtonSelector}`);
  }

  renderForm = ({
    formSelector,
    formWrapperSelector,
    inputId,
    textareaId,
    dateInputId,
    submitButtonId,
    cancelButtonId,
  }) => {
    this._formWrapper = document.querySelector(`.${formWrapperSelector}`);
    this._form = this._formWrapper.querySelector(`.${formSelector}`);
    this._submitButton = this._formWrapper.querySelector(`#${submitButtonId}`);
    this._cancelButton = this._formWrapper.querySelector(`#${cancelButtonId}`);

    this._formName = document.querySelector(`#${inputId}`);
    this._formText = document.querySelector(`#${textareaId}`);
    this._formDate = document.querySelector(`#${dateInputId}`);

    this._setEventListeners();
  };

  _openPopup = () => {
    this._isOpen = true;
    this._formWrapper.style.display = 'flex';
  };

  _closePopup = () => {
    this._formName.value = '';
    this._formText.value = '';
    this._formDate.value = '';

    this._isOpen = false;
    this._formWrapper.style.display = 'none';
  };

  addComment = () => {
    this._comment.userName = this._formName.value;
    this._comment.text = this._formText.value;
    this._comment.date = this._formDate.valueAsNumber
      ? new Date(this._formDate.valueAsNumber - 10800000).toLocaleString().slice(0, 17)
      : new Date().toLocaleString().slice(0, 17);
    this._comment.isLiked = false;

    this._commentList.push(this._comment);
    this._closePopup();
  };

  _closeByEsc = evt => {
    if (this._isOpen) {
      if (evt.key === 'Escape') this._closePopup();
    }
  };

  _handleSubmit = evt => {
    evt.preventDefault();
    this._handleAddComment();
  };

  _setEventListeners = () => {
    this._form.addEventListener('submit', this._handleSubmit);
    document.addEventListener('keydown', this._closeByEsc);
    this._addCommentButton.addEventListener('click', this._openPopup);
    this._cancelButton.addEventListener('click', this._closePopup);
  };
}
