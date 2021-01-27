
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;


let videoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
})
.then( stream => {
    videoStream = stream;
    addVideoStream(myVideo, stream);
})
.catch( error => console.log('User Stream Error: ' + error));

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);

}