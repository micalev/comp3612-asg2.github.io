// This function is the page toggle for the header
function togglePage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(page => {
    if (page.id === pageId) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  });
}

// Function to convert seconds to a formatted duration (minutes:seconds)
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Ensure seconds are displayed with leading zero if < 10
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${minutes}:${formattedSeconds}`;
}

// function to clear the form/input
function clearForm() {
  document.querySelector('#songTitleInput').value = ''; // Clear song title input field
  document.querySelector('#artistDropdown').selectedIndex = 0; // Reset artist dropdown to default
  document.querySelector('#genreDropdown').selectedIndex = 0; // Reset genre dropdown to default

  // Reset radio buttons to unchecked state
  let radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(function(radioButton) {
    radioButton.checked = false;
  });
}

// Event listener for when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

  // This function fetches the data
  function fetchSongData() {
    try {
      return fetch(api)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          return response.json();
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          return null;
        });
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  // This function is used to get the data from the local storage
  function getSongsData() {
    const storedData = localStorage.getItem('songsData');
    return storedData ? JSON.parse(storedData) : null;
  }

  // Function to load data
  function loadData() {
    let songsData = getSongsData();

    if (!songsData) {
      fetchSongData().then(data => {
        songsData = data;
        if (songsData) {
          localStorage.setItem('songsData', JSON.stringify(songsData));
        }
      });
    }
    populateDropdowns(); // Populate dropdowns when the page loads
  }

  loadData(); // Call the function to load data when the page loads

  const songsData = getSongsData(); // Fetch songs data and store it in a variable

  displaySearchResults(songsData); // Display the default search results
  displayTopItems(songsData, 'artist', 'name'); // Display top artists 
  displayTopItems(songsData, 'genre', 'name'); // Display top genres
  displayMostPopularSongs(songsData); // display the top songs

  // Event Listener for managing radio buttons, input-text, and associated dropdowns
  const radioButtons = document.querySelectorAll('input[type="radio"][name="searchType"]');
  const dropdowns = document.querySelectorAll('.dropdown');
  const inputText = document.querySelector('#songTitleInput');

  radioButtons.forEach(radioButton => {
      radioButton.addEventListener('change', function() {
          // Disable all dropdowns and input-text
          dropdowns.forEach(dropdown => {
              dropdown.disabled = true;
          });
          inputText.disabled = true;

          // Enable dropdown or input-text associated with the selected radio button
          if (this.value === 'title') {
              inputText.disabled = false;
          } else {
            const associatedDropdown = document.querySelector(`#${this.value}Dropdown`);
            if (associatedDropdown) {
                  associatedDropdown.disabled = false;
              }
          }
      });
  });

  // Event listener for the Clear button
  document.querySelector('#clearButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    clearForm();
  });

  // Event listener for the submit button which will filter and print the search results
  document.querySelector('#searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const searchType = document.querySelector('input[name="searchType"]:checked');
    const searchTerm = document.querySelector('#songTitleInput').value.toLowerCase();
  
    if (songsData && searchType) {
      let filteredSongs = [];

      switch (searchType.value) {
          case 'title':
              filteredSongs = songsData.filter(song => song.title.toLowerCase().includes(searchTerm));
              break;
          case 'genre':
              const selectedGenre = document.querySelector('#genreDropdown').value.toLowerCase();
              filteredSongs = songsData.filter(song => song.genre.name.toLowerCase() === selectedGenre);
              break;
          case 'artist':
              const selectedArtist = document.querySelector('#artistDropdown').value.toLowerCase();
              filteredSongs = songsData.filter(song => song.artist.name.toLowerCase() === selectedArtist);
              break;
          default:
              break;
      }
      displaySearchResults(filteredSongs);
    }
  });

  // This function populates the genre and artist dropdown in the search form
  function populateDropdowns() {
    const songsData = getSongsData();
    if (songsData) {
      const artistDropdown = document.querySelector('#artistDropdown');
      const genreDropdown = document.querySelector('#genreDropdown');

      const uniqueArtists = [...new Set(songsData.map(song => song.artist.name))];
      const uniqueGenres = [...new Set(songsData.map(song => song.genre.name))];

      // Clear previous options
      artistDropdown.innerHTML = '';
      genreDropdown.innerHTML = '';

      // Add default option
      artistDropdown.innerHTML += `<option value="" disabled selected>Pick one</option>`;
      genreDropdown.innerHTML += `<option value="" disabled selected>Pick one</option>`;

      // Add options based on unique artist names
      uniqueArtists.forEach(artist => {
        artistDropdown.innerHTML += `<option value="${artist}">${artist}</option>`;
      });

      // Add options based on unique genre names
      uniqueGenres.forEach(genre => {
        genreDropdown.innerHTML += `<option value="${genre}">${genre}</option>`;
      });
    }
  }

  // Function to render the song details for display on search page
function renderSongDetails(songs) {
  let songTitle;
  let songDetailsHTML = '';

  songs.forEach(song => {
    let displayedTitle = song.title.length > 25 ? `${song.title.slice(0, 25)}` : song.title;

    const shortTitle = `
      <a href="#" class="songTitleHyperlink">${displayedTitle}</a>
      <span class="spantool" data-title="${song.title}"></span>
    `;

    const longTitle = `
      <a href="#" class="songTitleHyperlink">${displayedTitle}</a>
      <span class="spantool" data-title="${song.title}">&hellip;</span>
    `;

    if (song.title.length > 25) {
      songTitle = longTitle;
    } else {
      songTitle = shortTitle;
    }

    songDetailsHTML += `
      <tr>
        <td class="c1">${songTitle}</td>
        <td class="c2">${song.artist.name}</td>
        <td class="c3">${song.year}</td>
        <td class="c4">${song.genre.name}</td>
        <td class="c5"><button type="button" id="addButton" data-songid="${song.song_id}">Add</button></td>
      </tr>
    `;
    
  });

  return songDetailsHTML;
  
}

