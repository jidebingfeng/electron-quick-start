
function clearText(text){
    if($("#status").data("uid")==text){
        $("#status").html("")
        // $("#status").removeClass("alert-warning")
    }
}



function download(bug){
    console.log(bug)
    var result =$('#image').cropper('getMarkedImage',bug)
    var url = result.toDataURL("image/jpeg");
    var $a = $("<a href='"+url+"' download='bug.jpg'><label>下载</label></a>")
    $a.find("label").click()
}

$(function () {

    'use strict';

    var console = window.console || {
        log: function () {
        }
    };
    console.info_ = console.info;
    console.info = function(arg,type) {
        console.info_(...arguments);
        if("status" == type){
            $("#status").html(arg)
            var uid = new Date().getTime()
            $("#status").data("uid",uid)
            setTimeout("clearText('"+uid+"')",2000);//2秒，可以改动
            // $("#status").removeClass("alert-warning")
        }
    }
    console.error_ = console.error;
    console.error = function(arg,type) {
        console.error_(...arguments);
        if("status" == type){
            $("#status").html(arg)
            var uid = new Date().getTime()
            $("#status").data("uid",uid)
            setTimeout("clearText('"+uid+"')",2000);//2秒，可以改动
            // $("#status").addClass("alert-warning")
        }
    }


    var URL = window.URL || window.webkitURL;
    var $image = $('#image');
    var $download = $('#download');
    var $dataX = $('#dataX');
    var $dataY = $('#dataY');
    var $dataHeight = $('#dataHeight');
    var $dataWidth = $('#dataWidth');
    var $dataRotate = $('#dataRotate');
    var $dataScaleX = $('#dataScaleX');
    var $dataScaleY = $('#dataScaleY');
    var options = {
        preview: '.img-preview',
        viewMode: 2,
        autoCrop: false,
        dragMode: 'move',
        modal: false
    };
    var originalImageURL = $image.attr('src');
    var uploadedImageName = 'cropped.jpg';
    var uploadedImageType = 'image/jpeg';
    var uploadedImageURL;



    function moveMode(){
        $image.cropper('setDragMode', 'move');
        $("#choice").removeClass("active")
        $("#choice .fa").removeClass("fa-crop")
        $("#choice .fa").addClass("fa-arrows")

    }

    function cropMode(){
        $image.cropper('setDragMode', 'crop');
        $("#choice").addClass("active")
        $("#choice .fa").removeClass("fa-arrows")
        $("#choice .fa").addClass("fa-crop")
    }


    $("#choice").on("click",function (e) {
        if($("#choice .fa").hasClass("fa-crop")){
            moveMode()
        }else{
            cropMode()
        }
    })


    $("#save").on("click",function (e) {
        var cropBoxData = $image.cropper('getCropBoxData');
        var canvasData = $image.cropper('getCanvasData');
        var imageData = $image.cropper('getImageData');
        console.log(cropBoxData,canvasData,imageData)
        if(!cropBoxData.width){
            console.error("请选择缺陷位置","status")
            return;
        }

        if(!$("#defect").val()){
            console.error("请输入缺陷描述","status")
            return ;
        }

        var x = cropBoxData.left - canvasData.left + cropBoxData.width/2
        var y = cropBoxData.top -canvasData.top + cropBoxData.height/2
        var scale = canvasData.naturalWidth / canvasData.width
        x = x * scale;
        y = y * scale;
        var width =  cropBoxData.width/2 *scale
        var height =  cropBoxData.height/2 *scale
        $("#list").append("<a href='javascript:download({x:"+x+",y:"+y+",width:"+width+",height:"+height+"});'><li>"+$("#line").val()+$("#tower").val()+$("#defect").val()+"</li></a>");
        $image.cropper('clear');
        $("#defect").val("")
    })

    $("#before").on("click",function (e) {
        var imgurl = "img/bug1.jpg";
        $image.cropper('destroy').attr('src', formatUrl(imgurl)).cropper(options);
    })
    $("#next").on("click",function (e) {
        var imgurl = "D:\\拷贝的缺陷数据\\无人机巡视照片\\缺陷统计\\220kV\\州肖线\\9#A相(1)挂线金具缺少开口销螺栓松动 - 副本.jpg";
        $image.cropper('destroy').attr('src', formatUrl(imgurl)).cropper(options);
    })




    // Cropper
    $image.on({
        ready: function (e) {
            console.log(e.type);
        },
        cropstart: function (e) {
            console.log(e.type, e.detail.action);
        },
        cropmove: function (e) {
            console.log(e.type, e.detail.action);
        },
        cropend: function (e) {
            console.log(e.type, e.detail.action);
            moveMode();
        },
        crop: function (e) {
            console.log(e.type);
        },
        zoom: function (e) {
            console.log(e.type, e.detail.ratio);
        }
    }).cropper(options);




    $(document.body).on("keyup", function (e) {

        console.log("keyup" + e.which)
        switch (e.which) {
            case 17:        //Ctrl
                moveMode();
                console.info("松开CRTL键：进入浏览模式","status")
                break;

            default:
                break;
        }
    });

    // Keyboard
    $(document.body).on('keydown', function (e) {

        if (!$image.data('cropper') || this.scrollTop > 300) {
            return;
        }
        console.log("keydown" + e.which)
        switch (e.which) {


            case 37:  //左
                e.preventDefault();
                $image.cropper('move', -1, 0);
                break;

            case 38:  //上
                e.preventDefault();
                $image.cropper('move', 0, -1);
                break;

            case 39:  //右
                e.preventDefault();
                $image.cropper('move', 1, 0);
                break;

            case 40:  //下
                e.preventDefault();
                $image.cropper('move', 0, 1);
                break;


            case 17:    //Ctrl
                cropMode();
                console.info("按下CRTL键：进入选择模式","status")
                break;

            case 27:    //Esc
                $image.cropper('clear');
                console.info("点击ESC键：清除选框","status")
                break;

            default:
                break;
        }
    });


});
