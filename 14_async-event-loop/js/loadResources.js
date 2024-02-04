export function loadResource(src, cssPromises) {
  if (src.endsWith('.js')) {
    return import(src);
  } // JS module

  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
          link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }

    return cssPromises[src];
  } // css file

  return fetch(src).then(res => res.json()); // data from server
}
