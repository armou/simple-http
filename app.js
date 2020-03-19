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

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var newObj = JSON.parse(this.responseText);
            newObj = filterArrayByTitle(newObj, searchTerm);
            var finalHTML = "<h2>Here are the results : </h2>";
            if (newObj.length > 0) {
                newObj.forEach((value) => {
                    finalHTML += '<h4>Post #' + value.id + '</h4>' +
                                    '<ul><li><b>Title</b> : ' + value.title + '</li>' +
                                    '<li><b>Content</b> : ' + value.body + '</li></ul>';
                });
            } else {
                finalHTML = "<h2>Sorry, we couldn't find any posts with this search term \"" + searchTerm + "\". Try with another word.</h2>"
            }
            document.getElementById('search-results').innerHTML = finalHTML;

        } else {
            // console.log('error');
        }
    }

    xhttp.open('GET', 'https://jsonplaceholder.typicode.com/posts/');
    xhttp.send();
}