$('#signaler').on('pageshow', function () {
//var pictureSource; // picture source
//var destinationType; // sets the format of returned value 
//$(document).ready(function () {
//    pictureSource = navigator.camera.PictureSourceType;
//    destinationType = navigator.camera.DestinationType;
//});

    function onPhotoDataSuccess(imageData) {
//var urlImage = imageData.replace('content://', "");
//    var smallImage = document.getElementById('smallImage');
        console.log('imageData=' + imageData);
//    // faire apparaitre l'image
//    smallImage.style.display = 'block';
        var path = "data:image/jpeg;base64," + imageData;
//    // montre la photo prise en insérant sa source dans l'attribut src de la balise img
//    smallImage.src = "data:image/jpeg;base64," + imageData;
//        cordova.plugins.email.open({
//            to: ['alex.ducoudray@gmail.com'],
//            subject: 'signalement',
//            //attachment: ["base64:image.png/" + imageData]
//            body: '<img  height="200" width="200" src="' + path + '" alt="imageSignalement"/>',
//            isHtml: true
//        });
        $.ajax({
            'type': 'POST',
            'url': 'https://mandrillapp.com/api/1.0/messages/send.json',
            data: {
                'key': 'BpR17CiZtHObUg0R3UdX5g',
                message: {
                    'from_email': 'alex.ducoudray@gmail.com',
                    'to': [
                        {
                            'email': 'ducoudray.alex@gmail.com',
                            'type': 'to'
                        }
                    ],
//                    "attachments": [
//                        {
//                            "type": "image/png",
//                            "name": "image.png",
//                            "content": path
//                        }
//                    ],
                    "images": [
                        {
                            "type": "image/png",
                            "name": '<img src="' + path + '" alt="imageSignalement"/>',
                            "content": path
                        }
                    ],
                    'autotext': true,
                    'subject': 'signalement',
                    'html': '<img src="' + path + '" alt="imageSignalement"/>'
                }
            }
        }).done(function (response) {
            console.log(response); // if you're into that sorta thing
        });
    }
    $('#btnCapture').click(function () {
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 70, allowEdit: true,
            destinationType: navigator.camera.DestinationType.DATA_URL});
    });
    function onFail(message) {
        alert('La jointure d\'une photo a échoué car : ' + message);
    }


// Called when a photo is successfully retrieved
//function onPhotoURISuccess(imageURI) {
//    // Uncomment to view the image file URI 
//    console.log(imageURI);
//
//    // Get image handle
//    var smallImage = document.getElementById('smallImage');
//
//    // Unhide image elements
//    smallImage.style.display = 'block';
//
//    // Show the captured photo
//    // The inline CSS rules are used to resize the image
//    smallImage.src = imageURI;
//
//}
// Called if something bad happens. 

    /**
     * 
     * @param {type} source
     * @returns {undefined}
     */
//function getPhoto(source) {
//    navigator.camera.getPicture(onPhotoURISuccess, onFail, {quality: 70,
//        destinationType: destinationType.FILE_URI,
//        sourceType: source});
//}

    /**
     * récupère une image de la galerie photo du telephone
     */
//$('#btnImportGalerie').click(getPhoto(pictureSource.PHOTOLIBRARY));
    /**
     *Capture une photo en lançant l'appareil photo du telephone 
     */


//$('#btnEnvoyer').click(function () {
//    cordova.plugins.email.open({
//        to: ['alex.ducoudray@gmail.com'],
//        subject: 'signalement',
//        attachment: [document.getElementById('smallImage').src],
//        body: $('#info').value
//    });
//});

});
