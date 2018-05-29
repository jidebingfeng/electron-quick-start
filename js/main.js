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




    // Download
    // if (typeof $download[0].download === 'undefined') {
    //   $download.addClass('disabled');
    // }


    // Options
    $('.docs-toggles').on('change', 'input', function () {
        var $this = $(this);
        var name = $this.attr('name');
        var type = $this.prop('type');
        var cropBoxData;
        var canvasData;

        if (!$image.data('cropper')) {
            return;
        }

        if (type === 'checkbox') {
            options[name] = $this.prop('checked');
            cropBoxData = $image.cropper('getCropBoxData');
            canvasData = $image.cropper('getCanvasData');

            options.ready = function () {
                $image.cropper('setCropBoxData', cropBoxData);
                $image.cropper('setCanvasData', canvasData);
            };
        } else if (type === 'radio') {
            options[name] = $this.val();
        }

        $image.cropper('destroy').cropper(options);
    });


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

    // $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);

});
