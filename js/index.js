(function() {


  function slideAutoShow() {

    document.getElementById("headerSlideShow").style.backgroundImage = "url(./img/homeBanner/toronto-banner.jpeg)";

    var bannerNamesList = ['toronto-banner.jpeg', 'food-banner.jpeg', 'photographer-banner.jpg']
    var index = 1;
    setInterval(function() {
      // console.log(index, bannerNamesList[index])

      document.getElementById("headerSlideShow").style.backgroundImage = "url(./img/homeBanner/" + bannerNamesList[index] + ")";
      index = (index + 1) % bannerNamesList.length;
      // console.log(index);
    }, 3000);

  }

  slideAutoShow();

  function getLastestFeed() {
    httpRESTAsync("GET", "https://us-central1-whatoreat-testdb.cloudfunctions.net/getLatestFeeds", null, function(res) {
      if (res) {
        var lastestFeeds = JSON.parse(res);
        for (feedIndex in lastestFeeds) {
          // console.log(lastestFeeds[feedIndex])
          updateNewsFeeds(lastestFeeds[feedIndex]);
        }

        document.getElementById("newsFeedLoader").style.display = "none";
        document.getElementById("newFeedsContainer").style.display = "inline";

      }
    })
  }

  getLastestFeed();

  function httpRESTAsync(type, theUrl, data, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
      else
        callback(null);
    }
    xmlHttp.open(type, theUrl, true); // true for asynchronous
    if (type == "POST") {
      // xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlHttp.setRequestHeader("Content-type", "application/json");
      xmlHttp.send(JSON.stringify(data));
    } else {
      xmlHttp.send(null);
    }
  }

  function updateNewsFeeds(newsFeed) {

    var postAddr = newsFeed.postAddr;
    var postID = newsFeed.postID;
    var ts = new Date(newsFeed.ts).toString().substring(0, 24);
    // console.log(new Date(ts))
    var post = `
    <div class="post-preview row">
      <div class="col-md-4 text-center">
        <img src="./posts/${postID}/fd1.jpg" alt="Logo" class="previewImage">
      </div>
      <div class="col-md-8">
        <a href="./posts/${postAddr}">
          <h2 class="post-title">
            Man must explore, and this is exploration at its greatest
          </h2>
          <h3 class="post-subtitle preview-sub-smaller">
            Problems look mighty small from 150 miles up
          </h3>
        </a>
        <p class="post-meta">Posted by
          <small><a href="/">WhaTorEat</a></small> on ${ts}</p>
      </div>
    </div>
    <hr>
    `
    document.getElementById('newsFeedArea').innerHTML += post;
  }
})();