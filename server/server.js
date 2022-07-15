require("dotenv").config()
const express  = require("express")
const app = express()
const cors = require("cors")
const DBConnect = require("./DB/database")
const cookieParser = require('cookie-parser');
const ACTIONS = require('../server/actions')
DBConnect()


const server = require('http').createServer(app)


const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET','POST']
    }
})

app.use(cookieParser());
app.use(express.json({limit: "8mb"}))
app.use(express.urlencoded({ extended: false }))
app.use('/storage',express.static("storage"));
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}))



app.get("/",(req,res) => {
    res.send("Server is Running...")
})



// Sockets


const socketUserMapping = {

}

io.on('connection', (socket) => {
    console.log('New connection: ', socket.id)
    socket.on(ACTIONS.JOIN, ({roomId, user}) => {
        socketUserMapping[socket.id] = user;
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
        clients.forEach(clientId => {
            io.to(clientId).emit(ACTIONS.ADD_PEER, {})        
        })
        socket.emit(ACTIONS.ADD_PEER, {})
        socket.join(roomId);
    })

})



app.use("/api",require("./routes/routes"))

const port = process.env.PORT || 5500
server.listen(port,() => {
    console.log("App is alive on http://localhost:5500")
})
