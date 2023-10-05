const list = document.querySelector('#list-items');
const input = document.querySelector('#input-name');
const btnAdd = document.querySelector('#btn-add');
const form = document.querySelector('footer form');

function checkListEmpty() {
  const noDataText = document.querySelector('#no-data');
  if (list.children.length === 0) {
    noDataText.style.display = 'flex';
    list.style.display = 'none';
  } else {
    noDataText.style.display = 'none';
    list.style.display = 'block';
  }
}

function addItem() {
  if (input.value !== '') {
    createListItem(input.value);
    resetInput();
    checkListEmpty();
  } else {
    alert('제품명을 입력하세요.');
    resetInput();
  }
}

function resetInput() {
  input.value = '';
  input.focus();
}

let id = 0;
function createListItem(value) {
  const listItem = document.createElement('li');
  listItem.setAttribute('data-id', id);
  listItem.innerHTML = `
      <strong>${value}</strong>
      <button class="btn-del"><span class="material-icons" data-id=${id}>remove_circle_outline</span></button>
  `;
  id++;
  list.append(listItem);
  listItem.scrollIntoView({ block: 'center' });
}

list.addEventListener('click', (e) => {
  const isBtnDel = e.target.parentNode.classList.contains('btn-del') && e.target.dataset.id;
  if (isBtnDel) {
    const toBeDeleted = document.querySelector(`li[data-id="${e.target.dataset.id}"]`);
    toBeDeleted.remove();
    checkListEmpty();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault(); // 새로고침 방지
  addItem();
  // isComposing도, key어쩌고, 엔터어쩌고도 할필요가 없음
});
// window.addEventListener('load', () => {
//   input.addEventListener('keydown', function (e) {
//     if (e.isComposing) {
//       return;
//     }
//     if (e.key === 'Enter') {
//       // || e.keyCode === 13
//       e.preventDefault();
//       btnAdd.click(); // trigger
//     }
//   });
//   btnAdd.addEventListener('click', () => {
//     addItem();
//   });
// });
