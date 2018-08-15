(function() {


  document.getElementById("btnGoogleSignIn").addEventListener("click", loginWithGoogle);

  document.getElementById("btnSignOut").addEventListener("click", signOut);

  const auth = firebase.auth();
  // console.log(auth);

  function loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  }

  function signOut() {
    auth.signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  auth.onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      document.getElementById("status").innerHTML = "IN";
    } else {
      document.getElementById("status").innerHTML = "OUT";
    }
  })

  function slideAutoShow() {
    document.getElementById("headerSlideShow").style.backgroundImage = "url('post-sample-image.jpg')";
  }

  alert(document.getElementById("headerSlideShow").style.backgroundImage);



})();