$('#signaler').on('pageshow', function () {
    var pictureSource; // picture source
    var destinationType; // sets the format of returned value 
    $(document).ready(function () {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    });

    function onPhotoDataSuccess(imageData) {
        // Uncomment to view the base64 encoded image data
        console.log(imageData);

        var largeImage = document.getElementById('smallImage');

        // faire apparaitre l'image
        largeImage.style.display = 'block';

        // montre la photo prise en insérant sa source dans l'attribut src de la balise img
        largeImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    function onPhotoURISuccess(imageURI) {
        // Uncomment to view the image file URI 
        console.log(imageURI);

        // Get image handle
        var largeImage = document.getElementById('smallImage');

        // Unhide image elements
        largeImage.style.display = 'block';

        // Show the captured photo
        // The inline CSS rules are used to resize the image
        largeImage.src = imageURI;
    }
    // Called if something bad happens. 
    function onFail(message) {
        alert('La jointure d\'une photo a échoué car : ' + message);
    }
    /**
     * 
     * @param {type} source
     * @returns {undefined}
     */
    function getPhoto(source) {
        navigator.camera.getPicture(onPhotoURISuccess, onFail, {quality: 70,
            destinationType: destinationType.FILE_URI,
            sourceType: source});
    }
    /**
     * récupère une image de la galerie photo du telephone
     */
    $('#btnImportGalerie').click(getPhoto(pictureSource.PHOTOLIBRARY));
    /**
     *Capture une photo en lançant l'appareil photo du telephone 
     */
    $('#btnCapture').click(function () {
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 70, allowEdit: true,
            destinationType: destinationType.DATA_URL});

    });

    $('#btnEnvoyer').click(function () {
        cordova.plugins.email.open({
            to: 'ducoudray.alex@gmail.com',
            cc: $('#email').text(),
            app: 'gmail',
            subject: 'Signalement',
            body: $('#info'),
            attachments: $('#smallImage').src
        });
        alert('Mail ok');
    });

});

