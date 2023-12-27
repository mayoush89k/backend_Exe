import express from "express";

const server = express()

server.get('/numbers', ((req , res) => {
    res.end(`success using ${req.method} in ${req.url}`)
}))
server.post('/numbers', ((req , res) => {
    res.end(`success using ${req.method} in ${req.url}`)
}))
server.delete('/numbers', ((req , res) => {
    res.end(`success using ${req.method} in ${req.url}`)
}))
server.put('/numbers', ((req , res) => {
    res.end(`success using ${req.method} in ${req.url}`)
}))

server.listen(4545, () => {
    console.log("server is listening")
})