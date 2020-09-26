import reddit from './redditapi';

//configuration of cors
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
};

app.configure(function() {
    app.use(allowCrossDomain);
});

// start of program

const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
    // Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // Get limit
    const searchLimit = document.getElementById('limit').value;
    // Get search
    const searchTerm = searchInput.value;
    // Check for input
    if (searchTerm == '') {
        // Show message
        showMessage('Please add a search term', 'alert-danger');
    }
    searchInput.value = ' ';

    //Reddit Search
    reddit.search(searchTerm, searchLimit, sortBy);

    e.preventDefault();
});

// Show Message Function
function showMessage(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const searchContainer = document.getElementById('search-container');
    // Get form
    const search = document.getElementById('search');

    // Insert alert
    searchContainer.insertBefore(div, search);

    // Timeout after 3 sec
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 2600);
}