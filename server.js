const express = require('express');
const path= require('path');
const { v4: uuidv4 } = require('uuid');
const server = require('http').Server(express);
const io = require('socket.io')(server);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));

app.set('view engine', 'ejs');
//app.set('views', path.json(__dirname, 'views'));


app.get('/', (req, res) => {
    //res.json('Server is running');
    res.redirect(`/${uuidv4()}`);
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/:room', (req, res) => {
    res.render('room', {roomId: req.params.room});
})


io.on('connection', socket => {
    socket.on('join-room', () => {
        console.log('Socketio Joined Room');
    })
})

//io.listen(port);


app.listen(port, () => {
    console.log(`Server is running ${port}`);
})