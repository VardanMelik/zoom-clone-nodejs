const socket = io();

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

try {
    socket.emit('join-room', ROOM_ID);
    console.log('client-join-room');
} catch(e) {
    console.log('emit error:' + e);
}

try {
    socket.on('user-connected', () => {
        connectToNewUser();
    })
} catch(e) {
    console.log('New user connection error: ' + e);
}

const connectToNewUser = () => {
    console.log('New user');
}


const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);

}