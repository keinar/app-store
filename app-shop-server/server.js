// const fs = require('fs');
// // סינכרוני
// const data = fs.readFileSync("keinar.txt", "utf8");

// console.log(data);
// // event loop 
// //אסינכרוני
// fs.readFile("file.txt", "utf8", (err, data1) => {
//     console.log("after reading text");
//     console.log(data1);
// });

// console.log("before reading text");





// const fs = require("fs");

// fs.readFile("keinar.json", "utf8",(err, data) =>{
//     const keinar = JSON.parse(data)
//     keinar.push({
//         id:3,
//         title: "new item",
//     });
//     fs.writeFile("keinar.json", JSON.stringify(keinar),(err) => {});
// } );


// const http = require("http");

const fs = require('fs');
const express = require("express");
const app = express();

app.get('/products', (req, res) => {
    fs.readFile("./keinar.json", "utf8", (err, data) => {
        if(err){
            res.send("500");
        }else{
            res.send(JSON.parse(data));        
        }
    });
});

app.get('/products/:id', (req, res) => {
const { id } = req.params;
console.log(id);
fs.readFile("./keinar.json", "utf8", (err, data) => {
   
    if(err){
         res.send("500");   
    }else{
        const products = JSON.parse(data);
        const product = products.find((product) => product.id === +id);
         res.send(product);
    }
    });
});

app.listen(8080);



// http
// .createServer((req, res) => {
//     res.writeHead(200, {"Content-Type":"text/plain"});
//     res.end("hello world")
// console.log("seccess");
// })
// .listen(8080);
//