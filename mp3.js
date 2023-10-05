const playList = document.getElementById("palylistContainer");
const audioTag = document.getElementById("audioply");
const displayTag = document.getElementById("times");
const progressBar = document.getElementById("progress_bar")
const pauseBtn = document.getElementById("pauseBtn");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const forwardBtn = document.getElementById("forwardBtn");
const playText = document.getElementById("playing")

const track = [
    { trackId: "./music/Dead.mp3", title: "Dead _ Unknownbrain" },
    { trackId: "./music/faceless.mp3", title: "Faceless _ NCS" },
    { trackId: "./music/fallingDown.mp3", title: "FallingDown _ NCS" },
    { trackId: "./music/saygoodbye.mp3", title: "SayGood Bye _ Unknownbrain" },
    { trackId: "./music/wherewestarted.mp3", title: "Where We Started _ NCS" }
];

// loop for show songs names and click play

for (let i = 0; i < track.length; i++) {
    const trkTag = document.createElement("div");
    trkTag.classList.add("trackItem");
    trkTag.addEventListener("click", () => {
        currentPlayIndex = i;
        playSongs();


    })

    const trackName = (i + 1).toString() + ". " + track[i].title;
    trkTag.textContent = trackName;
    playList.append(trkTag);

};

// play n pause  btn
let currentPlayIndex = 0;
let isPlaying = false;
playBtn.addEventListener("click", () => {
    const currenTime = Math.floor(audioTag.currentTime);

    isPlaying = true;

    if (currenTime === 0) {
        playSongs()

    } else {
        audioTag.play();
        toChangeBtn()
    }
});

pauseBtn.addEventListener("click", () => {
    isPlaying = false;
    audioTag.pause();
    toChangeBtn();
});

const toChangeBtn = () => {
    if (isPlaying === true) {
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline"
    } else {
        playBtn.style.display = "inline";
        pauseBtn.style.display = "none";
    }
};

pauseBtn.addEventListener("click", () => {
    isPlaying = false;
    audioTag.pause();
    toChangeBtn();
});

// prev and next btn
prevBtn.addEventListener("click", () => {
    if (currentPlayIndex === 0) {
        return
    };
    currentPlayIndex -= 1;
    playSongs()

});

const playSongs = () => {
    const mainList = track[currentPlayIndex].trackId;
    const mainTitle = track[currentPlayIndex].title;
    playText.innerText = mainTitle;
    audioTag.src = mainList;
    audioTag.play();
    isPlaying = true;
    toChangeBtn();

}

forwardBtn.addEventListener("click", () => {
    if (currentPlayIndex === track.length - 1) {
        return
    }
    currentPlayIndex += 1;
    playSongs()
})


// timeupdates

let durafortotalTime = "00:00";
let duration;
audioTag.addEventListener("loadeddata", () => {
    duration = Math.floor(audioTag.duration); // 123.123
    durafortotalTime = forMinuteAndSesondText(duration)
});

audioTag.addEventListener("timeupdate", () => {
    const currenTime = Math.floor(audioTag.currentTime)
    const currentText = forMinuteAndSesondText(currenTime);
    const totalTimesText = currentText + " / " + durafortotalTime
    displayTag.textContent = totalTimesText
    upgradeProgressBar(currenTime);
});

function forMinuteAndSesondText(totalSeconds) {
    const minute = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const minuteText = minute < 10 ? "0" + minute.toString() : minute;
    const secText = seconds < 10 ? "0" + seconds.toString() : seconds;

    return minuteText + ":" + secText
};

//progress bar


const upgradeProgressBar = (fireTimes) => {
    let progressTimes = 500 / duration * fireTimes;
    progressBar.style.width = progressTimes + "px"
}