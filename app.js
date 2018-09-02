var images = document.getElementsByTagName("img");
var imgSrcArray = [];
var base64Array = [];

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

function determineMeme(b64Image, imgElement) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-deletthis-123.cloudfunctions.net/cloud_is_meme', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    console.log(imgElement);

    xhr.onload = function () {
        console.log(this.responseText);
        var serverResponse = JSON.parse(this.responseText);
        removeMeme(imgElement, (serverResponse['is_meme']));
        console.log("xD" + imgElement);
    };

    xhr.send(encodeURIComponent('image') + '=' + encodeURIComponent(b64Image));
}

function removeMeme(imageIndex, response) {
    if (response == true) {
        console.log(imageIndex)
        imageIndex.src = "https://static-cdn.jtvnw.net/jtv_user_pictures/e91a3dcf-c15a-441a-b369-996922364cdc-profile_image-300x300.png";
        console.log(imageIndex.src);
    }
}

for (i = 0; i < images.length; i++) {
    if ((images[i].width > 100) && (images[i].height > 100)) {
        (function (img) {
            convertImgToBase64(images[i].src, function (base64Img) {
                base64Array.push(base64Img);
                determineMeme(base64Img, img);
            })
        })(images[i]);
    }
}

console.log('Images to process: ' + base64Array.length.toString())
console.log(base64Array);