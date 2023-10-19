'use strict';

export default class Field {
  constructor() {
    this.body = document.querySelector('#field');
    this.bodyRect = this.body.getBoundingClientRect();
    this.fieldHtml = '';
  }
  stop() {
    this.body.style.pointerEvents = 'none';
  }
  play() {
    this.body.style.pointerEvents = 'inherit';
  }
  addHtml(carrot, bug) {
    this.fieldHtml = '';
    this.iterateItems('carrot', carrot.count, carrot.size);
    this.iterateItems('bug', bug.count, bug.size);
    this.body.innerHTML = this.fieldHtml;
  }
  iterateItems(type, count, size) {
    for (let i = 0; i < count; i++) {
      const x = getRandomIntInclusive(0, this.bodyRect.width - size);
      const y = getRandomIntInclusive(0, this.bodyRect.height - size);
      this.fieldHtml =
        this.fieldHtml +
        `<div class="${type}" 
          style="left: ${x}px; top: ${y}px;"
        ></div>`;
    }
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
