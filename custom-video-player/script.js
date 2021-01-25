const video = document.querySelector('#video');
const stop = document.querySelector('#stop');
const play = document.querySelector('#play');
const sound = document.querySelector('#sound');
const progress = document.querySelector('#progress');
const timestamp = document.querySelector('#timestamp');


// ----- Functions -----
// Play & Pause the video
function toggleVideoStatus() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play & pause icons
function updatePlayIcon() {
  if(video.paused) {
    play.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
  } else {
    play.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
  }
}

// Update Progress & Timestamp
function updateProgress() {
  // console.log(video.currentTime);
  // console.log(video.duration);

  progress.value = (video.currentTime / video.duration) * 100;

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if(mins < 10) {
    mins = '0' + String(mins);
  }
  
  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if(secs < 10) {
    secs = '0' + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`
}


    
// Set Video Time to Progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop Video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Mute video 
function muteVideo() {
  let isMuted = video.muted;
  
  if(!isMuted) {
    video.muted = true;
    sound.innerHTML = `<i class="fa fa-volume-mute fa-2x"></i>`;
  } else {
    video.muted = false;
    sound.innerHTML = `<i class="fa fa-volume-up fa-2x"></i>`;
  }
}



// ----- Event Listeners -----
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);

sound.addEventListener('click', muteVideo);