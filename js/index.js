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



})();