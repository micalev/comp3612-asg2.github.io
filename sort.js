// Function to sort songs based on the provided criteria
function sortSongsBy(sortBy, songs) {
if (songs) {
    let sortedSongs = [];

    switch (sortBy) {
        case 'sort-by-title':
            sortedSongs = songs.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'sort-by-artist':
            sortedSongs = songs.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
            break;
        case 'sort-by-year':
            sortedSongs = songs.sort((a, b) => a.year - b.year);
            break;
        case 'sort-by-genre':
            sortedSongs = songs.sort((a, b) => a.genre.name.localeCompare(b.genre.name));
            break;
        default:
            sortedSongs = songs; // Default to original order if no valid sorting criteria
            break;
    }

    displaySearchResults(sortedSongs);
}
}