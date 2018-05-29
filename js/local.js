const {remote} = require('electron')
const fs=require('fs');
const path = require('path');


function listDir(fileDirectory){
    if(fs.existsSync(fileDirectory)){
        fs.readdir(fileDirectory, function (err, files) {
            if (err) {
                console.log(err);
                return;
            }

            var count = files.length;
            var results = {};
            files.forEach(function (filename) {
                console.log(path.join(fileDirectory,filename))
            });
        });
    }
    else {
        console.log(fileDirectory + "  Not Found!");
    }

}

var fileDirectory = "D:\\拷贝的缺陷数据\\无人机巡视照片\\缺陷统计\\220kV\\州肖线";
// listDir(fileDirectory)