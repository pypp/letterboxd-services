/**
 * @typedef {Object} ServiceData
 * @property {string} name - The service's name.
 * @property {string} url - The service's search URL.
 * @property {string} icon - The service's icon URL.
 */

/**
 * Parse the page for the film's IMDb ID
 *
 * @returns {string} IMDb ID
 */
const getImdbID = () => {
  const url = document.querySelector(".micro-button")?.href;
  return url.split("/")[4];
};

/**
 * Parse the page for the film's title and release year
 *
 * @returns {string} film's query
 */
const getQuery = () => {
  const details = document.querySelector(".details");
  const title = details?.querySelector(".name")?.innerText;
  const year = details?.querySelector(".releaseyear > a")?.innerText;
  return `${title ?? ""} ${year ?? ""}`;
};

/**
 * Creates an image element for the service icon
 *
 * @param {string} iconURL
 * @returns {HTMLImageElement} service's icon element
 */
const createServiceIcon = (iconURL) => {
  const image = document.createElement("img");
  image.src = iconURL;
  image.width = 20;
  image.height = 20;
  return image;
};

/**
 * Create a service brand element
 *
 * @param {string} iconURL
 * @returns {HTMLSpanElement} service's brand element
 */
const createServiceBrand = (iconURL) => {
  const icon = createServiceIcon(iconURL);
  const brand = document.createElement("span");
  brand.className = "brand";
  brand.append(icon);
  return brand;
};

/**
 * Returns an anchor element with the service's URL
 *
 * @param {string} service's URL
 * @returns {HTMLAnchorElement} service's anchor element
 */
const createServiceLink = (serviceURL) => {
  const a = document.createElement("a");
  a.setAttribute("target", "_blank");
  a.href = serviceURL;
  a.className = "label";
  return a;
};

/**
 * Returns a span element with the service's name
 *
 * @param {string} service's Name
 * @returns {HTMLSpanElement} service's span element
 */
const createServiceTitleSpan = (serviceName) => {
  const title = document.createElement("span");
  title.className = "title";
  title.innerText = serviceName;
  return title;
};

/**
 * Adds a service to the services section
 *
 * @param {ServiceData} serviceData
 */
const addService = (serviceData) => {
  const services = document.querySelector(".services");
  const { name, url, icon } = serviceData;

  const brand = createServiceBrand(icon);
  const title = createServiceTitleSpan(name);
  const serviceURL = createServiceLink(url);
  serviceURL.append(brand, title);

  const p = document.createElement("p");
  p.append(serviceURL);
  p.className = "service";

  services.append(p);
};

/**
 * Initialize the page to remove the unwanted content and add custom styles
 */
const initPage = () => {
  const style = document.createElement("style");
  style.textContent = `.services > .service {display: flex !important;}`;
  document.head.append(style);

  const section = document.createElement("section");
  section.classList.add("services");
  document.getElementById("watch").replaceWith(section);
};

window.onload = () => {
  initPage();

  const query = getQuery();
  const imdbId = getImdbID();

  const services = globalThis.getServices(query, imdbId);
  for (const service of services) {
    addService(service);
  }
};
