window.addEventListener('load', () => {
  const target = document.querySelector('#target');
  const targetRect = target.getBoundingClientRect();
  const targetHalfWidth = targetRect.width / 2;
  const targetHalfHeight = targetRect.height / 2;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const lineX = document.querySelector('#line-x');
  const lineY = document.querySelector('#line-y');

  target.style.margin = `-${targetHalfWidth}px 0 0 -${targetHalfHeight}px`;
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    target.innerHTML = `(${x}px, ${y}px)`;
    // target.style.left = `${x}px`;
    // target.style.top = `${y}px`;
    // lineX.style.top = `${y}px`;
    // lineY.style.left = `${x}px`;

    // 성능개선
    const moveX = x - centerX;
    const moveY = y - centerY;

    target.style.transform = `translate(${moveX}px, ${moveY}px)`;
    lineX.style.transform = `translateY(${moveY}px)`;
    lineY.style.transform = `translateX(${moveX}px)`;
  });
});
