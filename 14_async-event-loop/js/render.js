import { loadResource } from './loadResources.js'

export function renderPage(renderData, promises, app) {
  Promise.all(renderData.map(src => loadResource(src, promises)))
  .then(([pageModule, data]) => {
    document.getElementById('app').innerHTML = '';
    document.getElementById('app').append(pageModule.render(data, app));
  });
}

export function renderDetailLi(renderData, container) {
  Promise.all(renderData.map(src => loadResource(src)))
  .then(data => {
    data.forEach(obj => {
      container.innerHTML += `<li class="list-group-item" style="width: 150px; border-radius: 5px; border-left-width: 1px">${obj.result.properties.name}</li>`;
    })
  })
}
