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
document.getElementById('songTitleInput').value = ''; // Clear song title input field
document.getElementById('artistDropdown').selectedIndex = 0; // Reset artist dropdown to default
document.getElementById('genreDropdown').selectedIndex = 0; // Reset genre dropdown to default

// Reset radio buttons to unchecked state
let radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach(function(radioButton) {
    radioButton.checked = false;
});
}



// Event listener for when the DOM is loaded

document.addEventListener("DOMContentLoaded", async () => {
  const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

  async function fetchSongData() {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  function getSongsData() {
    const storedData = localStorage.getItem('songsData');
    return storedData ? JSON.parse(storedData) : null;
  }

  // Function to retrieve songsData from localStorage
  function getSongsDataFromLocalStorage() {
    const storedData = localStorage.getItem('songsData');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  }

  // Function to load data
  async function loadData() {
    let songsData = getSongsData();

    if (!songsData) {
      songsData = await fetchSongData();

      if (songsData) {
        localStorage.setItem('songsData', JSON.stringify(songsData));
      }
    }

    // Call the function to populate dropdowns when the page loads
    populateDropdowns();
  }

  // Call the function to load data when the page loads
  loadData();

  // Code for managing radio buttons, input-text, and associated dropdowns
  const radioButtons = document.querySelectorAll('input[type="radio"][name="searchType"]');
  const dropdowns = document.querySelectorAll('.dropdown');
  const inputText = document.getElementById('songTitleInput');

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
              const associatedDropdown = document.getElementById(`${this.value}Dropdown`);
              if (associatedDropdown) {
                  associatedDropdown.disabled = false;
              }
          }
      });
  });

