$(function () {

    'use strict';

    var console = window.console || {
        log: function () {
        }
    };
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
        if(!$image.cropper('getCropBoxData').width){
            alert("请选择缺陷位置")
            return;
        }

        if(!$("#defect").val()){
            alert("请输入缺陷描述")
            return ;
        }

        $("#list").append("<li>"+$("#line").val()+$("#tower").val()+$("#defect").val()+"</li>");
        $image.cropper('clear');
        $("#defect").val("")
    })

    $("#before").on("click",function (e) {
        $image.cropper('destroy').attr('src', "img/bug1.jpg").cropper(options);
    })
    $("#next").on("click",function (e) {
        var imgurl = "D:\\拷贝的缺陷数据\\无人机巡视照片\\缺陷统计\\220kV\\州肖线\\9%23A相(1)挂线金具缺少开口销螺栓松动 - 副本.jpg";
        $image.cropper('destroy').attr('src', imgurl).cropper(options);
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
                break;

            case 27:    //Esc
                $image.cropper('clear');
                break;

            default:
                break;
        }
    });


});
