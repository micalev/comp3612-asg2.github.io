// document.addEventListener("DOMContentLoaded", () => {
//     const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

//     let songsData = [];
//     let currentSort = "title";
//     let playlist = [];
//     let filteredSongs;

//    // Check if the API URL is available or defined
//     if (api) {
//         fetch(api)
//             .then(res => {
//                 if (res.ok) {
//                     return res.json();
//                 } else {
//                     return Promise.reject(res);
//                 }
//             })
//             .then(data => {
//                 loadData(data); // Once data is fetched successfully, load it using the 'loadData' function
//                 localStorage.setItem("songs", JSON.stringify(data)); // Store fetched data in local storage
//             })
//             .catch(err => {
//                 console.log('fetch error', err); // Log an error if fetching data encounters an issue
//                 // If fetching from API fails, try retrieving from local storage
//                 const songsFromLocalStorage = localStorage.getItem("songs");
//                 if (songsFromLocalStorage) {
//                     const parsedSongs = JSON.parse(songsFromLocalStorage);
//                     loadData(parsedSongs); // Load existing songs data from local storage
//                 }
//             });
//     } else {
//         // If the API is not defined or unavailable, try retrieving from local storage
//         const songsFromLocalStorage = localStorage.getItem("songs");
//         if (songsFromLocalStorage) {
//             const parsedSongs = JSON.parse(songsFromLocalStorage);
//             loadData(parsedSongs); // Load existing songs data from local storage
//         }
//     }


//     /**
//      * This function loads and handles the data
//      * 
//      * @param {*} data 
//      */
//     function loadData(data) {
//         console.log(data); // Log the received data to the console
    
//         localStorage.setItem("songs", JSON.stringify(data)); // Store the received data in local storage as "songs"
    
//         // Use sample-songs file as a backup if API call fails or if local storage data is unavailable
//         songs = JSON.parse(localStorage.getItem("songs")) || JSON.parse(songsJSON); // Retrieve data from local storage or use a default backup
//         console.log("songs object", songs); // Log the songs object to the console
    
//         // Populate options for song titles in the search dropdown
//         songs.forEach(song => {
//             populateOptions(song.title, document.getElementById("song-title-search"));
//         })
    
//         // Filter songs based on user-selected criteria stored in sessionStorage
//         if (sessionStorage.getItem("title")) {
//             let title = sessionStorage.getItem("title");
//             filteredSongs = songs.filter((song) => {
//                 return String(song.title).toLowerCase().includes(title.toLowerCase());
//             });
    
//         } else if (sessionStorage.getItem("artist")) {
//             let artist = sessionStorage.getItem("artist");
//             filteredSongs = songs.filter((song) => {
//                 return song.artist.name == artist;
//             });
    
//         } else if (sessionStorage.getItem("genre")) {
//             let genre = sessionStorage.getItem("genre");
//             filteredSongs = songs.filter((song) => {
//                 return song.genre.name == genre;
//             });
//         }
    
//         console.log(filteredSongs); // Log the filtered songs to the console
    
//         // Perform sorting based on the filtered songs or the entire song list
//         filteredSongs ? alphaSortColumn(filteredSongs, currentSort) : alphaSortColumn(songs, currentSort);
    
//         // Add a listener to the song table body for interaction
//         addTableListener("#song-table-body");
//     }


//     //load playlist if one exists in localstorage
//     if (!localStorage.getItem("playlist")) {
//         localStorage.setItem("playlist", []);
//     } else {
//         playlist = JSON.parse(localStorage.getItem("playlist"));
//         console.log('initial playlist', playlist);
//     }

//     const artists = JSON.parse(artistsJSON);
//     const genres = JSON.parse(genresJSON);

//     console.log("sessionStorage", sessionStorage);

