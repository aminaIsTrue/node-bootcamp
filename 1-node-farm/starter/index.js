const fs = require("fs");
const http = require("http");
const url = require("url");
const { Http2ServerRequest } = require("http2");
const { parse } = require("path");
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

// here write code that will be executed one time (like reading files beforehand so they will be ready for clients requests to not block the execution each time)

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const OverviewCardtemplate = fs.readFileSync(
  `${__dirname}/templates/overview-card.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// Parsing gives each peace of data each type
const dataJason = JSON.parse(data);

// function that put each object from the Json array in its placeholder

const ReplaceTemplate = function (element, template) {
  // replace the place holder in the template with the equivalent value from the element attributes
  // the out put will contain a shallow copy of the template
  // a good practice is to replace in the copy and not in the actual template
  let output = template.replace(/{%IMAGE%}/g, element.image);
  // so we use the the copy to replace the other elements from now on
  output = output.replace(/{%PRODUCT_NAME%}/g, element.productName);
  output = output.replace(/{%QUANTITY%}/g, element.quantity);
  output = output.replace(/{%PRICE%}/g, element.price);
  output = output.replace(/{%ID%}/g, element.id);
  if (!element.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

// //////Server
// 3- create a web server
// 4- implementing simple routing
const server = http.createServer((req, res) => {
  const pathName = req.url;
  // overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    // map each element of dataJason in its equivalent place holder in the overview-card.html
    const cardsHtml = dataJason
      .map((JsonElmnt) => ReplaceTemplate(JsonElmnt, OverviewCardtemplate))
      .join("");
    const output = tempOverview.replace("{%CARDS%}", cardsHtml);
    res.end(output);
  }
  // products page
  else if (pathName === "/products") {
    res.end("This  the PRODUCTS page!");
  }
  // API
  else if (pathName === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    // we read the file in the begining to not to execute the readfile whenever we request the api url
    res.end(dataJason);
  }
  // page not found
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>PAGE NOT FOUND!</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
