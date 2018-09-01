var images  = document.getElementsByTagName("img");
var imageSrc = images[2].src;
var imgSrcArray = [];
var base64Array = [];

function convertImgToBase64(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png').replace(/^data:image\/(png|jpg);base64,/, '');
        callback(dataURL);
        canvas = null; 
    };
    img.src = url;
}

for (i = 0; i< images.length; i++) {
    if ((images[i].width > 100) && (images[i].height > 100)) {
        convertImgToBase64(images[i].src, function(base64Img){
            base64Array.push(base64Img);
        })
    }
}

console.log(base64Array);