//     // sorting algorithm adapted from https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
//     /*
//     this  function sorts each column individually in the table. 
//     */
//     function alphaSortColumn(songs, column) {
//         let compare1; // these are simple compare values that we will use and inout things (depending on the collumn to then compare the 2 values)
//         let compare2;
//         songs.sort((a, b) => {
//             if (column == "title") {
//                 compare1 = String(a.title).toLowerCase();
//                 compare2 = String(b.title).toLowerCase();
//             } else if (column == "artist") {
//                 compare1 = String(a.artist.name).toLowerCase();
//                 compare2 = String(b.artist.name).toLowerCase();
//             } else if (column == "genre") {
//                 compare1 = String(a.genre.name).toLowerCase();
//                 compare2 = String(b.genre.name).toLowerCase();
//             } else if (column == "year") {
//                 compare1 = a.year;
//                 compare2 = b.year;
//             } else if (column == "popularity") {
//                 compare1 = b.details.popularity; //swapped a and b so that popularity sorts by highest first
//                 compare2 = a.details.popularity;
//             } else if (column == "song_id") {
//                 compare1 = a.song_id;
//                 compare2 = b.song_id;
//             } else {
//                 compare1 = String(a.title).toLowerCase();
//                 compare2 = String(b.title).toLowerCase();
//             }
//             if (compare1 < compare2) {
//                 return -1;
//             }
//             if (compare1 > compare2) {
//                 return 1;
//             }
//             return 0;
//         });
//         buildSongTable(songs, "#song-table-body");
//     }

//     // event listener for table header to handle sorting
//     const header = document.querySelector("thead");
//     header.addEventListener("click", function(event) {
//         const target = event.target;
//         console.log(target);

//         if (target.matches("i")) {
//             console.log('target id', target.id);
//             document.querySelectorAll("i").forEach(i => {
//                 i.classList.remove("active-sort-arrow"); // gets all the i's and removes the active arrow class 
//             });
//             target.classList.add("active-sort-arrow"); // adds an active sort arrow class

//             //if selected sort is the same as the current sort then user intends to reverse current sort order
//             // otherwise sort by selected column
//             if (target.id == currentSort) {
//                 filteredSongs ? buildSongTable(filteredSongs.reverse(), "#song-table-body") : buildSongTable(songs.reverse(), "#song-table-body");
//             } else {
//                 filteredSongs ? alphaSortColumn(filteredSongs, target.id) : alphaSortColumn(songs, target.id);
//                 currentSort = target.id;
//             }
//         }
//     });



//     artists.forEach((artist) => {
//         populateOptions(artist.name, document.getElementById("artist-select"));

//     });

//     genres.forEach((genre) => {
//         populateOptions(genre.name, document.getElementById("genre-select"));
//     });

//     function buildSongTable(songs, tableBodyId) {
//         document.querySelector(tableBodyId).innerHTML = "";
//         for (let song of songs) {
//             outputTableRow(song, tableBodyId);
//         }
//     }

//     /*
//     this function wil output the table row by the passed in song to the specified table
//     */
//     function outputTableRow(song, tableBodyId) {
//         const parentElement = document.querySelector(tableBodyId);
//         const row = document.createElement("tr");
//         row.setAttribute("data-songID", song.song_id);
//         row.classList.add('table-row');

//         // creating the td for title 
//         const rowDataTitle = document.createElement("td");
//         rowDataTitle.classList.add("song-title-cell");
//         rowDataTitle.textContent = song.title;
//         rowDataTitle.classList.add("clicked-title-single");
//         row.appendChild(rowDataTitle);

//         // creating the td for artist name
//         const rowDataArtist = document.createElement("td");
//         rowDataArtist.textContent = song.artist.name;
//         row.appendChild(rowDataArtist);

//         // creating the td for song year
//         const rowDataYear = document.createElement("td");
//         rowDataYear.textContent = song.year;
//         row.appendChild(rowDataYear);

//         //creating the td for song genre
//         const rowDataGenre = document.createElement("td");
//         rowDataGenre.textContent = song.genre.name;
//         rowDataGenre.id = "genre-cell";
//         row.appendChild(rowDataGenre);

//         // creating the td for the song popularity 
//         const rowDataPopularity = document.createElement("td");
//         const popProgressBar = document.createElement("progress");
//         popProgressBar.max = 100;
//         popProgressBar.value = song.details.popularity;
//         rowDataPopularity.appendChild(popProgressBar);
//         row.appendChild(rowDataPopularity);

//         // creating td for the button 
//         const rowDataButton = document.createElement("td");
//         const buttonPlaylist = document.createElement("button");
//         buttonPlaylist.type = "button";
//         buttonPlaylist.setAttribute("data-songID", song.song_id);
//         //toggles Add/Remove button based on whether it already exists in the playlist or not
//         if (playlist.some((playlistSong) => playlistSong.song_id == song.song_id)) {
//             buttonPlaylist.textContent = "Remove";
//             buttonPlaylist.classList.add("playlist-remove-btn");
//         } else {
//             buttonPlaylist.textContent = "Add";
//             buttonPlaylist.classList.add("playlist-add-btn");
//         }

