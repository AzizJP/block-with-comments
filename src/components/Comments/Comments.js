export class Comments {
  constructor({ renderer }, sectionSelector) {
    this._renderer = renderer;
    this._sectionSelector = sectionSelector;
    this._container = document.querySelector(this._sectionSelector);
  }

  addComment = comment => {
    this._container.prepend(this._renderer(comment));
  };

  renderComments = comments => {
    comments.forEach(comment => {
      this.addComment(comment);
    });
  };
}
