import { changeWordEnding } from './Post.helpers';

export class Post {
  constructor(postInfo, ratingElements) {
    this._postInfo = postInfo;
    this._ratingElements = ratingElements;
  }

  _timePassedSince = stringDate => {
    this._initialDate = new Date(stringDate);
    this._dateNow = new Date();
    this._dateDifference = Math.abs(
      this._dateNow.getTime() - this._initialDate.getTime(),
    );
    this._diffDays = Math.ceil(
      this._dateDifference / (1000 * 3600 * 24),
    );
    this._yearsPassed = Math.floor(this._diffDays / 360);
    this._monthsPassed = Math.floor((this._diffDays % 360) / 30);
    this._daysPassed = (this._diffDays % 360) % 30;

    this._years = changeWordEnding(
      this._yearsPassed,
      'год',
      'года',
      'лет',
    );
    this._months = changeWordEnding(
      this._monthsPassed,
      'месяц',
      'месяца',
      'месяцев',
    );
    this._days = changeWordEnding(
      this._daysPassed,
      'день',
      'дня',
      'дней',
    );

    if (this._yearsPassed === 0 && this._monthsPassed === 0) {
      return `${this._daysPassed} ${this._days} назад`;
    }
    if (this._yearsPassed === 0) {
      return `${this._monthsPassed} ${this._months} ${this._daysPassed} ${this._days} назад`;
    }
    return `${this._yearsPassed} ${this._years} ${this._monthsPassed} ${this._months} ${this._daysPassed} ${this._days} назад`;
  };

  renderPostInfo = () => {
    this._dateCreatedElement =
      document.getElementById('date-created');
    this._dateUpdatedElement =
      document.getElementById('date-updated');
    this._viewedElement = document.getElementById('viewed');
    this._buttons = document.querySelector('.post__rating');
    this._countElement = this._buttons.querySelector(
      '.post__rating_counter',
    );

    this._dateCreatedElement.textContent = this._timePassedSince(
      this._postInfo.dateCreated,
    );
    this._dateUpdatedElement.textContent = this._timePassedSince(
      this._postInfo.dateUpdated,
    );
    this._viewedElement.textContent = `${this._postInfo.viewed} раз`;

    this._setEventListeners();
  };

  _handleRatingIncrement = () => {
    this._ratingElements.count++;
    this._countElement.textContent = this._ratingElements.count;
  };

  _handleRatingDecrement = () => {
    this._ratingElements.count--;
    this._countElement.textContent = this._ratingElements.count;
  };

  _addPrompt = event => {
    const displayWidth = document.body.clientWidth;

    if (displayWidth < 1024) return;
    const target = event.target;
    const coords = target.getBoundingClientRect();
    const promptHtml = target.dataset.prompt;
    if (!promptHtml) return;

    this._ratingElements.promptElement =
      document.createElement('div');
    this._ratingElements.promptElement.className = 'post__prompt';
    this._ratingElements.promptElement.innerHTML = promptHtml;
    this._buttons.append(this._ratingElements.promptElement);

    let left = coords.left + target.offsetWidth + 20;
    let top =
      coords.top -
      (this._ratingElements.promptElement.offsetHeight -
        target.offsetHeight) /
        2;
    if (top < 0) top = coords.top;

    this._ratingElements.promptElement.style.left = `${left}px`;
    this._ratingElements.promptElement.style.top = `${top}px`;
  };

  _deletePrompt = () => {
    if (this._ratingElements.promptElement) {
      this._ratingElements.promptElement.remove();
      this._ratingElements.promptElement = null;
    }
  };

  _setEventListeners = () => {
    this._incrementButtonElement = this._buttons.querySelector(
      '.post__button_increment',
    );
    this._decrementButtonElement = this._buttons.querySelector(
      '.post__button_decrement',
    );

    this._incrementButtonElement.onclick =
      this._handleRatingIncrement;
    this._decrementButtonElement.onclick =
      this._handleRatingDecrement;

    this._buttons.onmouseover = event => this._addPrompt(event);
    this._buttons.onmouseout = this._deletePrompt;
  };
}