//         rowDataButton.appendChild(buttonPlaylist);
//         row.appendChild(rowDataButton);
//         parentElement.appendChild(row);

//     }

//     function populateOptions(title, parent) {
//         const opt = document.createElement("option");
//         opt.value = title;
//         opt.textContent = title;
//         parent.appendChild(opt);
//     }

//     document.querySelector("#filter-select").addEventListener("change", handleView)
//         /**
//          * This function handles the view of the search options and entered things. 
//          * @param {*} e 
//          */
//     function handleView(e) {
//         // initiating the selected filter
//         const selectedFilter = e.target.value;
//         console.log(e.target);
//         // gets all the search form elements with the hide class 
//         const hideArray = document.querySelectorAll("#song-search-form .hide")

//         //loop that goes through the array of all hidden classes and removes the hide class.
//         hideArray.forEach(hidden => (hidden.classList.remove("hide")));
//         // makeing an empty array that will store the elements we want to give the hide class back to. 
//         const elements = [];
//         console.log(selectedFilter);
//         // if target is same then put the elements we want to hide into the hide array so then they can be given the hide class 
//         if (selectedFilter == "title-filter") {
//             elements.push(document.querySelector("#artist-select").parentElement);
//             elements.push(document.querySelector("#genre-select").parentElement);
//         } else if (selectedFilter == "artist-filter") {
//             elements.push(document.querySelector("#song-title-search").parentElement);
//             elements.push(document.querySelector("#genre-select").parentElement);
//         } else {
//             elements.push(document.querySelector("#song-title-search").parentElement);
//             elements.push(document.querySelector("#artist-select").parentElement);
//         }
//         // adds the hide back to the elements thats in the array we set up for elements we want to hide. 
//         elements.forEach(elementType => (elementType.classList.add("hide")));
//     }

//     // sets search filters
//     document.querySelector("#search-btn").addEventListener("click", () => {
//         sessionStorage.clear();
//         let form = document.getElementById("song-search-form").elements;
//         let searchType;
//         let filter;

//         if (form.namedItem("song-title").value) {
//             searchType = 'title';
//             filter = form.namedItem("song-title").value;

//         } else if (form.namedItem("artist-name").value) {
//             searchType = 'artist';
//             filter = form.namedItem("artist-name").value;

//         } else if (form.namedItem("genre-name").value) {
//             searchType = 'genre';
//             filter = form.namedItem("genre-name").value;
//         }

//         sessionStorage.setItem(searchType, filter);
//     });
//     //clears search filters from sessionstorage
//     document.querySelector("#clear-btn").addEventListener("click", sessionStorage.clear());

//     //event listeners for table body using event delegation
//     function addTableListener(tableSelector) {
//         document.querySelector(tableSelector).addEventListener('click', (event) => { // this is getting an event listener for the entire table body.
//             //handle add to/remove from playlist btn clicks
//             if (event.target.matches(".playlist-add-btn")) {

//                 event.target.classList.remove("playlist-add-btn")
//                 event.target.classList.add("playlist-remove-btn")
//                 event.target.textContent = "Remove";

//                 const songId = event.target.attributes["data-songId"].value;
//                 addToPlaylist(songId);

//                 event.stopPropagation(); // prevent from triggering the row click listener

//             } else if (event.target.matches(".playlist-remove-btn")) {

//                 const songId = event.target.attributes["data-songId"].value;
//                 removeFromPlaylist(songId)

//                 //handle row removal if remove btn click occured from playlist table
//                 if (event.target.parentElement.parentElement.parentElement.id == "playlist-table-body") {
//                     let tableBodyElement = event.target.parentElement.parentElement.parentElement;
//                     let tableRowElement = event.target.parentElement.parentElement;
//                     tableBodyElement.removeChild(tableRowElement);
//                     //compute and show new playlist statistics
//                     analyzePlaylist()

//                 }

//                 event.target.classList.remove("playlist-remove-btn")
//                 event.target.classList.add("playlist-add-btn")
//                 event.target.textContent = "Add";

