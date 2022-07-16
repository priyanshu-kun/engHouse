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
            io.to(clientId).emit(ACTIONS.ADD_PEER, {
                peerId: socket.id,
                createOffer: false,
                user
            })        
            socket.emit(ACTIONS.ADD_PEER, {peerId: clientId,createOffer: true,user: socketUserMapping[clientId]})
        })
        socket.join(roomId);
    })


    // Handle realy ICE
    socket.on(ACTIONS.RELAY_ICE, ({peerId, icecandidate}) => {
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
            peerId: socket.id,
            icecandidate
        })
    })


    // Handle relay sdp 
    socket.on(ACTIONS.RELAY_SDP, ({peerId, sessionDescription}) => {
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
            peerId: socket.id,
            sessionDescription
        })
    })

    const leaveRoom = () => {
        const {rooms} = socket;
        Array.from(rooms).forEach(roomId => {
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
            clients.forEach(clientId => {
                io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
                    peerId: socket.id,
                    userId: socketUserMapping[socket.id]?.id
                })
                socket.emit(ACTIONS.REMOVE_PEER, {
                    peerId: clientId,
                    userId: socketUserMapping[clientId]?.id
                })
            })
            socket.leave(roomId)
        }) 
        delete socketUserMapping[socket.id]
    }
    socket.on(ACTIONS.LEAVE, leaveRoom)
    socket.on('disconnecting',leaveRoom)
})



app.use("/api",require("./routes/routes"))

const port = process.env.PORT || 5500
server.listen(port,() => {
    console.log("App is alive on http://localhost:5500")
})
