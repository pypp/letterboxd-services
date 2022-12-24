const getImdbID = () => {
  const url = document.querySelector(".micro-button")?.href;
  return url.split("/")[4];
};

const getQuery = () => {
  const header = document.getElementById("featured-film-header");
  const title = header?.querySelector("h1")?.innerText;
  const year = header?.querySelector("p > small > a")?.innerText;
  return `${title} ${year || ""}`;
};

const getFilmData = () => {
  return { query: getQuery(), imdbID: getImdbID() };
};

const createServiceIcon = (src) => {
  const image = document.createElement("img");
  image.src = src;
  image.width = 20;
  image.height = 20;
  return image;
};

const createServiceBrand = (iconSrc) => {
  const icon = createServiceIcon(iconSrc);
  const brand = document.createElement("span");
  brand.className = "brand";
  brand.append(icon);
  return brand;
};

const createServiceLink = (serviceURL) => {
  const a = document.createElement("a");
  a.setAttribute("target", "_blank");
  a.href = serviceURL;
  a.className = "label";
  return a;
};

/**
 * Creates a correct solarmovie link. To do this, 
 * runs the query on the solarmovie service and then extract the first result
 * in the list and returns the link to the film
 * @param {String} serviceURL The complete query url to Solarmovie service
 * @return {String} 
 */
const createSolarmovieLink = (serviceURL) => {
  // Get back the result page of the Solarmovie query
  const resultPage = fetch(serviceURL)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return doc;
    });
  // Extract the first element with class="flw-item"
  const firstResult = resultPage.querySelector(".flw-item");
  // Within that extract the element with class="film-poster"
  const filmPoster = firstResult.querySelector(".film-poster");
  // Within that extract the href attribute
  const filmURL = filmPoster.getAttribute("href");

  const a = document.createElement("a");
  a.setAttribute("target", "_blank");
  a.href = filmURL;
  a.className = "label";
  return a;
}

const createServiceTitle = (serviceName) => {
  const title = document.createElement("span");
  title.className = "title";
  title.innerText = serviceName;
  return title;
};

/**
 * Adds a service to the services section
 * @param {*} serviceData The service data object
 */
const addService = (serviceData) => {
  const services = document.querySelector(".services");
  const { name, url, icon } = serviceData;

  const brand = createServiceBrand(icon);
  const title = createServiceTitle(name);

  // If name is 'Solarmovie' run the createSolarmovieLink function
  if (name === "Solarmovie") {
    const link = createSolarmovieLink(url);
  }
  else {
    const link = createServiceLink(url);
  }

  const p = document.createElement("p");
  p.className = "service";

  link.append(brand);
  link.append(title);
  p.append(link);
  services.append(p);
};

const initStyle = () => {
  const style = document.createElement("style");
  style.textContent = `.services > .service {display: flex !important;}`;
  document.head.append(style);
};

const clearWatchDiv = () => {
  document.getElementById("watch").innerHTML = "";
};

const createServicesSection = () => {
  const watchDiv = document.getElementById("watch");
  const section = document.createElement("section");
  section.classList.add("services");
  watchDiv.append(section);
};

const main = () => {
  const { query, imdbID } = getFilmData();
  const services = globalThis.getServices(query, imdbID);
  for (const service of services) addService(service);
};

window.onload = () => {
  initStyle();
  clearWatchDiv();
  createServicesSection();
  main();
};
