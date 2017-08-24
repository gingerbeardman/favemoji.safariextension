//only for this window
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
      var parts = document.location.hostname.split('.');

      while (parts.length && emoji == undefined) {
         //combine remaining parts
         var domain = parts.join('.');
         //try to get an emoji match
         var emoji = p[domain];
         //remove left most part of domain
         parts.shift();
      }

      //if emoji is already there
      if (document.title.indexOf(emoji) === 0) return;

      //if we have a match, remove and re-add the emoji
      if (emoji) {
         var title = document.title.replace(emoji, '');
         document.title = emoji + ' ' + title;
      }
   }
}
