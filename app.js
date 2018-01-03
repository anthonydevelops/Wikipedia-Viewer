const wikiResponse = document.querySelector(".container");

document.addEventListener("keypress", (event) => {
  const keyName = event.key;

  if(keyName === "Enter") {
    validateSearch();
  };
});

function validateSearch() {
  let input = document.querySelector("#search").value;
  //Check if search field is empty
  if (input == null || input == "") {
    //Log empty search field error message to the user
    const wikiError = document.querySelector("#response");
    wikiError.className = "alert alert-warning";
    const errorMsg = document.createTextNode("Invalid search of nothing. Try searching again!");
    wikiError.appendChild(errorMsg);
  }
  else {
    accessWiki(input);
  }
}

function accessWiki(userQuery) {
  const encodedQuery = encodeURIComponent(userQuery);
  const url = "https://en.wikipedia.org/w/api.php?action=query&titles=" + encodedQuery +
  "&prop=revisions&rvprop=content&format=json";
  fetch(url).then((resp) => resp.json()).then(function(data) {
    
  })
}
