const input = document.querySelector('#input-name');
const btnAdd = document.querySelector('#btn-add');
const list = document.querySelector('#list-items');
const noDataText = document.querySelector('#no-data');

// 리스트 체크
function checkListEmpty() {
  if (list.children.length === 0) {
    noDataText.style.display = 'flex';
  } else {
    noDataText.style.display = 'none';
  }
}

// 아이템 추가
function addItem() {
  if (input.value !== '') {
    const listItem = createListItem(input.value);
    list.append(listItem);
    listItem.scrollIntoView({ block: 'center' });
    input.value = '';
    input.focus();
    checkListEmpty();
  } else {
    alert('제품명을 입력하세요.');
    input.focus();
  }
}
function createListItem(value) {
  const listItem = document.createElement('li');
  const listItemName = document.createElement('strong');
  const listItemBtnDel = document.createElement('button');
  listItemBtnDel.setAttribute('class', 'btn-del');
  // listItemBtnDel.addEventListener('click', (e) => removeItem(e));
  // ellie
  listItemBtnDel.addEventListener('click', () => {
    list.removeChild(listItem);
  });
  listItemBtnDel.innerHTML = '<span class="material-icons">remove_circle_outline</span>';
  listItem.append(listItemName, listItemBtnDel);
  listItemName.textContent = value;
  return listItem;
}
// 아이템 삭제
function removeItem(e) {
  e.target.parentElement.parentElement.remove();
  checkListEmpty();
}

window.addEventListener('load', () => {
  input.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      // || e.keyCode === 13
      e.preventDefault();
      btnAdd.click(); // trigger
    }
  });
  btnAdd.addEventListener('click', () => {
    addItem();
  });
});
