const getServices = (title) => {
  return [
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
      name: "YouTube",
      url: `https://www.youtube.com/results?search_query=${title}`,
      icon: "https://www.youtube.com/favicon.ico",
    },
  ];
};

const addService = (service) => {
  let services = document.getElementsByClassName("services")[0];

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
  let servicesPanel = document.getElementsByClassName("services")[0];
  servicesPanel.innerHTML = ""; // removes services content
  document.querySelectorAll(".other").forEach((a) => {
    a.remove(); // removes every element with the class 'other'
  });
};

const getTitle = () => {
  let title = document.getElementsByClassName(
    "headline-1 js-widont prettify"
  )[0].innerText;

  let year = document
    .getElementsByClassName("number")[0]
    .getElementsByTagName("a")[0].innerText;

  return `${title} ${year}`;
};

const init = (num) => {
  var styles = `
.watch-panel .services>.service:nth-child(n+${num}) {
  display: block !important;
}
`;
  var styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
};

const insertServices = () => {
  hideOther();
  let services = getServices(getTitle());
  init(services.length);

  for (const service of services) {
    addService(service);
  }
};

const main = () => {
  const intervalID = setInterval(() => {
    const servicesPanel = document.getElementsByClassName("services")[0];
    if (servicesPanel) {
      insertServices();
      clearInterval(intervalID);
    }
  }, 100);
};

main();
