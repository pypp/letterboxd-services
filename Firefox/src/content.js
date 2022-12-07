const getImdbID = () => {
  const url = document.querySelector(".micro-button")?.href;
  return url.split("/")[4];
};

const getQuery = () => {
  const header = document.getElementById("featured-film-header");
  const title_pretrim = header?.querySelector("h1")?.innerText;
  const title = title_pretrim.replace(/\s+/g, ' ').trim()
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
  console.log(query)
  const services = [
  {
    name: "Yify",
    url: `https://yts.mx/browse-movies/${query}`,
    icon: "https://yts.mx/assets/images/website/favicon.ico",
  },
  {
    name: "Rarbg",
    url: `https://rarbgtor.org/torrents.php?category=movies&search=${imdbID}`,
    icon: "https://rarbg.to/favicon.ico",
  },
  {
    name: "The Pirate Bay",
    url: `https://thepiratebay.org/search.php?q=${imdbID}&video=on`,
    icon: "https://thepiratebay.org/favicon.ico",
  },
  {
    name: "1337x",
    url: `https://www.1377x.to/search/${query}/1`,
    icon: "https://1337xto.to/images/favicon.ico",
  },
  {
    name: "Lime Torrents",
    url: `https://limetorrents.cyou/search.php?cat=201&q=${query}`,
    icon: "https://limetorrents.cyou/favicon.ico",
  },
  {
    name: "TorrentGalaxy",
    url: `https://torrentgalaxy.to/torrents.php?search=${imdbID}`,
    icon: "https://torrentgalaxy.to/common/favicon/favicon.ico",
  },
  {
    name: "Nyaa",
    url: `https://nyaa.si/?f=0&c=0_0&q=${query}`,
    icon: "https://nyaa.si/static/favicon.png",
  },
  {
    name: "YouTube",
    url: `https://www.youtube.com/results?search_query=${query}`,
    icon: "https://www.youtube.com/favicon.ico",
  }
];
  for (const service of services) addService(service);
};

window.onload = () => {
  initStyle();
  clearWatchDiv();
  createServicesSection();
  main();
};
