if (window.top === window) {
  //watch for title changes
  new MutationObserver(function(mutations) {
    // console.log(mutations[0]);
    doReplacement(favemoji);
  }).observe(
    document.querySelector('title'), {
      childList: true
    }
  );

  var favemoji = "";

  function requestSetting(theData) {
    safari.self.tab.dispatchMessage("requestSetting", theData);
  }

  function receiveSetting(theMessageEvent) {
    if (theMessageEvent.name === "favemoji") {
      favemoji = JSON.parse(theMessageEvent.message);
      doReplacement(favemoji);
    }
  }
  safari.self.addEventListener("message", receiveSetting, false);

  //ask for setting
  requestSetting();

  //reusable function
  function doReplacement(p) {
    // for (var key in p) {
    //   if (p.hasOwnProperty(key)) {
    //     console.log(key + " -> " + p[key]);
    //   }
    // }

    var domain = document.location.hostname.replace(/www\./g, "");
    var emoji = p[domain];

    if (document.title.indexOf(emoji) === 0) return;

    if (emoji) {
      var title = document.title.replace(emoji, '');
      document.title = emoji + ' ' + title;
    }
  }
}
