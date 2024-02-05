import { App } from "./App.js";

const app = new App();

app.render(app.renderList, app.cssPromises, app);

window.addEventListener('popstate', () => {
  location.search ?
  app.render(['./film-details.js',
  `https://www.swapi.tech/api/films/${location.search.charAt(location.search.length - 1)}`,
  app.cssRender], app.cssPromises, app)
  :
  app.render(app.renderList, app.cssPromises, app)
})
