// // This function displays the top genre/artist
// function displayTopItems(songsData, itemType, itemProperty) {
//   if (!songsData || !itemType || !itemProperty) {
//     return;
//   }

//   const itemCounts = {};
//   songsData.forEach(song => {
//     const item = song[itemType][itemProperty];
//     itemCounts[item] = itemCounts[item] ? itemCounts[item] + 1 : 1;
//   });

//   const sortedItems = Object.keys(itemCounts)
//     .sort((a, b) => itemCounts[b] - itemCounts[a])
//     .slice(0, 15);

//   const itemList = document.querySelector(`#${itemType}List`);
//   itemList.innerHTML = '';

//   sortedItems.forEach(item => {
//     const itemLink = document.createElement('a');
//     itemLink.href = '#';
//     itemLink.textContent = item;
//     itemLink.addEventListener('click', () => {
//       const filteredSongs = songsData.filter(song => song[itemType][itemProperty] === item);
//       handleItemClick(itemType, item, filteredSongs);
//     });

//     const listItem = document.createElement('li');
//     listItem.appendChild(itemLink);
//     itemList.appendChild(listItem);
//   });
// }

// // This function handles the item click where user is directed to the search page
// function handleItemClick(itemType, item, filteredSongs) {
//   const radioButton = document.querySelector(`input[value="${itemType}"]`);
//   const dropdown = document.querySelector(`#${itemType}Dropdown`);

//   radioButton.checked = true;
//   dropdown.value = item;

//   togglePage('homePage');
//   togglePage('searchPage');

//   displaySearchResults(filteredSongs);
// }

// // This function displays the top popular songs
// function displayMostPopularSongs(songsData) {
//   if (songsData) {
//     // Sort songs based on popularity value
//     const sortedSongsByPopularity = songsData.sort((a, b) => b.details.popularity - a.details.popularity).slice(0, 15);

//     const songList = document.querySelector('#songList');
//     songList.innerHTML = '';

//     // Display the top 15 popular songs with links
//     sortedSongsByPopularity.forEach(song => {
//       const songLink = document.createElement('a');
//       songLink.href = '#';
//       songLink.textContent = song.title;
//       songLink.addEventListener('click', () => {
//         // display the single song view for this song
//         displaySingleSongView(song);
//       });

//       const listItem = document.createElement('li');
//       listItem.appendChild(songLink);
//       songList.appendChild(listItem);
//     });
//   }
// }