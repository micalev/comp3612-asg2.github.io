// This has already been added to assign2.js

// // Function to render the song details for display on search page
// function renderSongDetails(songs) {
//   let songTitle;
//   let songDetailsHTML = '';

//   songs.forEach(song => {
//     let displayedTitle = song.title.length > 25 ? `${song.title.slice(0, 25)}` : song.title;

//     const shortTitle = `
//       <a href="#" class="songTitleHyperlink">${displayedTitle}</a>
//       <span class="spantool" data-title="${song.title}"></span>
//     `;

//     const longTitle = `
//       <a href="#" class="songTitleHyperlink">${displayedTitle}</a>
//       <span class="spantool" data-title="${song.title}">&hellip;</span>
//     `;

//     if (song.title.length > 25) {
//       songTitle = longTitle;
//     } else {
//       songTitle = shortTitle;
//     }

//     songDetailsHTML += `
//       <tr>
//         <td class="c1">${songTitle}</td>
//         <td class="c2">${song.artist.name}</td>
//         <td class="c3">${song.year}</td>
//         <td class="c4">${song.genre.name}</td>
//         <td class="c5"><button type="button" id="addButton" data-songid="${song.song_id}">Add</button></td>
//       </tr>
//     `;
    
//   });

//   return songDetailsHTML;
  
// }

// // Function to handle song title click event
// function handleSongTitleClick(songs) {
//   const songDetailsDiv = document.querySelector('#songDetails');

//   // Event listener for the song title hyperlink
//   songDetailsDiv.addEventListener('click', event => {
//     event.preventDefault();

//     const target = event.target;
//     if (target.classList.contains('songTitleHyperlink')) {
//       const fullTitle = target.nextElementSibling.getAttribute('data-title');
//       const selectedSong = songs.find(song => song.title === fullTitle);

//       if (selectedSong) {
//         displaySingleSongView(selectedSong);
//       }
//     }
//   });
// }

// // Function to handle ellipsis click event
// function handleEllipsisClick() {
//   const songDetailsDiv = document.querySelector('#songDetails');

//   // Event listener for the spantool when user clicks on the ellipsis
//   songDetailsDiv.addEventListener('click', event => {
//     const target = event.target;
//     if (target.classList.contains('spantool')) {
//       event.stopPropagation();

//       const fullTitle = target.getAttribute('data-title');
//       const spantool = document.createElement('div');
//       spantool.classList.add('spantool-popup');
//       spantool.textContent = fullTitle;

//       const rect = target.getBoundingClientRect();
//       spantool.style.position = 'absolute';
//       spantool.style.top = `${rect.bottom + window.scrollY}px`;
//       spantool.style.left = `${rect.right + window.scrollX}px`;

//       document.body.appendChild(spantool);

//       setTimeout(() => {
//         spantool.remove();
//       }, 5000);
//     }
//   });
// }

// // function addButtonClick() {
// //   const addButton = document.querySelector('#addButton');
// //   addButton.addEventListener('click', event => {
// //     const target = event.target;

// //         if (event.target.classList.contains('addButton')) {
// //           const songId = event.target.getAttribute('data-songid');
// //           const songToAdd = songs.find(song => song.song_id === parseInt(songId, 10));
// //           console.log("button has been clicked");
// //           if (songToAdd) {
// //             addToPlaylist(songToAdd);
// //             // You can update UI or perform any further operations after adding to the playlist
// //             console.log(songToAdd);
// //           }
// //         }
// //     });
// //   }
    
// // // Function to set up column header click listeners for sorting
// // function setUpSortingListeners(songs) {
// //   document.querySelectorAll('.sort-button').forEach(button => {
// //     button.addEventListener('click', () => {
// //       const sortBy = button.classList[1].replace('sort-by-', ''); // Extract the column to sort by
// //       sortSongsBy(sortBy, songs);
// //     });
// //   });
// // }

// // // Function to display the search results
// // function displaySearchResults(songs) {
// //   const songDetailsDiv = document.querySelector('#songDetails');
// //   songDetailsDiv.innerHTML = '';

// //   const songDetailsHTML = renderSongDetails(songs);
// //   songDetailsDiv.innerHTML = songDetailsHTML;

// //   handleSongTitleClick(songs);
// //   handleEllipsisClick();
// //   setUpSortingListeners(songs);
// // }
