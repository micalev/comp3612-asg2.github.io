// Function to display top genres
function displayTopGenres(songsData) {
  if (songsData) {
    const genresCount = {}; // Object to store genre counts

    // Count the number of songs for each genre
    songsData.forEach(song => {
      const genre = song.genre.name;
      genresCount[genre] = genresCount[genre] ? genresCount[genre] + 1 : 1;
    });

    // Sort genres based on song counts
    const sortedGenres = Object.keys(genresCount).sort((a, b) => genresCount[b] - genresCount[a]).slice(0, 15);

    const genreList = document.querySelector('#genreList');
    genreList.innerHTML = '';

    // Display the top 15 genres with links
    sortedGenres.forEach(genre => {
      const genreLink = document.createElement('a');
      genreLink.href = '#';
      genreLink.textContent = genre;
      genreLink.addEventListener('click', () => {
        // Implement functionality to display songs for this genre
        const filteredSongs = songsData.filter(song => song.genre.name === genre);

        // Open the single song view page
        togglePage('homePage'); // Hide search page view
        togglePage('searchPage'); // Show the search page

        displaySearchResults(filteredSongs);
      });

      const listItem = document.createElement('li');
      listItem.appendChild(genreLink);
      genreList.appendChild(listItem);
    });
  }
}

// Function to display top artists
function displayTopArtists(songsData) {
  if (songsData) {
    const artistsCount = {}; // Object to store artist counts

    // Count the number of songs for each artist
    songsData.forEach(song => {
      const artist = song.artist.name;
      artistsCount[artist] = artistsCount[artist] ? artistsCount[artist] + 1 : 1;
    });

    // Sort artists based on song counts
    const sortedArtists = Object.keys(artistsCount).sort((a, b) => artistsCount[b] - artistsCount[a]).slice(0, 15);

    const artistList = document.querySelector('#artistList');
    artistList.innerHTML = '';

    // Display the top 15 artists with links
    sortedArtists.forEach(artist => {
      const artistLink = document.createElement('a');
      artistLink.href = '#';
      artistLink.textContent = artist;
      artistLink.addEventListener('click', () => {
        // display songs for this artist

        const filteredSongs = songsData.filter(song => song.artist.name === artist);

        // Open the single song view page
        togglePage('homePage'); // Hide search page view
        togglePage('searchPage'); // Show the search page
        
        displaySearchResults(filteredSongs);
      });

      const listItem = document.createElement('li');
      listItem.appendChild(artistLink);
      artistList.appendChild(listItem);
    });
  }
}

// Function to display most popular songs
function displayMostPopularSongs(songsData) {
  if (songsData) {
    // Sort songs based on popularity value
    const sortedSongsByPopularity = songsData.sort((a, b) => b.details.popularity - a.details.popularity).slice(0, 15);

    const songList = document.querySelector('#songList');
    songList.innerHTML = '';

    // Display the top 15 popular songs with links
    sortedSongsByPopularity.forEach(song => {
      const songLink = document.createElement('a');
      songLink.href = '#';
      songLink.textContent = song.title;
      songLink.addEventListener('click', () => {
        // display the single song view for this song
        displaySingleSongView(song);
      });

      const listItem = document.createElement('li');
      listItem.appendChild(songLink);
      songList.appendChild(listItem);
    });
  }
}