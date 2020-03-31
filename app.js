function filterArrayByTitle(object, string) {
    var responseValue = object.filter((value) => {
        if (value.title.includes(string) === true) {
            return true;
        }
    });
    return responseValue;
}

function searchPosts() {
    var xhttp = new XMLHttpRequest();
    var searchTerm = document.getElementById('search-term').value;
    var apiKey = 'b5db1638ca8c42e78b791c3a29971cc7'


    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var newObj = JSON.parse(this.responseText);
            console.log(newObj)
            // newObj = filterArrayByTitle(newObj, searchTerm);
            var finalHTML = "<h2>Here are the results : </h2>";
            if (newObj.articles.length > 0) {
                newObj.articles.forEach((value) => {
                    finalHTML += '<h4>Article Title : ' + value.title + '</h4>' +
                                    '<ul><li><b>Description</b> : ' + value.description + '</li>' +
                                    '<li><b>URL</b> : <a target="_blank" href=' + value.url + '>' + value.url + '</a></li></ul>';
                });
            } else {
                finalHTML = "<h2>Sorry, we couldn't find any article with this search term \"" + searchTerm + "\". Try with another word.</h2>"
            }
            document.getElementById('search-results').innerHTML = finalHTML;

        } else {
            // console.log('error');
        }
    }
    var url = 'https://newsapi.org/v2/everything?q=' + searchTerm +  '&pageSize=50&language=fr&apiKey=' + apiKey;
    console.log(url)
    xhttp.open('GET', url);
    xhttp.send();
}