//                 event.stopPropagation(); // prevent from triggering the row click listener

//                 //direct row clicks to song details page
//             } else if (event.target.matches("tr td")) {

//                 const songId = event.target.parentElement.dataset.songid;
//                 singleSongPageView(songId);
//                 event.stopPropagation();
//             }
//         });
//     }


//     function addToPlaylist(songId) {
//         const songData = songs.find(song => {
//             return song.song_id == songId;
//         });
//         playlist.push(songData);
//         console.log("modified playlist", playlist);
//         localStorage.setItem("playlist", JSON.stringify(playlist));
//         makeToast(`"${songData.title}" Added to Playlist!`, '#toast', 3000);
//     }

//     function removeFromPlaylist(songId) {
//         const index = playlist.findIndex(song => {
//             return song.song_id == songId;
//         });
//         const title = playlist[index].title
//         playlist.splice(index, 1);
//         console.log('modified playlist', playlist)
//         localStorage.setItem("playlist", JSON.stringify(playlist));
//         makeToast(`"${title}" Removed from Playlist!`, '#toast', 3000);
//     }

//     function makeToast(msg, targetToast, timer) {
//         let toast = document.querySelector(targetToast);
//         if (targetToast == '#toast') {
//             toast.textContent = msg;
//         }
//         toast.classList.add("show");
//         setTimeout(() => { toast.classList.remove("show") }, timer);
//     }

//     function singleSongPageView(songId) {
//         const foundSongData = songs.find(song => song.song_id == songId);
//         console.log("target song data", foundSongData);
//         // select parent 
//         const ssParent = document.querySelector('.songview-parent');
//         ssParent.replaceChildren()

//         ssParent.appendChild(createInfopage(foundSongData));

//         console.log("title:", foundSongData.title);
//         switchDisplay("single-song-page");
//     }

//     //build song details page based on user-defined song
//     function createInfopage(foundSongData) {
//         const div = document.createElement("div");

//         // title 
//         let title = document.createElement("h2");
//         title.id = "titleSingle"
//         title.textContent = foundSongData.title;

//         //artist
//         let artistName = document.createElement("h3");
//         artistName.id = "artist-name";
//         artistName.textContent = "-" + foundSongData.artist.name + "-";

//         // artist type 
//         let artistType = document.createElement("h4");
//         artistType.id = "artist-type";

//         // find the artist type based on json artists file 
//         let artistnameLooking = foundSongData.artist.name;
//         let artistTypeFound;
//         for (let a of artists) {
//             if (a.name == artistnameLooking) {
//                 artistTypefound = a.type;
//             }
//         }
//         artistType.textContent = artistTypefound;
//         let subDiv = document.createElement("div");
//         subDiv.id = "songsubDiv";

//         //genre
//         let genre = document.createElement("h3");
//         genre.id = "genreSingle";
//         genre.textContent = foundSongData.genre.name;

//         // year 
//         let year = document.createElement("h3");
//         year.id = "yearSingle";
//         year.textContent = foundSongData.year;

//         // duration 
//         let duration = document.createElement("h3");
//         duration.textContent = convertTime(foundSongData.details.duration) + " min";

//         // popularity 
//         let popularity = document.createElement("h3");
//         popularity.id = "popularitySingle";
//         popularity.textContent = foundSongData.details.popularity + "% popular";

//         // BPM div with blinking background that matches actual bpm value
//         let bpmDiv = document.createElement("h2")
//         let bpm = foundSongData.details.bpm;
//         bpmDiv.textContent = "BPM: " + bpm;
//         bpmDiv.classList.add('bpm');
//         let beatSec = (60 / bpm);
//         bpmDiv.style.setProperty("animation", `blinkingBackground ${beatSec}s infinite`)


//         subDiv.appendChild(year);
//         subDiv.appendChild(duration);
//         subDiv.appendChild(genre);
//         subDiv.appendChild(popularity);
//         subDiv.appendChild(bpmDiv);

//         //gauge analysis circle
//         let gageDiv = createCircle(foundSongData);

//         // radar div
//         let radarDiv = document.createElement("div")
//         radarDiv.id = 'radarContainer';
//         let canvas = document.createElement("canvas")
//         canvas.id = 'radarChart';
//         radarDiv.appendChild(canvas);
//         drawRadar(canvas, foundSongData);

