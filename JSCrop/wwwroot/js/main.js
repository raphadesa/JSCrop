function SetCoordinates(c) {
    $('#imgX1').val(c.x);
    $('#imgY1').val(c.y);
    $('#imgWidth').val(c.w);
    $('#imgHeight').val(c.h);
    $('#btnCrop').show();
};

window.JSCrop = {
    Init: function () {        
        $('#FileUpload1').change(function (e) {
            var fileName = e.target.files[0].name;
            $('#fileName').val(fileName);
            $('#Image1').hide();
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#Image1').show();
                $('#Image1').attr("src", e.target.result);
                $('#Image1').Jcrop({
                    onChange: SetCoordinates,
                    onSelect: SetCoordinates
                });
            }
            reader.readAsDataURL($(this)[0].files[0]);
        });
    },
    Crop: function () {
        var x1 = $('#imgX1').val();
        var y1 = $('#imgY1').val();
        var width = $('#imgWidth').val();
        var height = $('#imgHeight').val();
        var canvas = $("#canvas")[0];
        var context = canvas.getContext('2d');
        var img = new Image();
        img.onload = function () {
            canvas.height = height;
            canvas.width = width;
            context.drawImage(img, x1, y1, width, height, 0, 0, width, height);
            $('#imgCropped').val(canvas.toDataURL());
            //$('#btnUpload').show();
        };
        img.src = $('#Image1').attr("src");
    }    
}
