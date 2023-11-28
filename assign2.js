
// Create toggle page for header
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

  function getSongsData() {
    const storedData = localStorage.getItem('songsData');
    return storedData ? JSON.parse(storedData) : null;
  }

  // // Function to retrieve songsData from localStorage
  // function getSongsDataFromLocalStorage() {
  //   const storedData = localStorage.getItem('songsData');
  //   if (storedData) {
  //     return JSON.parse(storedData);
  //   }
  //   return null;
  // }

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
    // Call the function to populate dropdowns when the page loads
    populateDropdowns();
  }

  // Call the function to load data when the page loads
  loadData();

  // Call the function to display all songs initially
  displayAllSongs();

  // Fetch songs data and store it in a variable
  const songsData = getSongsData();

  // Call functions from homePage.js to display top genres, top artists, and most popular songs
  displayTopGenres(songsData);
  displayTopArtists(songsData);
  displayMostPopularSongs(songsData);
  

  // Add event listeners to the sort buttons
  const sortButtons = document.querySelectorAll('.sort-button');
  sortButtons.forEach(button => {
      button.addEventListener('click', () => {
          const sortBy = button.classList[1]; // Get the class name to determine the sort type
          sortSongsBy(sortBy, songsData);
      });
  });

  // Code for managing radio buttons, input-text, and associated dropdowns
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

  // Event listener for the submit button whci hwill print the search results
  document.querySelector('#searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const searchType = document.querySelector('input[name="searchType"]:checked');
    const searchTerm = document.querySelector('#songTitleInput').value.toLowerCase();
  
    // Get songsData from localStorage
    const songsData = getSongsData();
  
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

    function populateDropdowns() {
      fetchSongData()
        .then(songsData => {
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
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

    function displayAllSongs() {
      const allSongs = getSongsData();
      if (allSongs) {
          displaySearchResults(allSongs);
      }
    }

    // Call the function to populate dropdowns when the page loads
    populateDropdowns();

});


