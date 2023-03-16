import { doValidDate } from './Comment.helpers';

export class Comment {
  constructor({ userName, text, date, isLiked }, { templateId, cloneSelector }) {
    this._userName = userName;
    this._text = text;
    this._date = date;
    this._isLiked = isLiked;
    this._templateId = templateId;
    this._cloneSelector = cloneSelector;
  }

  _getCommentTemplate = () => {
    const commentElement = document
      .querySelector(`#${this._templateId}`)
      .content.querySelector(`.${this._cloneSelector}`)
      .cloneNode(true);
    return commentElement;
  };

  generateComment = ({ nameSelector, textSelector, dateSelector, trashButtonId, likeButtonId }) => {
    this._commentElement = this._getCommentTemplate();
    this._userNameElement = this._commentElement.querySelector(`.${nameSelector}`);
    this._userTextElement = this._commentElement.querySelector(`.${textSelector}`);
    this._commentDateElement = this._commentElement.querySelector(`.${dateSelector}`);
    this._trashButtonElement = this._commentElement.querySelector(`#${trashButtonId}`);
    this._likeButtonElement = this._commentElement.querySelector(`#${likeButtonId}`);

    const today = new Date();
    const newDate = this._date;

    const lessThanDay = today.getDate() === new Date(doValidDate(newDate)).getDate();
    const lessThanTwoDay = today.getDate() - new Date(doValidDate(newDate)).getDate() === 1;
    const toFuture = today - new Date(doValidDate(newDate)) < 0;

    this._userNameElement.textContent = this._userName;
    this._userTextElement.textContent = this._text;

    if (toFuture) {
      this._commentDateElement.textContent = `прыжок в будущее - в ${this._date.slice(
        0,
        11,
      )} ${this._date.slice(11)}`;
    } else if (lessThanDay) {
      this._commentDateElement.textContent = `сегодня, в ${this._date.slice(11)}`;
    } else if (lessThanTwoDay) {
      this._commentDateElement.textContent = `вчера, в ${this._date.slice(11)}`;
    } else if (!this._date.slice(11)) {
      this._commentDateElement.textContent = this._date;
    } else {
      this._commentDateElement.textContent = `${this._date.slice(0, 11)} в ${this._date.slice(11)}`;
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
    this._likeButtonElement.addEventListener('click', () =>
      this._handleLikeClick(this._likeButtonElement),
    );
    this._trashButtonElement.addEventListener('click', () =>
      this._handleTrashClick(this._commentElement),
    );
  };
}
