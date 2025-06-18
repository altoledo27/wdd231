import {songs} from '../data/list-music.mjs';

const containerSong = document.querySelector('#songs-box');

function displaySongCards(songs){
    containerSong.innerHTML="";
    songs.forEach(song => {
        let card = document.createElement("section");
        let divisor = document.createElement("div");
        let nameSong = document.createElement("h3");
        let artist = document.createElement("h4");
        let album = document.createElement("p");
        let relaised = document.createElement("p");
        let urlSong = document.createElement("p");
        let portrait = document.createElement("img");

        card.classList.add("song-card");
        divisor.classList.add("song-text");
        nameSong.textContent = song.name;
        nameSong.classList.add("song-name");
        artist.innerHTML = `<strong>by</strong>: ${song.artist}`;
        album.innerHTML = `<strong>Album</strong>: ${song.album}`;
        relaised.innerHTML = `${song.relaised}`;
        portrait.setAttribute("src", song.imgUrl);
        portrait.setAttribute("alt", `Img of ${song.album}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "100");
        portrait.setAttribute("height", "100");
        portrait.classList.add("song-img");
        urlSong.innerHTML = `<a target="_blank" href="${song.urlSong}"><strong>Watch it here!</strong></a>`

        divisor.appendChild(artist);
        divisor.appendChild(album);
        divisor.appendChild(relaised);
        divisor.appendChild(urlSong);
        card.appendChild(nameSong);
        card.appendChild(portrait);
        card.appendChild(divisor);
        

        containerSong.appendChild(card);
    });
}

//All Songs
const allSongs = document.querySelector("#allSongs");
allSongs.addEventListener("click", () => {
    displaySongCards(songs);
});
const rmSongs = document.querySelector("#rmSongs");
rmSongs.addEventListener("click", () => {
    displaySongCards(songs.filter(song => song.artist === "RM"));
});
const jinSongs = document.querySelector("#jinSongs");
jinSongs.addEventListener("click", () => {
    displaySongCards(songs.filter(song => song.artist === "Jin"));
});
const sugaSongs = document.querySelector("#sugaSongs");
sugaSongs.addEventListener("click", () => {
    displaySongCards(songs.filter(song => song.artist === "SUGA"));
});
const jhopeSongs = document.querySelector("#jhopeSongs");
jhopeSongs.addEventListener("click", () => {
    displaySongCards(songs.filter(song => song.artist === "j-hope"));
});
const jiminSongs = document.querySelector("#jiminSongs");
jiminSongs.addEventListener("click", () => {
    displaySongCards(songs.filter(song => song.artist === "Jimin"));
});
const vSongs = document.querySelector("#vSongs");
vSongs.addEventListener("click", () => {
    displaySongCards(songs.filter(song => song.artist === "V"));
});
const jkSongs = document.querySelector("#jkSongs");
jkSongs.addEventListener("click", () => {
    displaySongCards(songs.filter(song => song.artist === "Jung Kook"));
});
const btsSongs = document.querySelector("#btsSongs");
btsSongs.addEventListener("click", () => {
    displaySongCards(songs.filter(song => song.artist === "Jung Kook"));
});