//         // adding created elements 
//         div.appendChild(title);
//         div.appendChild(artistName);
//         div.appendChild(artistType);

//         div.appendChild(subDiv);

//         div.append(gageDiv);
//         div.appendChild(radarDiv)
//         return div;
//     }

//     function convertTime(seconds) {
//         let minutes = Math.floor(seconds / 60);
//         seconds = seconds % 60;

//         //formatting to add zeros when necessary
//         if (seconds.toString().length == 1) {
//             seconds = "0" + seconds;
//         }
//         if (seconds.toString().length == 0) {
//             seconds = "00";
//         }
//         return minutes + ":" + seconds;
//     }

//     /**
//      * creates gauges based on song data
//      * @param {*} foundSongData 
//      * @returns gauges
//      */
//     function createCircle(foundSongData) {
//         let divGages = document.createElement("div");
//         divGages.classList = "wrap-circles";
//         divGages.id = "chart_div";
//         google.charts.setOnLoadCallback(() => drawChart(foundSongData));
//         return divGages;
//     }

//     //handles switch to playlist view from playlist btn click
//     document.querySelector("#playlistButton").addEventListener('click', () => {
//         buildSongTable(playlist, "#playlist-table-body");
//         addTableListener("#playlist-table-body");
//         switchDisplay("playlist-view");
//         analyzePlaylist()
//     });

//     //generates and displays details about playlist
//     function analyzePlaylist() {
//         let numSongs = playlist.length

//         const numParent = document.querySelector("#num-songs span");
//         numParent.textContent = numSongs;
//         console.log("num songs", numParent)

//         //generate average popularity of songs in playlist
//         let totalPop = playlist.reduce((total, song) => {
//             return total + song.details.popularity
//         }, 0)
//         let avgPop = totalPop / numSongs || 0 //set avg pop to 0 if it can't be computed because playlist is empty
//         avgPop = avgPop.toFixed(2);

//         const popParent = document.querySelector("#avg-pop span")
//         popParent.textContent = avgPop;


//         // mostFreq algorithm from https://www.geeksforgeeks.org/frequent-element-array/
//         /**
//          * Find mode of array
//          * @param {*} arrayName 
//          * @param {*} arrLength 
//          * @returns 
//          */
//         function mostFreq(arrayName, arrLength) {
//             let count = 0;
//             let maxCount;

//             for (let i = 0; i < arrLength; i++) {
//                 let amt = 0;
//                 for (let j = 0; j < arrLength; j++) {
//                     if (arrayName[i] == arrayName[j])
//                         amt++;
//                 }
//                 if (amt > count) {
//                     count = amt;
//                     maxCount = arrayName[i];
//                 }
//             }
//             return maxCount;
//         }

//         //GET TOP ARTIST
//         const nameArray = [];
//         playlist.forEach(song => {
//             nameArray.push(song.artist.name)
//         });
//         let artistNameLength = nameArray.length;

//         let output = mostFreq(nameArray, artistNameLength);
//         const topArtName = document.querySelector("#top-artist span");
//         topArtName.textContent = output || "None";


//         // GET TOP GENRE
//         const genreArray = [];
//         playlist.forEach(song => {
//             genreArray.push(song.genre.name);
//         });
//         let genreLength = genreArray.length;

//         let genreOutput = mostFreq(genreArray, genreLength);
//         const topGenName = document.querySelector("#top-genre span");
//         topGenName.textContent = genreOutput || "None";

//     }

//     //handles going back to default search view
//     document.querySelector("#searchButton").addEventListener('click', () => {
//         alphaSortColumn(songs, currentSort)
//         switchDisplay();
//     });


//     // build function that brings in the selected view they want. 
//     function switchDisplay(displayChoice) {
//         // removing all hide classes from all articles. 
//         document.querySelectorAll("article").forEach(hidden => (hidden.classList.remove("hide")))
//         const elementsToHide = [];

//         if (displayChoice == "single-song-page") {
//             elementsToHide.push(document.querySelector("#searchView"));
//             elementsToHide.push(document.querySelector("#playlistView"));
//         } else if (displayChoice == "playlist-view") {
//             elementsToHide.push(document.querySelector("#searchView"));
//             elementsToHide.push(document.querySelector("#songView"));
//         } else {
//             elementsToHide.push(document.querySelector("#songView"));
//             elementsToHide.push(document.querySelector("#playlistView"));
//         }
//         elementsToHide.forEach(elementType => (elementType.classList.add("hide")));

