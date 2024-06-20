const getImdbID = () => {
  const url = document.querySelector(".micro-button")?.href;
  return url.split("/")[4];
};

const getQuery = () => {
  const details = document.querySelector(".details")
  const title = details?.querySelector("h1")?.innerText;
  const year = details?.querySelector(".releaseyear > a")?.innerText;
  return `${title ?? ""} ${year ?? ""}`;
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

const craeteServiceLink = (serviceURL) => {
  const a = document.createElement("a");
  a.setAttribute("target", "_blank");
  a.href = serviceURL;
  a.className = "label";
  return a;
};

const createServiceTitle = (serviceName) => {
  const title = document.createElement("span");
  title.className = "title";
  title.innerText = serviceName;
  return title;
};

const addService = (serviceData) => {
  const services = document.querySelector(".services");
  const { name, url, icon } = serviceData;

  const brand = createServiceBrand(icon);
  const title = createServiceTitle(name);
  const a = craeteServiceLink(url);

  const p = document.createElement("p");
  p.className = "service";

  a.append(brand);
  a.append(title);
  p.append(a);
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
