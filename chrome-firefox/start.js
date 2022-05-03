const getServices = (query, imdbID) => [
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
    name: "Nyaa",
    url: `https://nyaa.si/?f=0&c=0_0&q=${query}`,
    icon: "https://nyaa.si/static/favicon.png",
  },
  {
    name: "YouTube",
    url: `https://www.youtube.com/results?search_query=${query}`,
    icon: "https://www.youtube.com/favicon.ico",
  },
];

const getImdbID = () => {
  const url = document.querySelector(".micro-button")?.href;
  return url.split("/")[4];
};

// disables the script the hides the panel
const preload = () => {
  const idk = document.querySelector(
    "#js-poster-col > div.js-csi.js-hide-in-app"
  );

  if (idk) idk.className = "";
  else setTimeout(test, 15);
};

const addService = (service) => {
  const services = document.querySelector(".services");

  services.innerHTML += `
		<p class="service">
		<a href="${service.url}" target="_blank" class="label">
				<span class="brand">
						<img src="${service.icon}" width="20" height="20">
				</span>
				<span class="title">
						${service.name}
				</span>
		</a>
	</p>
	`;
};

const hideOther = () => {
  document.querySelector(".services").innerHTML = "";

  document.querySelectorAll(".other").forEach((a) => {
    a.remove(); // removes every element with the class 'other'
  });
};

const getQuery = () => {
  const header = document.getElementById("featured-film-header");
  const title = header?.querySelector("h1")?.innerText;
  const year = header?.querySelector("p > small > a")?.innerText;
  return `${title} ${year || ""}`;
};

const init = () => {
  const styleString = `
  .watch-panel .services .service {
    display: flex !important; 
  }
`;

  const style = document.createElement("style");
  style.textContent = styleString;
  document.head.append(style);
};

const insertServices = () => {
  hideOther();
  const query = getQuery();
  const imdbID = getImdbID();
  const services = getServices(query, imdbID);
  init();

  for (const service of services) {
    addService(service);
  }
};

const main = () => {
  const watchDiv = document?.getElementById("watch");
  const servicesPanel = watchDiv?.querySelector(".services");

  if (!servicesPanel) {
    var section = document.createElement("SECTION");
    section.classList.add("services");
    watchDiv.append(section);
  }
  insertServices();
};

preload();

window.onload = () => {
  main();
};
