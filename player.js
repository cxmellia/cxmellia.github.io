
let currentTrack = 0;

/* All features that needs to be functional to create a better user experience */
const track = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const audioTitle = document.querySelector('.track-title');
const disk = document.querySelector('.trackDisk');

const currentTime = document.querySelector('.time-current');
const trackDuration = document.querySelector('.duration-song');
const playbutton = document.querySelector('.clickBTN');

const nextbutton = document.querySelector('.next');
const backbutton = document.querySelector('.backtrack');

/* Play Button JS Code*/
/* to make play/pause button clickable; make music play/stop; make disk turn/stop*/
playbutton.addEventListener('click', () => {
    if(playbutton.className.includes('pause')){
        track.play();
    }
    else{
        track.pause();
    }
    playbutton.classList.toggle('pause');
    disk.classList.toggle('play');
})



/* Seek Bar JS Code */
// to manage the tracks
const setTrack = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentTrack = i;
    track.src = song.path;

    audioTitle.innerHTML = song.name;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = track.duration;
        trackDuration.innerHTML = formatTime(track.duration);
    }, 300);
}
setTrack(0)

/* To format time stamp; showcasing minutes and seconds of the track */
const formatTime = (length) => {
    let min = Math.floor(length / 60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(length % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

// for it to function; run
setInterval(() =>{
    seekBar.value = track.currentTime;
    currentTime.innerHTML = formatTime(track.currentTime);

    // for continuous running !!
    if (Math.floor(track.currentTime) == Math.floor(seekBar.max)){
        nextbutton.click();
    }

}, 500)

// for user to click and jump to any timestamp in the seek bar
seekBar.addEventListener('change', () => {
    track.currentTime = seekBar.value;
})


/* Other buttons to function */
const playTrack = () => {
    track.play();
    playbutton.classList.remove('pause');
    disk.classList.add('play');

}
nextbutton.addEventListener('click', () =>{
    if(currentTrack >= songs.length - 1){
        currentTrack = 0;
    }
    else{
        currentTrack++;
    }
    setTrack(currentTrack);
    playTrack();
})

backbutton.addEventListener('click', () =>{
    if(currentTrack <= 0){
        currentTrack = songs.length -1;
    }
    else{
        currentTrack--;
    }
    setTrack(currentTrack);
    playTrack();
})
