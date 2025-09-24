/**
 * Parse the page for the film's IMDb ID
 *
 * @returns {string} IMDb ID
 */
function getImdbID() {
  const url = document.querySelector(".micro-button")?.href;
  return url.split("/")[4];
}

/**
 * Parse the page for the film's title and release year
 *
 * @returns {string} film's query
 */
function getQuery() {
  const details = document.querySelector(".details");
  const title = details?.querySelector("h1")?.innerText;
  const year = details?.querySelector(".releaseyear > a")?.innerText;
  return `${title ?? ""} ${year ?? ""}`;
}

/**
 * Creates an image element for the service icon
 *
 * @param {string} iconURL
 * @returns {HTMLImageElement} service's icon element
 */
function createServiceIcon(iconURL) {
  const image = document.createElement("img");
  image.src = iconURL;
  image.width = 20;
  image.height = 20;
  return image;
}

/**
 * Create a service brand element
 *
 * @param {string} iconURL
 * @returns {HTMLSpanElement} service's brand element
 */
function createServiceBrand(iconURL) {
  const icon = createServiceIcon(iconURL);
  const brand = document.createElement("span");
  brand.className = "brand";
  brand.append(icon);
  return brand;
}

/**
 * Returns an anchor element with the service's URL
 *
 * @param {string} service's URL
 * @returns {HTMLAnchorElement} service's anchor element
 */
function createServiceLink(serviceURL) {
  const a = document.createElement("a");
  a.setAttribute("target", "_blank");
  a.href = serviceURL;
  a.className = "label";
  return a;
}

/**
 * Returns a span element with the service's name
 *
 * @param {string} service's Name
 * @returns {HTMLSpanElement} service's span element
 */
function createServiceTitleSpan(serviceName) {
  const title = document.createElement("span");
  title.className = "title";
  title.innerText = serviceName;
  return title;
}

/**
 * Adds a service to the services section
 *
 * @param {ServiceData} serviceData
 */
function addService({ name, url, icon }) {
  const services = document.querySelector("#watch .services");

  const brand = createServiceBrand(icon);
  const title = createServiceTitleSpan(name);
  const serviceURL = createServiceLink(url);
  serviceURL.append(brand, title);

  const p = document.createElement("p");
  p.append(serviceURL);
  p.className = "service";
  services.prepend(p);
}

function clearServices() {
  const services = document.querySelector("#watch .services");

  [...services.children].forEach((child) => {
    if (child.id) {
      services.removeChild(child);
    }
  });
}

/**
 * Initialize custom styles
 */
function initStyle() {
  const style = document.createElement("style");
  style.textContent = `.services > .service {display: flex !important;}`;
  document.head.append(style);
}

/**
 * Main function
 */
function main() {
  initStyle();
  const query = getQuery();
  const imdbId = getImdbID();
  const services = globalThis.getServices(query, imdbId);

  for (const service of services) {
    addService(service);
  }
}

/**
 * Waits for the services container to be available in the DOM
 * then initializes the extension
 */
function waitForAvailability() {
  if (window.__AVAILABILITY_INIT__) return;
  const container = document.querySelector("#watch .services");

  chrome.storage.local.get("serviceMode", (data) => {
    if (container) {
      window.__AVAILABILITY_INIT__ = true;

      if (data.serviceMode === "external") {
        clearServices();
      }
      if (data.serviceMode !== "disabled") {
        main();
      }
    } else {
      setTimeout(waitForAvailability, 500);
    }
  });
}

waitForAvailability();

// refresh page on mode change
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.serviceMode) {
    location.reload();
  }
});
