const {remote} = require('electron')
const fs = require('fs');
const path = require('path');
const url = require('url')


function listDir(fileDirectory) {
    if (fs.existsSync(fileDirectory)) {
        fs.readdir(fileDirectory, function (err, files) {
            if (err) {
                console.log(err);
                return;
            }

            var count = files.length;
            var results = {};
            files.forEach(function (filename) {
                console.log(path.join(fileDirectory, filename))
            });
        });
    }
    else {
        console.log(fileDirectory + "  Not Found!");
    }

}

function formatUrl(src) {
    return url.format({
        protocol: 'file',
        slashes: true,
        pathname: src
    })
}

function saveDataUrl(dataUrl){
    remote.getCurrentWindow().loadURL(dataUrl)
}