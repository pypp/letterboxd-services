const getServices = (title) => [
  {
    name: "Yify",
    url: `https://yts.mx/browse-movies/${title}`,
    icon: "https://yts.mx/assets/images/website/favicon.ico",
  },
  {
    name: "Rarbg",
    url: `https://rarbgtor.org/torrents.php?category=movies&search=${title}`,
    icon: "https://rarbg.to/favicon.ico",
  },
  {
    name: "1337x",
    url: `https://www.1377x.to/search/${title}/1`,
    icon: "https://1337xto.to/images/favicon.ico",
  },
  {
    name: "Lime Torrents",
    url: `https://limetorrents.cyou/search.php?cat=201&q=${title}`,
    icon: "https://limetorrents.cyou/favicon.ico",
  },
  {
    name: "Nyaa",
    url: `https://nyaa.si/?f=0&c=0_0&q=${title}`,
    icon: "https://nyaa.si/static/favicon.png",
  },
  {
    name: "YouTube",
    url: `https://www.youtube.com/results?search_query=${title}`,
    icon: "https://www.youtube.com/favicon.ico",
  },
];

const addService = (service) => {
  const services = document.getElementsByClassName("services")[0];

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
  const servicesPanel = document.getElementsByClassName("services")[0];
  servicesPanel.innerHTML = ""; // removes services content
  document.querySelectorAll(".other").forEach((a) => {
    a.remove(); // removes every element with the class 'other'
  });
};

const getQuery = () => {
  const title = document.getElementsByClassName(
    "headline-1 js-widont prettify"
  )[0].innerText;

  const year = document
    .getElementsByClassName("number")[0]
    .getElementsByTagName("a")[0].innerText;

  return `${title} ${year}`;
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
  const services = getServices(query);
  init();

  for (const service of services) {
    addService(service);
  }
};

const main = () => {
  const interval = setInterval(() => {
    const watchDiv = document.getElementById("watch");

    if (watchDiv) {
      clearInterval(interval);
      const servicesPanel = watchDiv.getElementsByClassName("services")[0];

      if (!servicesPanel) {
        var section = document.createElement("SECTION");
        section.classList.add("services");
        watchDiv.append(section);
      }

      insertServices();
    }
  }, 100);

  setTimeout(() => clearInterval(interval), 7000);
};

main();
