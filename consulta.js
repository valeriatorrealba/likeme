const { Pool } = require("pg");

const config = {
    host: "localhost",
    port: 5432,
    database: "likeme",
    user: "postgres",
    password: "0000",
};

const pool = new Pool(config);

const guardarPost = async(post) =>{
    const values = Object.values(post);
    const consulta = {
        text: "insert into posts (titulo, img, descripcion, likes) values ($1, $2, $3, 0) returning *",
        values, 
    }
    const result = await pool.query(consulta)
    return result;
}
const getPosts = async() =>{
    const result = await pool.query("select * from posts");
    return result.rows; 
}

const like = async(id)=>{
    const result = await pool.query(`update posts set likes = likes + 1 where id = ${id} returning *`)
    return (await result).rows;
}



module.exports = { guardarPost, getPosts, like };

// const almacenarPost = async(datos) =>{
//     const consulta = {
//         text: "insert into posts (titulo, img, descripcion, likes) values ($1, $2, $3, 0) returning *",
//         values: datos,
//     }
//     const result = await pool.query(consulta);
//     return result.rows;
// }