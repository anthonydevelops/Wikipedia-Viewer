//Global Variable(s)
const queryResponse = document.querySelector("#response");

//Check if the user hits "Enter" key
document.addEventListener("keypress", (event) => {
  const keyName = event.key;

  if(keyName === "Enter") {
    validateSearch();
  };
});

//Check if the search is a valid operation
function validateSearch() {
  //Remove previous search, if available
  if (queryResponse.hasChildNodes()) {
    for(let i = 0; i < 10; i++) {
      const prev = queryResponse.firstChild;
      if (prev == null || prev == "") {
        break;
      }
      queryResponse.removeChild(prev);
    }
  }
  const input = document.querySelector("#search").value;
  //Check if search field is empty
  if (input == null || input == "") {
    //Log empty search field error message to the user
    queryResponse.className = "alert alert-warning";
    queryResponse.setAttribute("role", "alert");
    const errorMsg = document.createTextNode("Invalid search of nothing. Try searching again!");
    queryResponse.appendChild(errorMsg);
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
  queryResponse.removeAttribute("role");
  queryResponse.className = "card";

  for(let i = 0; i < queryTitle.length; i++) {
    //Card structure
    const card = document.createElement("div");
    card.className = "card-body";
    //Card title
    const head = document.createElement("h4");
    const newTitle = document.createTextNode(queryTitle[i]);
    head.className = "card-title";
    head.appendChild(newTitle);
    //Card summary
    const summary = document.createElement("p");
    const newExcerpt = document.createTextNode(queryExcerpt[i]);
    summary.className = "card-text";
    summary.appendChild(newExcerpt);
    //Card link
    const link = document.createElement("a");
    const newBtnText = document.createTextNode("Visit Wiki");
    link.className = "btn btn-info";
    link.setAttribute("href", queryUrls[i]);
    link.appendChild(newBtnText);
    //Append nodes to response div
    card.appendChild(head);
    card.appendChild(summary);
    card.appendChild(link);
    queryResponse.appendChild(card);
  }
}