// Function to handle song title click event
function handleSongTitleClick(songs) {
  const songDetailsDiv = document.querySelector('#songDetails');

  // Event listener for the song title hyperlink
  songDetailsDiv.addEventListener('click', event => {
    event.preventDefault();

    const target = event.target;
    if (target.classList.contains('songTitleHyperlink')) {
      const fullTitle = target.nextElementSibling.getAttribute('data-title');
      const selectedSong = songs.find(song => song.title === fullTitle);

      if (selectedSong) {
        displaySingleSongView(selectedSong);
      }
    }
  });
}

// Function to handle ellipsis click event
function handleEllipsisClick() {
  const songDetailsDiv = document.querySelector('#songDetails');

  // Event listener for the spantool when user clicks on the ellipsis
  songDetailsDiv.addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('spantool')) {
      event.stopPropagation();

      const fullTitle = target.getAttribute('data-title');
      const spantool = document.createElement('div');
      spantool.classList.add('spantool-popup');
      spantool.textContent = fullTitle;

      const rect = target.getBoundingClientRect();
      spantool.style.position = 'absolute';
      spantool.style.top = `${rect.bottom + window.scrollY}px`;
      spantool.style.left = `${rect.right + window.scrollX}px`;

      document.body.appendChild(spantool);

      setTimeout(() => {
        spantool.remove();
      }, 5000);
    }
  });
  }

  // Function to set up column header click listeners for sorting
function setUpSortingListeners(songs) {
  document.querySelectorAll('.sort-button').forEach(button => {
    button.addEventListener('click', () => {
      const sortBy = button.classList[1].replace('sort-by-', ''); // Extract the column to sort by
      sortSongsBy(sortBy, songs);
    });
  });
}

// Function to display the search results
function displaySearchResults(songs) {
  const songDetailsDiv = document.querySelector('#songDetails');
  songDetailsDiv.innerHTML = '';

  const songDetailsHTML = renderSongDetails(songs);
  songDetailsDiv.innerHTML = songDetailsHTML;

  handleSongTitleClick(songs);
  handleEllipsisClick();
  setUpSortingListeners(songs);
}
 
// Playlist stuff

// Function to render the playlist table
let playlist = [];

function renderPlaylist(playlistSongs) {
  console.log(`Number of songs in the playlist: ${playlistSongs.length}`); // Log the number of songs in the playlist

  const playlistBody = document.querySelector('#playlistBody');
  const playlistCount = document.querySelector('#playlistCount'); // New element for displaying count
  playlistBody.innerHTML = ''; // Clear previous playlist content

  playlistSongs.forEach(song => {
    playlistBody.innerHTML += `
      <tr>
        <td class="c1">${song.title}</td>
        <td class="c2">${song.artist.name}</td>
        <td class="c3">${song.year}</td>
        <td class="c4">${song.genre.name}</td>
        <td class="c5"></td>
      </tr>
    `;
    console.log(`rendering song: ${song.title}`);
  });

  // Update the count of songs in the playlist
  playlistCount.textContent = `Total Songs in Playlist: ${playlistSongs.length}`;
  return playlistBody.innerHTML;
}

// Function to check if a song is already in the playlist
function isSongInPlaylist(song) {
  return playlist.some(item => item.id === song.id);
}
// Function to get the playlist from local storage or initialize it
function getOrCreatePlaylist() {
  let storedPlaylist = localStorage.getItem('playlist');
  if (!storedPlaylist || storedPlaylist === '[]') {
    // Initialize playlist if not found or empty
    playlist = [];
  } else {
    playlist = JSON.parse(storedPlaylist);
  }
}

// Call the function to get or initialize the playlist
getOrCreatePlaylist();

// Event listener for adding songs to the playlist (using event delegation)
document.addEventListener('click', function(event) {
  if (event.target.id === 'addButton') {
    const songId = event.target.getAttribute('data-songid');
    const selectedSong = songsData.find(song => song.song_id === parseInt(songId));
    console.log(`${selectedSong.title}`);
    
    if (selectedSong && !isSongInPlaylist(selectedSong)) {
      playlist.push(selectedSong); // Add the song to the playlist array
      displayPlaylist(playlist); // Render the updated playlist
      // Update local storage with the updated playlist
      
      // Update local storage with the updated playlist
      localStorage.setItem('playlist', JSON.stringify(playlist));
      console.log("Added song to playlist");
    } else {
      console.log(`Song "${selectedSong.title}" is already in the playlist.`);
    }
  }
});

// Function to display the playlist
function displayPlaylist(playlist) {
  const playlistBody = document.querySelector('#playlistBody');
  playlistBody.innerHTML = '';

  const playlistHTML = renderPlaylist(playlist);
  playlistBody.innerHTML = playlistHTML;

  // call the remove button function here
}

// Add an event listener for the Clear Playlist button
document.getElementById('clearPlaylistButton').addEventListener('click', function() {
  clearPlaylist();
});

// Function to clear the playlist
function clearPlaylist() {
  playlist = []; // Clear the playlist array by assigning it an empty array
  renderPlaylist(playlist); // Update the rendered playlist to reflect the changes
  localStorage.removeItem('playlist'); // Remove the playlist from local storage
}






});


