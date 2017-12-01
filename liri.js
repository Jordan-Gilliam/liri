// grab key.js data and store in variable
var keys = require("./keys.js");

// require npm packages
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require("fs");

// grab api data for new user input
var tClient = new Twitter(keys.twitterKeys);
var sClient = new Spotify(keys.spotifyKeys);

// bloody hell, give the people what they want j(a).son
var porque = process.argv[2];
var sporque = process.argv[3];


// --------------------------------------------------

// Twitter

function tweet() {
    tClient.get('statuses/user_timeline', { screen_name: 'nolansym' }, function(error, tweets, response) {
        if (error) {
            console.log(error);
        }
        for (var i = 0; i < Math.min(tweets.length, 20); i++) {
            console.log("Created: " + tweets[i].created_at);
            console.log("Tweet: " + tweets[i].text);
        }
    });
}

// TODO: the people want to influence the market with memes

// tClient.post('statuses/update', { status: 'Buy Bitcoin' }, function(error, tweet, response) {
//     if (!error) {
//         console.log(tweet);
//     }
// });


// --------------------------------------------------

// Spotify
// client id a39119cf66d240d1bbffb4ae0adf626b
//   secret f180fed3d14a4ff7bd42ece6b1cf610b

function artist() {
    sClient.search({ type: 'track', query: sporque }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
        console.log("Album Name: " + data.tracks.items[0].album.name);
    });
}




// --------------------------------------------------

// OMDB

function cinema() {
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}



// Do what l(I)ri say(s)
function notSoRandom() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        data = data.split(",");
        sporque = data[1];
        artist();
    });
}







// run the file if condition met

if (porque === "my-tweets") {
    tweet();
}

if (porque === "spotify-this-song") {
    artist();
}

if (porque === "movie-this" && sporque === undefined) {
    //Mr. Nobody is defined as movie on URL
    var queryUrl = "http://www.omdbapi.com/?t=" + "Mr. Nobody" + keys.omdbKey;
    cinema();
}
else if (porque === "movie-this") {
    //searchItem is defining name of the movie on URL
    var queryUrl = "http://www.omdbapi.com/?t=" + sporque + keys.omdbKey;
    cinema();
}

// DO WHAT IT SAYS
if (porque === "do-what-it-says") {
    notSoRandom();
}
