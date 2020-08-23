/* global HTMLMediaElement */

let video = document.getElementById("video_fondo"),
    btn1 = document.querySelector(".content button:nth-of-type(1)"),
    btn2 = document.querySelector(".content button:nth-of-type(2)"),
    barraProgreso = document.getElementById("progress_bar");

let readyStateInfo = [
    {
        "estado": "HAVE_NOTHING",
        "valor": 0,
        "descripción": "Información no disponible"
    },
    {
        "estado": "HAVE_METADATA",
        "valor": 1,
        "descripción": "Disponible suficiente información de metadatos que permite inicializar los atributos. 'Seeking' (propiedad o evento) no generará excepción"
    },
    {
        "estado": "HAVE_CURRENT_DATA",
        "valor": 2,
        "descripción": "Datos disponibles para reproducir la posición actual, pero no suficientes para reproducir más de un frame"
    },
    {
        "estado": "HAVE_FUTURE_DATA",
        "valor": 3,
        "descripción": "Datos disponibles para reproducir al menos dos frames: posición actual y siguiente"
    },
    {
        "estado": "HAVE_ENOUGH_DATA",
        "valor": 4,
        "descripción": "Datos disponibles que permiten reproducir el medio hasta el final sin interrupción"
    }
];

/*
    The @readyState IDL attribute represents the current state of the media element in relation to its playback 
    position. The available states are the following:

    • HAVE NOTHING (0):
      No information regarding the video resource is available, including its playback 
      position. This is typically the case before a media resource starts downloading. 
      Media elements whose @networkState attribute is set to NETWORK_EMPTY are 
      always in the HAVE_NOTHING @readyState.

    • HAVE_METADATA (1):
      The setup information of the media resource has been received, such that the 
      decoding pipeline is set up, the width and height of a video resource are known, 
      and the duration of the resource (if it can be determined) is available. Seeking 
      and decoding are now possible, even though no actual media data is available 
      yet for the current playback position. As the HAVE_METADATA state is reached, a 
      loadedmetadata event is fired.

    • HAVE CURRENT_DATA (2):
      Decoded media data for the current playback position is available, but either 
      there is not enough date to start playing back continuously or the end of the 
      playback direction has been reached. If this state is reached for the first time, 
      a loadeddata event is fired. Note that this state may not be taken, but rather a 
      HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA state may be directly achieved after
      HAVE_METADATA, in which case the loadeddata event is fired upon reaching them 
      for the first time. This state will also be reached when waiting for enough data to 
      download for playback (e.g. after a seek or after the buffered data ran out); in this 
      case, a waiting and a timeupdate event are fired.

    • HAVE FUTURE DATA (3):
      Decoded media data for the current playback position and the next position is 
      available (e.g., the current video frame and the one following it). If this state is 
      reached for the first time, a canplay event is fired. If the element is not paused 
      and not seeking and HAVE_FUTURE_DATA is reached, a playing event is fired. If 
      the browser actually starts playback at this stage, it may still need to stop soon 
      afterward to buffer more data.

    • HAVE_ENOUGH_DATA (4):
      Enough decoded media data is available for the current and next playback 
      positions and the network download rate is fast enough that the web browser 
      estimates that data will be fetched and decoded at the @defaultPlaybackRate 
      sufficiently to allow continuous playback to the end of the media resource 
      without having to stop for further buffering. If this state is reached without going 
      through HAVE_FUTURE_DATA, a canplay event is fired. If the element is not paused 
      and not seeking and this state is reached without going through HAVE_FUTURE_DATA, 
      a playing event is fired. lithe HAVE_ENOUGH_DATA state is reached for the first 
      time, a canplayt hrough event is fired.

    Source: Beginning HTML5 Media: Make the most of the new video and audio standards for the Web, by Silvia Pfeiffer and Tom Green
*/

function toggleRun(e) {
    if (video.paused) {
        video.play();
        e.target.textContent = "Detener";
        e.target.blur(); // blur method removes focus from the current element.
    } else {
        video.pause();
        e.target.textContent = "Reanudar";
    }
}

function toggleLoop(e) {
    video.loop = !video.loop;
    if (video.loop) {
        e.target.textContent = "Desactivar bucle";
    } else {
        e.target.textContent = "Activar bucle";
    }
}

/*
    How to define a custom property for all media elements which determines whether such media is currently being played or not:
        https://stackoverflow.com/questions/6877403/how-to-tell-if-a-video-element-is-currently-playing
        https://medium.com/better-programming/javascript-bang-bang-i-shot-you-down-use-of-double-bangs-in-javascript-7c9d94446054
 */

Object.defineProperty(HTMLMediaElement.prototype, "playing", {
    get: function () {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2); // the double-bang (!!) returns the boolean true/false association of a value
    }
});

btn1.addEventListener("click", toggleRun);
btn2.addEventListener("click", toggleLoop);

document.addEventListener("DOMContentLoaded", e => { // DOMContentLoaded can also be listened for on the window interface to be handled in the capture or bubbling phases
    console.log("DESDE EVENTO document.DOMContentLoaded");
    console.log(`Se está reproduciendo: ${video.playing ? "SÍ" : "NO"}`);
    console.table(readyStateInfo[readyStateInfo.findIndex(s => s.valor === video.readyState)]);
});

window.addEventListener("load", e => {
    console.log("DESDE EVENTO window.load");
    console.log(`Se está reproduciendo: ${video.playing ? "SÍ" : "NO"}`);
    console.table(readyStateInfo[readyStateInfo.findIndex(s => s.valor === video.readyState)]);
});

video.addEventListener("loadedmetadata", e => {
    console.log("Metadata for video loaded. State: " + video.readyState);
});

/*
    The loadeddata event is fired when the frame at the current playback position of the media has finished loading (often the first frame),
    that is, video readyState property just increased to HAVE_CURRENT_DATA or greater for the first time.
*/
video.addEventListener("loadeddata", e => {
    console.log("Browser has loaded the current frame. State: " + video.readyState);
});

/*
    The canplay event occurs when the browser can start playing the media, that is when it has buffered enough to begin 
    but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.
*/
video.addEventListener("canplay", e => {
    console.log("Now video can start, but not sure it will play through");
});

/*
    The canplaythrough event occurs when video can be played all the way through, without stopping.
*/
video.addEventListener("canplaythrough", e => {
    console.log("Now video can be played through without ever having to stop to buffer");
});

video.addEventListener("ended", e => {
    e.target.currentTime = 0;
    btn1.textContent = "Iniciar";
});

video.addEventListener("timeupdate", e => {
    let value = (video.currentTime / video.duration) * 100;
    barraProgreso.value = value;
});

barraProgreso.addEventListener("click", e => {
    let tiempo = (e.clientX / window.innerWidth) * video.duration;
    video.currentTime = tiempo;
});
