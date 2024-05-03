var http = require("http");
var fs = require("fs");

let server = http.createServer(function (req, res) {
  //readFile(res);
  //createTxtFile(res);
  //deleteFile(res);
});

function readFile(res) {
  fs.readFile("demofile1.html", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
}

function createTxtFile(res) {
  fs.appendFile("mynewfile1.txt", "Hello content!", function (err) {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Successfully saved");
    console.log("Saved!");
    return res.end();
  });
}
function deleteFile(res) {
  fs.unlink("mynewfile1.txt", function (err) {
    if (err) {
      throw err;
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("Successfully Deleted");
      console.log("Deleted!");
    }
    return res.end();
  });
}

server.listen(8089, () => {
  console.log("Read File Server listening");
});
