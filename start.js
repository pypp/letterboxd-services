getServices = (title) => {
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
      icon: "https://1337xto.to/images/logo.svg",
    },
  ];
};

addService = (service) => {
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

hideOther = () => {
  let servicesPanel = document.getElementsByClassName("services")[0];
  servicesPanel.innerHTML = ""; // removes services content
  document.querySelectorAll(".other").forEach((a) => {
    a.remove(); // removes every element with the class 'other'
  });
};

getTitle = () => {
  let title = document.getElementsByClassName(
    "headline-1 js-widont prettify"
  )[0].innerText;

  let year = document
    .getElementsByClassName("number")[0]
    .getElementsByTagName("a")[0].innerText;

  return `${title} ${year}`;
};

init = (num) => {
  var styles = `
.watch-panel .services>.service:nth-child(n+${num}) {
  display: block !important;
}
`;
  var styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
};

main = () => {
  let servicesPanel = document.getElementsByClassName("services")[0];
  if (!servicesPanel) return; // if the page doesn't have a services tag return

  hideOther();
  let services = getServices(getTitle());
  init(services.length);

  for (const service of services) {
    addService(service);
  }
};

chrome.runtime.onMessage.addListener((request) => {
  location.reload();
  if (request)
    window.onload = () => {
      main();
    };
});
