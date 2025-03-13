import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

/* Player stuff */

const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('playButton');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');
const volumeBar = document.getElementById('volumeBar');
const volumeContainer = document.getElementById('volumeContainer');
const muteButton = document.getElementById('muteButton');
const volumeIcon = document.getElementById('volumeIcon');
const muteIcon = document.getElementById('muteIcon');

let wasPlaying = false;
let previousVolume = 0.75;

// Format time in MM:SS
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Play/Pause
playButton.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
});

// Update play/pause button
audioPlayer.addEventListener('play', () => {
  playIcon.classList.add('hidden');
  pauseIcon.classList.remove('hidden');
});

audioPlayer.addEventListener('pause', () => {
  playIcon.classList.remove('hidden');
  pauseIcon.classList.add('hidden');
});

// Update progress bar and time
audioPlayer.addEventListener('timeupdate', () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progress}%`;
  currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
});

// Set duration when metadata is loaded
audioPlayer.addEventListener('loadedmetadata', () => {
  durationSpan.textContent = formatTime(audioPlayer.duration);
});

// Click on progress bar to seek
progressContainer.addEventListener('click', (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const pos = (e.clientX - rect.left) / rect.width;
  audioPlayer.currentTime = pos * audioPlayer.duration;
});

// Volume control
volumeContainer.addEventListener('click', (e) => {
  const rect = volumeContainer.getBoundingClientRect();
  const pos = (e.clientX - rect.left) / rect.width;
  audioPlayer.volume = Math.max(0, Math.min(1, pos));
  volumeBar.style.width = `${pos * 100}%`;
  previousVolume = audioPlayer.volume;
  updateVolumeIcon();
});

// Mute/Unmute
muteButton.addEventListener('click', () => {
  if (audioPlayer.volume > 0) {
    previousVolume = audioPlayer.volume;
    audioPlayer.volume = 0;
    volumeBar.style.width = '0%';
  } else {
    audioPlayer.volume = previousVolume;
    volumeBar.style.width = `${previousVolume * 100}%`;
  }
  updateVolumeIcon();
});

// Update volume icon based on volume level
const updateVolumeIcon = () => {
  if (audioPlayer.volume === 0) {
    volumeIcon.classList.add('hidden');
    muteIcon.classList.remove('hidden');
  } else {
    volumeIcon.classList.remove('hidden');
    muteIcon.classList.add('hidden');
  }
};

// Set initial volume
audioPlayer.volume = 0.75;
volumeBar.style.width = '75%';

// Handle loading state
audioPlayer.addEventListener('waiting', () => {
  playButton.classList.add('opacity-50');
});

audioPlayer.addEventListener('canplay', () => {
  playButton.classList.remove('opacity-50');
});

