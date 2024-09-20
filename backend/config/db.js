const moongoes = require("mongoose");

const connectDb = async ()=>{
    try {
        const connection = await moongoes.connect("mongodb://localhost:27017/technoTr4Project");
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;