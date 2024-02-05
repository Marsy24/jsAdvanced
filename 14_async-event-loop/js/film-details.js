import { createContainer } from "./createContainer.js";
import { renderDetailLi } from "./render.js";

export async function render(data, app = null) {
  const result = data.result,
        container = createContainer('50%'),
        backButton = document.createElement('a'),
        title = document.createElement('h1'),
        descr = document.createElement('p'),
        wrapLists = document.createElement('div'),
        planets = document.createElement('div'),
        planetsTitle = document.createElement('h2'),
        planetList = document.createElement('ul'),
        species = document.createElement('div'),
        speciesTitle = document.createElement('h2'),
        speciesList = document.createElement('ul');

  backButton.href = location.pathname;
  backButton.textContent = 'Back To Episodes';
  backButton.style.position = 'absolute';
  backButton.style.left = '15px';
  backButton.style.top = '-10px';

  title.innerHTML = `
    Detail info about film: '${result.properties.title}'
    <br>
    Episode: ${result.properties['episode_id']}
  `


  descr.textContent = result.properties['opening_crawl'];
  wrapLists.style.display = 'flex';
  wrapLists.style.flexDirection = 'row';
  wrapLists.style.justifyContent = 'space-between';
  wrapLists.style.flexWrap = 'wrap';
  planetsTitle.textContent = 'Planets';
  speciesTitle.textContent = 'Species';

  const srcs = [
    result.properties.planets, result.properties.species
  ]
  const containers = [
    planetList, speciesList
  ]

  const dataLi = [
    {
      properties: {
        src: result.properties.planets,
        container: planetList
      }
    },
    {
      properties: {
        src: result.properties.species,
        container: speciesList
      }
    }
  ]

  await renderDetailLi(dataLi, app.cssPromises)

  for (let i = 0; i < srcs.length; i++) {
    //renderDetailLi(srcs[i], containers[i]);
    containers[i].classList.add('list-group', 'list-group-horizontal');
    containers[i].style.flexDirection = 'row';
    containers[i].style.flexWrap = 'wrap';
  }

  backButton.addEventListener('click', async (event) => {
    event.preventDefault();
    history.pushState(null, "", location.pathname);
    await app.render(app.renderList, app.cssPromises, app);

  })

  planets.append(planetsTitle, planetList);
  species.append(speciesTitle, speciesList);
  wrapLists.append(planets, species);
  container.append(backButton, title, descr, wrapLists);

  return container;
}
