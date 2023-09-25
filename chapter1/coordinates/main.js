const target = document.querySelector('#target');
const lineX = document.querySelector('#line-x');
const lineY = document.querySelector('#line-y');

window.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  target.innerHTML = `(${x}px, ${y}px)`;
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  lineX.style.top = `${y}px`;
  lineY.style.left = `${x}px`;
});
