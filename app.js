const wikiResponse = document.querySelector(".container");

document.addEventListener("keypress", (event) => {
  const keyName = event.key;

  if(keyName === "Enter") {
    validateSearch();
  };
});

function validateSearch() {
  const input = document.querySelector("#search").value;
  //Check if search field is empty
  if (input == null || input == "") {
    //Log empty search field error message to the user
    const wikiError = document.querySelector("#response");
    wikiError.className = "alert alert-warning";
    const errorMsg = document.createTextNode("Invalid search of nothing. Try searching again!");
    wikiError.appendChild(errorMsg);
  }
  else {
    const encodedQuery = encodeURIComponent(input);
    accessWiki(encodedQuery);
  }
}

function accessWiki(userQuery) {
  //Use api to gather title, summary, and urls of related content
  const url = "https://en.wikipedia.org/w/api.php?format=json&action=opensearch&search="
  + userQuery + "&origin=*";
  fetch(url).then(resp => resp.json()).then((data) => {
    //Arrays to hold query results
    let queryTitle = [];
    let queryExcerpt = [];
    let queryUrl = []
    for(let i = 0; i < data[1].length; i++) {
      //Copy over data
      queryTitle = data[1].slice();
      queryExcerpt = data[2].slice();
      queryUrl = data[3].slice();
    }
    formatSearch(queryTitle, queryExcerpt, queryUrl);
  }).catch((error) => {
    console.log('error is', error)
  });
}

function formatSearch(queryTitle, queryExcerpt, queryUrls) {

}
