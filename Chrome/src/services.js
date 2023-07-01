globalThis.getServices = (query, imdbID) => [
  {
    name: "Yify",
    url: `https://yts.mx/browse-movies/${query}`,
    icon: "https://yts.mx/assets/images/website/favicon.ico",
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
  },
];
