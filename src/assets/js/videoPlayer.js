import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video"); 
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () =>{
    const videoId = window.location.href.split("/videos/")[1];
    fetch(`/api/${videoId}/view`, {method: "POST"});
}


function handlePlayClick(){
    if(videoPlayer.paused){
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }else{
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function handleVolumeClick(){
    if(videoPlayer.muted){
        videoPlayer.muted = false;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        volumeRange.value = videoPlayer.volume;
        if(volumeRange.value >= 0.7){
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else if(volumeRange.value >= 0.2){
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else{
            volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
        }
    }else{
        videoPlayer.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
        volumeRange.value = 0;
    }
}



function goFullScreen(){
    if (videoContainer.requestFullscreen){
        videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullScreen){
        videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen){
        videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen){
        videoContainer.msRequestFullscreen();
    }
    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>'
    fullScreenBtn.removeEventListener("click",goFullScreen);
    fullScreenBtn.addEventListener("click",exitFullScreen);
}

function exitFullScreen(){
    if (document.exitFullscreen){
        document.exitFullscreen().catch(err=>Promise.resolve(err));
    } else if (document.mozCancelFullScreen){
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen){
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen){
        document.msExitFullscreen();
    }
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenBtn.removeEventListener("click",exitFullScreen);
    fullScreenBtn.addEventListener("click", goFullScreen);

}

const formatDate = seconds => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (totalSeconds < 10) {
      totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
};

async function setTotalTime(){
    const blob = await fetch(videoPlayer.src).then(response => response.blob());
    const duration = await getBlobDuration(blob);
    const totalTimeString = formatDate(duration);
    totalTime.innerHTML = totalTimeString;
}

function setCurrentTime(){
    const currentTimeString = formatDate(Math.floor(videoPlayer.currentTime));
    currentTime.innerHTML = currentTimeString;
}

function handleEnded(){
    registerView();
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}
function handleDrag(event){
    const {target: { value }} = event;
    videoPlayer.volume = value;
    if(value >= 0.7){
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else if(value >= 0.2){
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else{
        volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    }
}

function init(){
    videoPlayer.volume = 0.5;
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScreenBtn.addEventListener("click", goFullScreen);
    videoPlayer.addEventListener("loadedmetadata",setTotalTime);
    videoPlayer.addEventListener("timeupdate",setCurrentTime);
    videoPlayer.addEventListener("ended",handleEnded);
    volumeRange.addEventListener("input",handleDrag);
}

if(videoContainer){
    init();
}