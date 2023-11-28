function displaySearchResults(songs) {
  const songDetailsDiv = document.querySelector('#songDetails');
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
      <tr>
        <td class="c1">${songTitle}</td>
        <td class="c2">${song.artist.name}</td>
        <td class="c3">${song.year}</td>
        <td class="c4">${song.genre.name}</td>
        <td class="c5"><button type="button" class="addButton">Add</button></td>
      </tr>
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

      // Get the song details based on the full title from your data
      const selectedSong = songs.find(song => song.title === fullTitle);

      if (selectedSong) {
        displaySingleSongView(selectedSong);
      }
    });
  });

  // Event listener for the spantool when user clicks on the ellipsis
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

  // Event listeners for column header clicks to trigger sorting
  document.querySelectorAll('.sort-button').forEach(button => {
    button.addEventListener('click', () => {
      const sortBy = button.classList[1].replace('sort-by-', ''); // Extract the column to sort by
      sortSongsBy(sortBy, songs);
    });
  });

};