// Function to display the single song view
function displaySingleSongView(song) {
  
    // Open the single song view page
    togglePage('searchPage'); // Hide search page view
    togglePage('singleSongView'); // Show single song view page
  
    // Display song details on the singleSongView page
    const songInfoDiv = document.querySelector('#songInfo');
    const analysisDataDiv = document.querySelector('#analysisData');
    songInfoDiv.innerHTML = '';
    analysisDataDiv.innerHTML = '';
  
    // Show details of the selected song
    songInfoDiv.innerHTML += `
      <p>Title: ${song.title}</p>
      <p>Artist: ${song.artist.name}</p>
      <p>Genre: ${song.genre.name}</p>
      <p>Year: ${song.year}</p>
      <p>Duration: ${formatDuration(song.details.duration)}</p>
    `;
  
    analysisDataDiv.innerHTML += `
      <p>Analysis data:</p>
      <ul>
        <li>bpm: ${song.details.bpm}</li>
        <li>energy: ${song.analytics.energy}</li>
        <li>danceability: ${song.analytics.danceability}</li>
        <li>liveliness: ${song.analytics.liveness}</li>
        <li>valence: ${song.analytics.valence}</li>
        <li>acousticness: ${song.analytics.acousticness}</li>
        <li>speechiness: ${song.analytics.speechiness}</li>
        <li>popularity: ${song.details.popularity}</li>
      </ul>
    `;
  
    // Show radar chart
    // Check if a radar chart instance exists and remove it before creating a new one
    const existingRadarChartCanvas = document.querySelector('#radarChart');
    if (existingRadarChartCanvas) {
        const existingRadarChart = Chart.getChart(existingRadarChartCanvas);
        if (existingRadarChart) {
            existingRadarChart.destroy();
        }
    }

    // Call createRadarChart(selectedSong) after ensuring no existing radar chart exists
    createRadarChart(song);
  }