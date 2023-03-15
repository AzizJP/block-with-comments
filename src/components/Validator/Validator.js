export class Validator {
  constructor() {}

  _showInputError = inputElement => {
    const errorElement = inputElement.nextSibling.nextSibling;
    errorElement.style.display = 'inline';
    errorElement.textContent = inputElement.validationMessage;
  };

  _deleteInputError = inputElement => {
    const errorElement = inputElement.nextSibling.nextSibling;
    errorElement.style.display = 'none';
    errorElement.textContent = '';
  };

  _isValid = element => {
    return element.validity.valid;
  };

  _handleInputEvent = () => {
    this._deleteInputError(this._userName);

    this._userName.removeEventListener(
      'input',
      this._handleInputEvent,
    );
  };

  _handleTextareaEvent = () => {
    this._deleteInputError(this._text);

    this._text.removeEventListener(
      'input',
      this._handleTextareaEvent,
    );
  };

  enableValidation = () => {
    this._formElement = document.querySelector('.form');
    this._userName =
      this._formElement.querySelector(`.form__user-name`);
    this._text = this._formElement.querySelector(`.form__text`);

    if (!this._isValid(this._userName)) {
      this._showInputError(this._userName);
    }

    if (!this._isValid(this._text)) {
      this._showInputError(this._text);
    }

    this._setEventListeners();

    return this._isValid(this._userName) && this._isValid(this._text);
  };

  _setEventListeners = () => {
    this._userName.addEventListener('input', this._handleInputEvent);

    this._text.addEventListener('input', this._handleTextareaEvent);
  };
}