//     }

//     // generate credits toast
//     document.querySelector('#credits-btn').addEventListener('mouseover', () => {
//         makeToast('', "#credits-toast", 3000)
//     })

//     // clears playlist object and sessionstorage playlist object 
//     document.querySelector('#clear-playlist').addEventListener("click", () => {
//         localStorage.setItem("playlist", []);
//         playlist = []
//         buildSongTable(playlist, "#playlist-table-body");
//         analyzePlaylist()
//     })



//     /**
//      * IMPORTED GAUGES STUFF
//      * 
//      */
//     google.charts.load('current', {
//         'packages': ['gauge']
//     });

//     function drawChart(foundSongData) {
//         //initialize gauges to 0 so they can be animated to final value
//         var data = google.visualization.arrayToDataTable([
//             ['Label', 'Value'],
//             ['Acoustic', 0],
//             ['Speech', 0],
//             ['Energy', 0],
//             ['Valence', 0],
//             ['Dance', 0],
//             ['Live', 0],
//         ]);

//         var options = {
//             width: 800,
//             height: 120,
//             minorTicks: 5,
//             greenColor: "#89e5cd",
//             greenFrom: 75,
//             greenTo: 100,
//             animation: {
//                 easing: "linear",
//                 duration: 600
//             }
//         };

//         var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

//         chart.draw(data, options);

//         //gauge animation functions with staggered start times
//         setTimeout(function() {
//             data.setValue(0, 1, foundSongData.analytics.acousticness);
//             chart.draw(data, options);
//         }, 200);

//         setTimeout(function() {
//             data.setValue(1, 1, foundSongData.analytics.speechiness);
//             chart.draw(data, options);
//         }, 700);

//         setTimeout(function() {
//             data.setValue(2, 1, foundSongData.analytics.energy);
//             chart.draw(data, options);
//         }, 1200);

//         setTimeout(function() {
//             data.setValue(3, 1, foundSongData.analytics.valence);
//             chart.draw(data, options);
//         }, 1700);

//         setTimeout(function() {
//             data.setValue(4, 1, foundSongData.analytics.danceability);
//             chart.draw(data, options);
//         }, 2200);

//         setTimeout(function() {
//             data.setValue(5, 1, foundSongData.analytics.liveness);
//             chart.draw(data, options);
//         }, 2700);
//     }

//     /**
//      * builds song radar chart
//      * @param {*} canvas 
//      * @param {*} song 
//      */
//     function drawRadar(canvas, song) {

//         new Chart(canvas, {
//             type: 'radar',
//             data: {

//                 labels: ['Dance', 'Energy', 'Speech', 'Acoustic', 'Liveness', 'Valence'],
//                 datasets: [{
//                     label: 'Song Metrics',
//                     data: [song.analytics.danceability, song.analytics.energy, song.analytics.speechiness, song.analytics.acousticness, song.analytics.liveness, song.analytics.valence],
//                     fill: true,
//                     backgroundColor: 'rgba(217, 176, 140, 0.411)',
//                     borderColor: '#D9B08C',
//                     pointBackgroundColor: 'rgb(255, 99, 132)',
//                     pointBorderColor: '#fff',
//                     pointHoverBackgroundColor: '#fff',
//                     pointHoverBorderColor: 'rgb(255, 99, 132)'
//                 }]
//             },
//             options: {
//                 elements: {
//                     line: {
//                         borderWidth: 3
//                     }
//                 }
//             }
//         });
//     }

//     document.querySelector("#randomButton").addEventListener("click", event => {
//         alphaSortColumn(songs, "song_id")
//         let firstSongId = songs[0].song_id
//         let lastSongId = songs[songs.length - 1].song_id
//         let randomSongId = random(firstSongId, lastSongId)
//         console.log(randomSongId)
//         singleSongPageView(randomSongId)
//     })

//     /**
//      * abstracting this function because I can't believe javascript doesn't have a 
//      * built-in user-friendly random(min, max) function
//      */
//     function random(bottomRange, topRange) {
//         return Math.floor((Math.random() * (topRange - bottomRange + 1)) + bottomRange)
//     }

// });