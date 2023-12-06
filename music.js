const darkInput = document.getElementById("checkbox");
const bodyEl = document.querySelector("body");
const playerEl = document.querySelector(".player");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
const addtoPlaylistBTn = document.getElementById("addToplaylist");
const createPlaylistbtn = document.getElementById("createplaylist");
const playlistInput = document.getElementById("playlistInput");
const currentPlaylistNameEl = document.getElementById("currPlaylist");
const currentPlaylistSongsEl = document.getElementById("currPlaylistSongs");
const allplaylistEl = document.getElementById("Allplaylist");
const audioElement = document.querySelector("audio");
const audioSrc = document.getElementById("audiosrc");
const audioImg = document.querySelector("img");
const allSongsEl = document.querySelector("#allsongs");
const songName = document.getElementById("songname");
const songSearchInput = document.getElementById("songSearch");
const songSearchBtn = document.getElementById("songSearchBtn");
const playlistSearchInput = document.getElementById("playlistSearch");
const playlistSearchBtn = document.getElementById("playlistSearchBtn");
const songsRefresh = document.getElementById("allsongsRefresh");
const playlistRefresh = document.getElementById("allplaylistsRefresh");

let currSong;
let currList;

const playLists = [];
const audioFiles = [
  {
    Image: "https://i.scdn.co/image/ab67616d0000b273aeb151f6774b6edf52195631",
    song: "./audio/Arjanvailly.mp3",
    songName: "Arjan Vailly",
    category: "Punjabi",
    id: 0,
  },
  {
    Image: "https://i.scdn.co/image/ab67616d0000b27360dbbb589dff0c57a3a4ffb2",
    song: "./audio/Chaleya.mp3",
    songName: "Chaleya",
    category: "Hindi",
    id: 1,
  },
  {
    Image: "https://i.scdn.co/image/ab67616d0000b273d2be316742edcc853ea55141",
    song: "./audio/ChandSifarish.mp3",
    songName: "Chand Sifarish",
    category: "Hindi",
    id: 2,
  },
  {
    Image: "https://i.scdn.co/image/ab67616d0000b2730276236d403fd127cbb3dd68",
    song: "./audio/whtotherpeoplesay.mp3",
    songName: "What Other People Say",
    category: "English",
    id: 3,
  },
  {
    Image: "https://i.scdn.co/image/ab67616d0000b273050aa2ba1ea0f6b96f4de231",
    song: "./audio/MiAmor.mp3",
    songName: "Mi Amor",
    category: "Lofi",
    id: 4,
  },
  {
    Image: "https://i.scdn.co/image/ab67616d0000b273ba4cad4533efdd06fa843a39",
    song: "./audio/yourpower.mp3",
    songName: "Your Power",
    category: "English",
    id: 5,
  },
];

function eventRemove(div, paraSong, removebtn) {
  removebtn.addEventListener("click", () => {
    let songs = currList.songs.filter(
      (item) => item.songName !== paraSong.textContent
    );
    currList.songs = [];
    for (let item of songs) {
      currList.songs.push(item);
    }
    div.remove();
  });
}

function currPlaylistSongs() {
  currentPlaylistSongsEl.innerHTML = "";
  for (let i in currList.songs) {
    const newDiv = document.createElement("div");
    const newBtn = document.createElement("button");
    const newSong = document.createElement("p");
    newSong.textContent = currList.songs[i].songName;
    newSong.classList.add("item");
    newBtn.type = "button";
    newBtn.textContent = "Remove";
    newDiv.appendChild(newSong);
    newDiv.appendChild(newBtn);
    currentPlaylistSongsEl.appendChild(newDiv);
    newSong.addEventListener("click", () => {
      addSongToMainPlayer(songs[i].id);
    });
    eventRemove(newDiv, newSong, newBtn);
  }
}

function eventPlaylist(playlistEl) {
  playlistEl.addEventListener("click", () => {
    const textCnt = playlistEl.textContent;
    currList = playLists.find((item) => item.name === textCnt);
    currentPlaylistNameEl.textContent = currList.name;
    currPlaylistSongs();
  });
}

