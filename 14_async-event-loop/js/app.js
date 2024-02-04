import { renderPage } from "./render.js";

export class App {
  constructor() {
    if (App.exists) return App.instance;

		App.instance = this;
		App.exists = true;
    this.searchParams = new URLSearchParams(location.search);
    this.episodeId = this.searchParams.get('episodeId');
    this.cssRender = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    this.cssPromises = {};
    this.renderDetails = [
      './film-details.js',
      `https://www.swapi.tech/api/films/${this.episodeId}`,
      this.cssRender
    ];
    this.renderList = [
      './film-list.js',
      `https://www.swapi.tech/api/films`,
      this.cssRender,
    ];
    this.render = renderPage;
  }
}