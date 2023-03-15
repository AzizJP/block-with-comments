import { doValidDate } from './Comment.helpers';

export class Comment {
  constructor({ userName, text, date, isLiked }) {
    this._userName = userName;
    this._text = text;
    this._date = date;
    this._isLiked = isLiked;
  }

  _getCommentTemplate = () => {
    const commentElement = document
      .querySelector('#comments')
      .content.querySelector('.comment')
      .cloneNode(true);
    return commentElement;
  };

  generateComment = () => {
    this._commentElement = this._getCommentTemplate();
    this._userNameElement = this._commentElement.querySelector(
      '.comment__user-name',
    );
    this._userTextElement = this._commentElement.querySelector(
      '.comment__user-text',
    );
    this._commentDateElement = this._commentElement.querySelector(
      '.comment__info-date',
    );
    const today = new Date();
    const newDate = this._date;

    const lessThanDay =
      today - new Date(doValidDate(newDate)) < 24 * 60 * 60 * 1000;
    const lessThanTwoDay =
      today - new Date(doValidDate(newDate)) < 48 * 60 * 60 * 1000;
    const toFuture = today - new Date(doValidDate(newDate)) < 0;

    this._userNameElement.textContent = this._userName;
    this._userTextElement.textContent = this._text;

    if (toFuture) {
      this._commentDateElement.textContent = `прыжок в будущее - в ${this._date.slice(
        0,
        11,
      )} ${this._date.slice(11)}`;
    } else if (lessThanDay) {
      this._commentDateElement.textContent = `сегодня, в ${this._date.slice(
        11,
      )}`;
    } else if (lessThanTwoDay) {
      this._commentDateElement.textContent = `вчера, в ${this._date.slice(
        11,
      )}`;
    } else if (!this._date.slice(11)) {
      this._commentDateElement.textContent = this._date;
    } else {
      this._commentDateElement.textContent = `${this._date.slice(
        0,
        11,
      )} в ${this._date.slice(11)}`;
    }

    this._setEventListeners();

    return this._commentElement;
  };

  _handleLikeClick = likeElement => {
    if (this._isLiked) {
      likeElement.classList.remove('comment__button_liked');
      likeElement.classList.add('comment__button_like');
      this._isLiked = false;
    } else {
      likeElement.classList.remove('comment__button_like');
      likeElement.classList.add('comment__button_liked');
      this._isLiked = true;
    }
  };

  _handleTrashClick = commentElement => {
    commentElement.remove();
  };

  _setEventListeners = () => {
    this._trashButtonElement =
      this._commentElement.querySelector('#trash');
    this._likeButtonElement =
      this._commentElement.querySelector('#like');

    this._likeButtonElement.addEventListener('click', () =>
      this._handleLikeClick(this._likeButtonElement),
    );
    this._trashButtonElement.addEventListener('click', () =>
      this._handleTrashClick(this._commentElement),
    );
  };
}
