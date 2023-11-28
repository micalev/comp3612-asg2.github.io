// Function to display song details in the single song view
function displaySongDetails(song) {
  displayBasicSongInfo(song);
  displayAnalysisData(song);
  displayRadarChart(song);
}

// Function to display basic song information
function displayBasicSongInfo(song) {
  const songInfoDiv = document.querySelector('#songInfo');
  songInfoDiv.innerHTML = `
      <p>Title: ${song.title}</p>
      <p>Artist: ${song.artist.name}</p>
      <p>Genre: ${song.genre.name}</p>
      <p>Year: ${song.year}</p>
      <p>Duration: ${formatDuration(song.details.duration)}</p>
  `;
}

// Function to display song analysis data
function displayAnalysisData(song) {
  const analysisDataDiv = document.querySelector('#analysisData');
  analysisDataDiv.innerHTML = `
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
}

// Function to display the radar chart
function displayRadarChart(song) {
  const existingRadarChartCanvas = document.querySelector('#radarChart');
  const existingRadarChart = Chart.getChart(existingRadarChartCanvas);

  if (existingRadarChart) {
      existingRadarChart.destroy();
  }

  createRadarChart(song);
}

// Function call to display the single song view
function displaySingleSongView(song) {
  togglePage('searchPage'); // Hide search page view
  togglePage('singleSongView'); // Show single song view page

  displaySongDetails(song);
}
