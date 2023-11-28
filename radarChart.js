// Function to create the radar chart
function createRadarChart(selectedSong) {
    if (selectedSong) {
      const radarChartCanvas = document.getElementById('radarChart');
      const ctx = radarChartCanvas.getContext('2d');
  
      // Define labels and corresponding data values directly from selectedSong object
      const labels = [
        'Danceability',
        'Energy',
        'Speechiness',
        'Acousticness',
        'Liveness',
        'Valence',
        'Popularity'
      ];
  
      const dataValues = [
        selectedSong.analytics.danceability,
        selectedSong.analytics.energy,
        selectedSong.analytics.speechiness,
        selectedSong.analytics.acousticness,
        selectedSong.analytics.liveness,
        selectedSong.analytics.valence,
        selectedSong.details.popularity
      ];

      const songTitle = selectedSong.title;
  
      // Radar chart data and configuration
      const data = {
        labels: labels,
        datasets: [{
          label: songTitle,
          data: dataValues,
          fill: true,
          backgroundColor: 'rgba(233,133,177, 0.7)',
          borderColor: 'rgb(233,133,177)',
          pointBackgroundColor: 'rgb(233,133,177)',
          pointBorderColor: 'rgb(233,133,177)',
          pointHoverBackgroundColor: 'rgb(251,255,254)',
          pointHoverBorderColor: 'rgb(233,133,177)'
        }]
      };
  
      const config = {
        type: 'radar',
        data: data,
        options: {
          plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'rgb(251,255,254)'
                }
            }
          },
          scales: {
            r: {
              angleLines: {
                color: 'rgb(251,255,254)'
              },
              grid: {
                color: 'rgb(251,255,254)'
              },
              pointLabels: {
                 color: 'rgb(251,255,254)'
              },
              ticks: {
                color: 'rgb(29, 17, 40)',
                backdropColor: 'rgb(251,255,254, 0.2)'
              }
            }
          },
            layout: {
              padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }
          },
          responsive: true,
          elements: {
            line: {
              borderWidth: 3
            }
          }
        }
      };

    // Increase point hover radius
    config.data.datasets[0].pointRadius = 4; 
    config.data.datasets[0].pointHoverRadius = 8; // on hover
  
      // Create the radar chart instance
      const myRadarChart = new Chart(ctx, config);
    }
  }