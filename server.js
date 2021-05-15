const returndowsct = function (bookname) {
  return `<h2 color='green'>${bookname}</h2><a href="http://${bh}:3001/${
    verytruelist[verytruelistbis.indexOf(bookname)]
  }" target="_blank"><button>Download the book</button></a><hr><br>`;
};

var fs = require("fs");
var express = require("express");
var app = express();
var http2 = require("http").Server(app);
var url = require("url");
var hosturl;
var bh = require("os").networkInterfaces().en0[1].address;
console.log("hi from init");
var os = require("os");
var networkInterfaces = os.networkInterfaces();
var http = require("http");
//var books = fs.readdirSync('./Books/')
var htmlfile = `<h1>Books Download:</h1><br><hr>`;
var htmlfile1 = `
<h1>Books Download:</h1><br><hr>
<script>var pass = prompt('passcode');
window.open('/passcode/'+pass,"_self")
</script>`;

var fetchhtml = function () {
  console.log("Beginning fetching...");
  htmlfile = `<h1>Books Download:</h1><br><hr>`;

  var temp, tempbis;
  var dirlist = fs.readdirSync("./Books");
  var listofdirlist,
    verytruelist = [],
    verytruelistbis = [];
  //console.log(dirlist)

  for (i = 0; i < dirlist.length; i++) {
    if (
      dirlist[i] == ".DS_Store" ||
      dirlist[i] == "metadata.db" ||
      dirlist[i] == "metadata_db_prefs_backup.json" ||
      dirlist[i] == "metadata_pre_restore.db"
    ) {
      //pass
    } else {
      temp = fs.readdirSync("./Books/" + dirlist[i] + "/");
      for (i2 = 0; i2 < temp.length; i2++) {
        if (temp[i2] == ".DS_Store") {
          //pass
        } else {
          tempbis = fs.readdirSync(
            "./Books/" + dirlist[i] + "/" + temp[i2] + "/"
          );
          for (i3 = 0; i3 < tempbis.length; i3++) {
            if (
              tempbis[i3].endsWith(".pdf") ||
              tempbis[i3].endsWith(".epub") ||
              tempbis[i3].endsWith(".mobi") ||
              tempbis[i3].endsWith(".azw") ||
              tempbis[i3].endsWith(".azw3") ||
              tempbis[i3].endsWith(".iba")
            ) {
              verytruelistbis.push(tempbis[i3]);
              verytruelist.push(
                "Books/" + dirlist[i] + "/" + temp[i2] + "/" + tempbis[i3]
              );
            }
          }
        }
      }
    }
  }

  for (var i = 0; i < verytruelistbis.length; i++) {
    htmlfile += returndowsct(verytruelistbis[i]);
  }
  console.log("Finished fetching !");
};

//————————————————————————————————————————————————————————————————————————————

var temp, tempbis;
var dirlist = fs.readdirSync("./Books");
var listofdirlist,
  verytruelist = [],
  verytruelistbis = [];
//console.log(dirlist)

for (i = 0; i < dirlist.length; i++) {
  if (
    dirlist[i] == ".DS_Store" ||
    dirlist[i] == "metadata.db" ||
    dirlist[i] == "metadata_db_prefs_backup.json" ||
    dirlist[i] == "metadata_pre_restore.db"
  ) {
    //pass
  } else {
    temp = fs.readdirSync("./Books/" + dirlist[i] + "/");
    for (i2 = 0; i2 < temp.length; i2++) {
      if (temp[i2] == ".DS_Store") {
        //pass
      } else {
        tempbis = fs.readdirSync(
          "./Books/" + dirlist[i] + "/" + temp[i2] + "/"
        );
        for (i3 = 0; i3 < tempbis.length; i3++) {
          if (
            tempbis[i3].endsWith(".pdf") ||
            tempbis[i3].endsWith(".epub") ||
            tempbis[i3].endsWith(".mobi") ||
            tempbis[i3].endsWith(".azw") ||
            tempbis[i3].endsWith(".azw3") ||
            tempbis[i3].endsWith(".iba")
          ) {
            verytruelistbis.push(tempbis[i3]);
            verytruelist.push(
              "Books/" + dirlist[i] + "/" + temp[i2] + "/" + tempbis[i3]
            );
          }
        }
      }
    }
  }
}

//————————————————————————————————————————————————————————————————————————————

const print = function (toprint) {
  console.log(toprint);
};

for (var i = 0; i < verytruelistbis.length; i++) {
  htmlfile += returndowsct(verytruelistbis[i]);
}

//——————————————————————————————————————––––––––––-––––——–––——–———————_—–—

const requestListener = function (req, res) {
  fetchhtml();
  res.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
  if (req.url == "/") {
    res.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
    res.write(htmlfile1);
    res.end();
  } else if (req.url.startsWith("/passcode/")) {
    if (req.url.substr(10, req.url.length + 1) == "password123") {
      res.write(htmlfile);
      res.end();
    } else {
      res.write(htmlfile1);
      res.end();
    }
  }
};

const server = http.createServer(requestListener);
server.listen(8080);

//——————————————————————————————————————––––––––––-––––——–––——–———————_—–—

app.get("*", function (req, res) {
  res.download("." + decodeURIComponent(req.url));
  console.log(req.url);
});
http2.listen(3001, function () {
  console.log("Server is live on server " + 3001);
});
