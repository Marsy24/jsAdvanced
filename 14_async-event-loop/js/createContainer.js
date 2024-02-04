export function createContainer(top) {
  const container = document.createElement('div');
  container.style.position = 'fixed'
  container.style.left = '50%';
  container.style.top = top;
  container.style.transform = 'translate(-50%, -50%)'
  container.classList.add(
    'container',
    'd-flex',
    'justify-content-beetwen',
    'flex-wrap',
    'py-4'
  )

  return container;
}