//console.log('Songs data:', getSongsData());
// In the future, grab the data by using getSongsdata() function.

  // Event listener for the Clear button
  document.getElementById('clearButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    clearForm();
  });

  // Event listener for the submit button whci hwill print the search results
  document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const searchType = document.querySelector('input[name="searchType"]:checked');
    const searchTerm = document.getElementById('songTitleInput').value.toLowerCase();
  
    // Get songsData from localStorage
    const songsData = getSongsData();
  
    if (songsData && searchType) {
      let filteredSongs = [];

      switch (searchType.value) {
          case 'title':
              filteredSongs = songsData.filter(song => song.title.toLowerCase().includes(searchTerm));
              break;
          case 'genre':
              const selectedGenre = document.getElementById('genreDropdown').value.toLowerCase();
              filteredSongs = songsData.filter(song => song.genre.name.toLowerCase() === selectedGenre);
              break;
          case 'artist':
              const selectedArtist = document.getElementById('artistDropdown').value.toLowerCase();
              filteredSongs = songsData.filter(song => song.artist.name.toLowerCase() === selectedArtist);
              break;
          default:
              break;
      }
      displaySearchResults(filteredSongs);
    }
  });

      // Function to populate artist and genre dropdown options
      async function populateDropdowns() {
        const songsData = await fetchSongData();

        if (songsData) {
            const artistDropdown = document.getElementById('artistDropdown');
            const genreDropdown = document.getElementById('genreDropdown');

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

    // Call the function to populate dropdowns when the page loads
    populateDropdowns();

  //   TO DO: displaySearchResults - WORKS
  //   Need to fix span tool - WORKS
  //   open up Single Song View page from hyperlink - WORKS
  //   Add button to add song to playlist - in the works
  //   Figure out sorting - in the works
  function displaySearchResults(songs) {
    const songDetailsDiv = document.getElementById('songDetails');
    songDetailsDiv.innerHTML = '';
  
    let songDetailsHTML = '';
  
    songs.forEach(song => {
      let displayedTitle = song.title.length > 25 ? `${song.title.slice(0, 25)}` : song.title;
      
      const shortTitle = `<a href="#" class="songTitleHyperlink">${displayedTitle}</a>
      <span class="spantool" data-title="${song.title}"></span>`;
      
      const longTitle = `
        <a href="#" class="songTitleHyperlink">${displayedTitle}</a>
        <span class="spantool" data-title="${song.title}">&hellip;</span>
      `;
      
      let songTitle;

      if (song.title.length > 25) {
        songTitle = longTitle;
      } else {
        songTitle = shortTitle;
      }

      songDetailsHTML += `
        <ul class="oneline-list">
          <li class="c1">${songTitle}</li>
          <li class="c2">${song.artist.name}</li>
          <li class="c3">${song.year}</li>
          <li class="c4">${song.genre.name}</li>
          <li class="c5"><button type="button" class="addButton">Add</button></li>
        </ul>
      `;
  
      
    });
  
    songDetailsDiv.innerHTML = songDetailsHTML;
  
    // Event listener for the song title hyperlink
    const songTitleHyperlink = songDetailsDiv.querySelectorAll('.songTitleHyperlink');
    songTitleHyperlink.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();

        // Extract the song title from the hyperlink's data attribute
        const fullTitle = this.nextElementSibling.getAttribute('data-title');

        // Get the song details based on the full title from your data (assuming 'songsData' contains all song details)
        const songsData = getSongsData();
        const selectedSong = songsData.find(song => song.title === fullTitle);

        // Open the single song view page
        togglePage('searchPage'); // Hide search page view
        togglePage('singleSongView'); // Show single song view page

        // Display song details on the singleSongView page
        const songInfoDiv = document.getElementById('songInfo');
        const analysisDataDiv = document.getElementById('analysisData');
        songInfoDiv.innerHTML = '';
        analysisDataDiv.innerHTML = '';

        if (selectedSong) {
          // Show details of the selected song
          songInfoDiv.innerHTML += `
            <p>Title: ${selectedSong.title}</p>
            <p>Artist: ${selectedSong.artist.name}</p>
            <p>Genre: ${selectedSong.genre.name}</p>
            <p>Year: ${selectedSong.year}</p>
            <p>Duration: ${formatDuration(selectedSong.details.duration)}</p>
          `;

          analysisDataDiv.innerHTML += `
            <p>Analysis data:</p>
            <ul>
              <li>bpm: ${selectedSong.details.bpm}</li>
              <li>energy: ${selectedSong.analytics.energy}</li>
              <li>danceability: ${selectedSong.analytics.danceability}</li>
              <li>liveliness: ${selectedSong.analytics.liveness}</li>
              <li>valence: ${selectedSong.analytics.valence}</li>
              <li>acousticness: ${selectedSong.analytics.acousticness}</li>
              <li>speechiness: ${selectedSong.analytics.speechiness}</li>
              <li>popularity: ${selectedSong.details.popularity}</li>
          `;

          // Show radar chart
          // Check if a radar chart instance exists and remove it before creating a new one
          const existingRadarChartCanvas = document.getElementById('radarChart');
          if (existingRadarChartCanvas) {
            const existingRadarChart = Chart.getChart(existingRadarChartCanvas);
            if (existingRadarChart) {
              existingRadarChart.destroy();
            }
          }

          // Call createRadarChart(selectedSong) after ensuring no existing radar chart exists
          createRadarChart(selectedSong);
        }
      });
    });
  
    // Event listener for the spantool ellipsis
    const spantoolElements = songDetailsDiv.querySelectorAll('.spantool');
    spantoolElements.forEach(element => {
      element.addEventListener('click', function(event) {
        event.stopPropagation();
  
        const fullTitle = this.getAttribute('data-title');
        const spantool = document.createElement('div');
        spantool.classList.add('spantool-popup');
        spantool.textContent = fullTitle;
  
        const rect = element.getBoundingClientRect();
        spantool.style.position = 'absolute';
        spantool.style.top = `${rect.bottom + window.scrollY}px`;
        spantool.style.left = `${rect.right + window.scrollX}px`;
  
        document.body.appendChild(spantool);
  
        setTimeout(() => {
          spantool.remove();
        }, 5000);
      });
    });

  }

})

