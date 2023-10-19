'use strict';

export default class Toast {
  constructor() {
    this.body = document.querySelector('#toast');
    this.text = document.querySelector('#toast .text');
    this.btnReplay = document.querySelector('#toast #btn-replay');
    this.btnReplay.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  onClickBtnReplay(callback) {
    this.onClick = callback;
  }
  show(text) {
    this.body.style.visibility = 'visible';
    this.text.textContent = text;
  }
  hide() {
    this.body.style.visibility = 'hidden';
  }
}
