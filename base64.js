var images  = document.getElementsByTagName("img");
var imageSrc = images[2].src;

function convertImgToBase64(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback(dataURL);
        canvas = null; 
    };
    img.src = url;
}

convertImgToBase64(imageSrc, function(base64Img){
    console.log('IMAGE:',base64Img);
})