const parseTitle = (title) => title.split(" ").join("-").toLowerCase();

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
    url: `https://1337x.to/search/${query}/1/`,
    icon: "https://1337x.to/favicon.ico",
  },
  {
    name: "Lime Torrents",
    url: `https://limetorrent.xyz/fullsearch?q=${query}`,
    icon: "https://limetorrent.xyz/favicon.ico",
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
  {
    name: "Solarmovie",
    url: `https://solarmovie.pe/search/${parseTitle(query)}`,
    icon: "https://img.solarmovie.pe/xxrz/100x100/100/1e/d6/1ed66c3fd5d717d949289994f35d94c3/1ed66c3fd5d717d949289994f35d94c3.png",
  },
];
