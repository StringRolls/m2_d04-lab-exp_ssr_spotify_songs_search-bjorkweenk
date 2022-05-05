require('dotenv/config');
const express = require('express');
const hbs = require('hbs');



/*const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
  clientId: '30cd17e624984e6d9b6e2e16270f78e4',
  clientSecret: '2bb91b0d433d40b98649fa19a53d1e98',
});*/

const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// Retrieve an access token


spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

//routers

app.get('/', (req, res) => {
  res.render('index');
  console.log("hi")
});

app.get('/artistsearch', (req, res) => {
  const search = req.query.artistsearch
  spotifyApi
  .searchArtists(search)
    .then(data =>
     {console.log(data.body.artists.items)
     res.render("artist-search-results", {artistsearch: data.body.artists.items})
     })
     .catch(error => console.log(error))
});



app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
