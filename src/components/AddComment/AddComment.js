export class AddComment {
  constructor(commentList) {
    this._commentList = commentList;
    this._isOpen = false;
    this._comment = {};
    this._isAdded = false;
  }

  renderForm = () => {
    this._addCommentButton = document.querySelector(
      '.add-comment__button',
    );
    this._formWrapper = document.querySelector('.form__wrapper');
    this._form = this._formWrapper.querySelector('.form');
    this._submitButton =
      this._formWrapper.querySelector('#submit-button');
    this._cancelButton =
      this._formWrapper.querySelector('#cancel-button');

    this._formName = document.querySelector('.form__user-name');
    this._formText = document.querySelector('.form__text');
    this._formDate = document.querySelector('.form__date');

    this._setEventListeners();
  };

  _openPopup = () => {
    this._isOpen = true;
    this._formWrapper.style.display = 'flex';
  };

  _closePopup = evt => {
    evt.preventDefault();

    this._formName.value = '';
    this._formText.value = '';
    this._formDate.value = '';

    this._isOpen = false;
    this._formWrapper.style.display = 'none';
  };

  addComment = evt => {
    evt.preventDefault();

    this._comment.userName = this._formName.value;
    this._comment.text = this._formText.value;
    this._comment.date = this._formDate.valueAsNumber
      ? new Date(this._formDate.valueAsNumber - 10800000)
          .toLocaleString()
          .slice(0, 17)
      : new Date().toLocaleString().slice(0, 17);
    this._comment.isLiked = false;

    console.log(this._comment);

    this._commentList.push(this._comment);
    this._closePopup(evt);
  };

  _closeByEsc = evt => {
    if (this._isOpen) {
      if (evt.key === 'Escape') this._closePopup(evt);
    }
  };

  _setEventListeners = () => {
    document.addEventListener('keydown', evt =>
      this._closeByEsc(evt),
    );
    this._addCommentButton.addEventListener('click', this._openPopup);
    this._cancelButton.addEventListener('click', this._closePopup);
  };
}
