import { createContainer } from "./createContainer.js";
export async function render(data, app = null) {
  const films = data.result.sort((a, b) => {return parseInt(a.properties['episode_id']) - parseInt(b.properties['episode_id'])})

  const container = createContainer('30%');

  for (const film of films) {
    const filmCard = document.createElement('div'),
          cardBody = document.createElement('div'),
          title = document.createElement('h5'),
          subTitle = document.createElement('h6'),
          detailsButton = document.createElement('a'),
          style = document.createElement('style');

    filmCard.style.width = '18rem';
    filmCard.style.position = 'relative';
    filmCard.style.marginBottom = '15px';
    filmCard.classList.add('card');
    cardBody.classList.add('card-body');
    title.classList.add('card-title');
    subTitle.classList.add('card-subtitle', 'mb-2', 'text-body-secondary');
    detailsButton.classList.add('link');


    filmCard.append(cardBody);
    cardBody.append(title, subTitle, detailsButton);

    title.innerHTML = `Наименование фильма:<br> ${film.properties.title}`;
    subTitle.innerHTML = `Эпизод: ${film.properties['episode_id']}`;

    detailsButton.href = `?episodeId=${film.uid}`;

    style.innerHTML = `
      .link::before{content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;}
      .card:not(:last-of-type) {
          margin-right: 15px;
      }
    `

    detailsButton.addEventListener('click', async (event) => {
      event.preventDefault();

      history.pushState(null, '', `${location}?id=${film.uid}`);
      await app.render([
        './film-details.js',
        `https://www.swapi.tech/api/films/${film.uid}`,
        app.cssRender
      ], app.cssPromises, app);
    })

    document.head.append(style);

    container.append(filmCard);
  }

  return container;
}

