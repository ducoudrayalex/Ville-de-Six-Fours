$('#signaler').on('pageshow', function () {
    document.getElementById('Image').src = "";
    document.getElementById('email').value = "";
    document.getElementById('info').value = "";
    document.addEventListener("deviceready", function () {
        $("#btnCapture").click(function () {
            //options de capture photo
            var options = {
                quality: 50, //qualité de la photo
                destinationType: navigator.camera.DestinationType.DATA_URL, //url de destination de la photo
                sourceType: navigator.camera.PictureSourceType.CAMERA, //où la photo va être sauvegardé
                allowEdit: true, //autorise l'edition de la photo
                encodingType: navigator.camera.EncodingType.JPEG, //encodage du type de la photo(jpeg)
                saveToPhotoAlbum: true//sauvegarde de la photo dans l'album du téléphone
            };
            /**
             * Fonction qui lance l'app de camera du téléphone et envoie un email avec la photo en piece jointe
             */
            navigator.camera.getPicture(function (imageData) {
                var image = document.getElementById('Image');
                image.src = "data:image/jpeg;base64," + imageData;
                console.log(imageData);
                console.log('email:' + document.getElementById('email').value);
                console.log('info:' + document.getElementById('info').value);
                //appel ajax vers l'api mandrill : https://mandrillapp.com/
                var laDate = new Date();
                var annee = laDate.getFullYear();
                var mois = laDate.getMonth() + 1;
                var jour = laDate.getDate();
                var heure = laDate.getHours();
                var minute = laDate.getMinutes();
                var seconde = laDate.getSeconds();
                $.ajax({
                    'type': 'POST',
                    'url': 'https://mandrillapp.com/api/1.0/messages/send.json',
                    data: {
                        'key': 'BpR17CiZtHObUg0R3UdX5g', //clé d'API a changer car sur mon compte mandrill
                        message: {
                            'from_email': document.getElementById('email').value, //email a renseigner
                            'to': [
                                {
                                    'email': 'ducoudray.alex@gmail.com', //email de destination soit au service qui prend en charge les demandes
                                    'type': 'to'
                                }
                            ],
                            "attachments": [//piece jointe
                                {
                                    "type": "image/jpg",
                                    "name": 'signalement-' + jour + '/' + mois + '/' + annee + '/' + heure +'/'+minute+'/'+seconde+ '.jpg', //nom du fichier
                                    "content": imageData//contenu de l'image trés important !(en base64)
                                }
                            ],
                            'subject': 'signalement', //sujet du mail
                            'text': document.getElementById('info').value//contenu du mail
                        }
                    }
                }).done(function (response) {
                    console.log(response); // if you're into that sorta thing
                });
            }, onFail, options);
        });
    }, false);

    function onFail(message) {
        alert('La jointure d\'une photo a échoué car : ' + message);
    }
});
