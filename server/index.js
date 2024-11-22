/**
 * @author Leviathenn
 */

const express = require("express")
const cors = require("cors")
const { existsSync } = require("fs")

let api = express();

api.get("/status/:container",(req,res)=>{
    if(existsSync(`./progdash.d/${req.params.container}`)){
        console.log("exists");
        setTimeout(()=>{
            res.json({response:true});
        },3000)
    }else{
        console.log("not exists")
        setTimeout(()=>{
            res.json({response:false});
        },3000)
    }
});

api.listen(3030, ()=>{
    console.log(`Server Listening on Port ":3030".`);
});