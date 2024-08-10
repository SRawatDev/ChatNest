import express from "express"
import cors from "cors"
import connection from "./db/connection.js";
const port=4000;
const app=express()
app.use(cors(
    {
        origin:"*"
    }
))
app.use(express.json())
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
await connection()
