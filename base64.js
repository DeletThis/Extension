var images = document.getElementsByTagName("img");
var imageSrc = images[2].src;
var imgSrcArray = [];
var base64Array = [];
var isImgMeme = [];

function convertImgToBase64(url, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png').replace(/^data:image\/(png|jpg);base64,/, '');
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}

function determineMeme(image) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-deletthis-123.cloudfunctions.net/cloud_is_meme', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        console.log(this.responseText); 
    };
    xhr.send(encodeURIComponent('image') + '=' + encodeURIComponent(image));
}

for (i = 0; i < images.length; i++) {
    if ((images[i].width > 100) && (images[i].height > 100)) {
        convertImgToBase64(images[i].src, function (base64Img) {
            base64Array.push(base64Img);
            determineMeme(base64Img);
        })
    }
}

console.log(base64Array);