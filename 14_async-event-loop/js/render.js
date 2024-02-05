import { loadResource } from './loadResources.js'

export async function renderPage(renderData, promises, app) {
  await Promise.all(renderData.map(src => loadResource(src, promises)))
  .then(async ([pageModule, data]) => {
    document.getElementById('app').innerHTML = '';
    document.getElementById('app').append(await pageModule.render(data, app));
  });
}

export async function renderDetailLi(renderData, promises) {
  const srcs = []
  renderData.map(item => {
    item.properties.src.map(src => {
      srcs.push(src);
    });
  })

  await Promise.all(srcs.map(async (src) => {
    return await loadResource(src, promises)
  })).then(res => {
    res.forEach(res => {
      renderData.map(item => {
        item.properties.src.forEach(src => {
          if (src === res.result.properties.url) res.container = item.properties.container
        })
      })
    })
    return res
  }).then(data => {
    data.map(item => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.style.width = '150px';
      li.style.borderRadius = '5px';
      li.style.borderLeftWidth = '1px';
      li.textContent = item.result.properties.name;
      item.container.append(li);
    })
  })
}
