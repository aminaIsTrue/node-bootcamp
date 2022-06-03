const fs = require("fs");
const http = require("http");
const url = require("url");
const { Http2ServerRequest } = require("http2");
// ////Files
// 1-read & write files sync mode
// const { text } = require("stream/consumers");
// const path = require("path");
// // const hello = "hello world!";
// // console.log(hello);
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// const Output = `Hello, this is Amina talking! and this is what we know about Avocados: \n ${textIn}`;
// fs.writeFileSync("./txt/output.txt", Output);

//2- read & write files async mode (do it later)

// here write code that will be executed one time
const dataJason = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

// //////Server
// 3- create a web server
// 4- implementing simple routing
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW page!");
  } else if (pathName === "/products") {
    res.end("This is the PRODUCTS page!");
  } else if (pathName === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    // we read the file in the begining to not to execute the readfile whenever we request the api url
    res.end(dataJason);
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>PAGE NOT FOUND!</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
