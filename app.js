const express = require("express");
const app = express();

const {guardarPost, getPosts, like } = require("./consulta"); 

app.listen(3000, console.log("Servidor en linea"))

app.use(express.json())//middleware

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/post", async (req, res) =>{
    try {
        const post = req.body;
        const result = await guardarPost(post);
        res.send(result)
    } catch (error) {
        res.status(500).send("algo salio mal 😢...")
    }
});

app.get("/posts", async (req, res) => {
    try {
        const posts = await getPosts();
        res.send(posts);
    } catch (error) {
        res.status(500).send("algo salio mal 😢...")
    }
})

app.put("/post", async (req, res) =>{
    try {
        let { id } = req.query;
        const posts = await like(id);
        res.send(posts)
    } catch (error) {
        res.status(500).send("algo salio mal 😢...")
    }
})

// app.post("/post", async (req, res) =>{
//     try {
//         const { titulo, img, descripcion } = req.body;
//         const data = [titulo, img, descripcion,0];
//         const result = await almacenarPost(data);
//         res.json(result)
//     } catch (error) {
//         res.status(500).send("algo salio mal 😢...")
//     }
// })