function addsinglePlaylist(playlistName, songsarr, create) {
  const newPlaylist = document.createElement("p");
  newPlaylist.textContent = playlistName;
  newPlaylist.classList.add("item");
  newPlaylist.classList.add("item");
  allplaylistEl.append(newPlaylist);
  if (create) {
    playLists.push({ name: playlistName, songs: songsarr });
  }
  eventPlaylist(newPlaylist);
}

function addPlaylist() {
  const playlistName = playlistInput.value.trim();
  playlistInput.value = "";
  if (playlistName.trim().length === 0) {
    alert("Enter Valid Name!!");
    return;
  } else {
    addsinglePlaylist(playlistName, [], true);
  }
}

function addSongToMainPlayer(index) {
  currSong = index;
  songName.textContent = audioFiles[index].songName;
  audioSrc.src = audioFiles[index].song;
  audioImg.src = audioFiles[index].Image;
  audioElement.load();
  setTimeout(() => {
    audioElement.play();
  }, 1000);
}

function allsongs() {
  for (let i in audioFiles) {
    addSongToAllSongs(i);
  }
}

function eventPrevNext() {
  nextBtn.addEventListener("click", () => {
    if (currSong < audioFiles.length - 1) {
      addSongToMainPlayer(currSong + 1);
    } else {
      addSongToMainPlayer(0);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currSong > 0) {
      addSongToMainPlayer(currSong - 1);
    } else {
      addSongToMainPlayer(audioFiles.length - 1);
    }
  });

  addtoPlaylistBTn.addEventListener("click", () => {
    if (currSong !== -1 && currList) {
      if (
        currList.songs.findIndex(
          (item) => item.id === audioFiles[currSong].id
        ) !== -1
      ) {
        alert("This song already exist in the playlist");
        return;
      }
      currList.songs.unshift(audioFiles[currSong]);
      currPlaylistSongs();
    }
  });
}

function addSongToAllSongs(index) {
  const newSong = document.createElement("p");
  newSong.textContent = audioFiles[index].songName;
  newSong.classList.add("item");
  allSongsEl.append(newSong);
  newSong.addEventListener("click", () => {
    addSongToMainPlayer(audioFiles[index].id);
  });
}

function SearchEvents() {
  songSearchBtn.addEventListener("click", () => {
    const songToSearch = songSearchInput.value.trim().toLowerCase();
    const index = audioFiles.findIndex((item) => {
      return item.songName.toLowerCase() === songToSearch;
    });

    songSearchInput.value = "";
    if (index === -1) {
      alert("Song not found");
      return;
    }
    allSongsEl.innerHTML = "";
    addSongToAllSongs(index);
  });

  playlistSearchBtn.addEventListener("click", () => {
    const playlistToSearch = playlistSearchInput.value.trim().toLowerCase();
    const index = playLists.findIndex(
      (item) => item.name.toLowerCase() === playlistToSearch
    );
    playlistSearchInput.value = "";
    if (index === -1) {
      alert("Playlist not found");
      return;
    }
    allplaylistEl.innerHTML = "";
    addsinglePlaylist(playLists[index].name, playLists[index].songs, false);
  });
}

function refreshEvents() {
  songsRefresh.addEventListener("click", () => {
    document.querySelector("select").options[0].selected = true;
    allSongsEl.innerHTML = "";
    allsongs();
  });

  playlistRefresh.addEventListener("click", () => {
    allplaylistEl.innerHTML = "";
    for (let item of playLists) {
      addsinglePlaylist(item.name, item.songs, false);
    }
  });
}

function filterSongs() {
  document.querySelector("select").addEventListener("change", (event) => {
    allSongsEl.innerHTML = "";
    if (event.target.value === "All") {
      allsongs();
    } else {
      for (let i in audioFiles) {
        if (
          audioFiles[i].category.toLowerCase() ===
          event.target.value.toLowerCase()
        ) {
          addSongToAllSongs(i);
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createPlaylistbtn.addEventListener("click", addPlaylist);

  darkInput.addEventListener("click", () => {
    bodyEl.classList.toggle("darkgray");
    playerEl.classList.toggle("lgtblue");
    playerEl.classList.toggle("lgtwhite");
  });
  eventPrevNext();
  allsongs();
  SearchEvents();
  refreshEvents();
  filterSongs();
});
