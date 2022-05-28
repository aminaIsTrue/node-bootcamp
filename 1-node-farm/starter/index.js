const fs = require("fs");
const { text } = require("stream/consumers");
// const hello = "hello world!";
// console.log(hello);
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
const Output = `Hello, this is Amina talking! and this is what we know about Avocados: \n ${textIn}`;
fs.writeFileSync("./txt/output.txt", Output);
