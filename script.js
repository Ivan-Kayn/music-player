const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const music = document.querySelector('audio');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const playBtn = document.querySelector('#play');
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const currentTimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');

// music
const songs = [
    {
        name: 'heathens-piano',
        displayName: 'Heathens piano arrangement',
        artist: '21 Pilots',
    },
    {
        name: 'beautiful-lie',
        displayName: 'Beautiful Lie',
        artist: 'Hans Zimmer',
    },

]

// check if playing
let isPlaying = false;

// play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
    playBtn.setAttribute('title', 'Pause');

    music.play();
}

// pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause-circle', 'fa-play-circle');
    playBtn.setAttribute('title', 'Play');

    music.pause();
}

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `./music/${song.name}.mp3`;
    image.src = `./img/${song.name}.jpg`;

}

// current song
let songIndex = 0;

// next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// prev song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// on load - select first song
loadSong(songs[songIndex]);


// play or pause event listener
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
})

// update progress bar
function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.target;
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // calculate duration and pass it to element
        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // calculate current duration and pass it to element
        let currentDurationMinutes = Math.floor(currentTime / 60);
        let currentDurationSeconds = Math.floor(currentTime % 60);
        if (currentDurationSeconds < 10) {
            currentDurationSeconds = `0${currentDurationSeconds}`;
        }

        // delay switching duration element to avoid NaN
        if(currentDurationSeconds) {
            currentTimeEl.textContent = `${currentDurationMinutes}:${currentDurationSeconds}`;
        }
        // delay switching duration element to avoid NaN
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
    }
}

// set progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const progressWidth = e.offsetX;
    const {duration} = music;
    music.currentTime = (progressWidth/width) * duration;
    progress.style.width = `${ Math.floor((progressWidth/width) * 100)}%`;

}

// event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar);
