import { App } from "./app.js";

const app = new App();

app.episodeId ?
  app.render(app.renderDetails, app.cssPromises, app) : app.render(app.renderList, app.cssPromises, app);

