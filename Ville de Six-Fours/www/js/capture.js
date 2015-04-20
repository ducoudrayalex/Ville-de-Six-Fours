//$('#signaler').on('pageinit', function () {
/*
 * Permet de lancer la capture de photo en lancant l'application du téléphone 
 * puis d'envoyer un mail avec le contenu du formulaire
 */
document.addEventListener("deviceready", function () {
    $('#signaler').on('pageinit', function () {
        $("#btnCapture").click(function () {
            //options de capture photo
            var options = {
                quality: 40, //qualité de la photo
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
                image.style.display = 'block';
                var urlImage = document.getElementById('urlImage');
                urlImage.value = imageData;
                console.log(urlImage.value);
                console.log('email:' + document.getElementById('email').value);
                console.log('info:' + document.getElementById('info').value);
            }, onFail, options);
        });

        $('#btnEnvoi').click(function () {
            if(document.getElementById('email').value===""){
                
            }
            navigator.notification.confirm(
                    'Envoyer l\'e-mail ?',
                    onConfirm,
                    'Confirmation',
                    ['Valider', 'Annuler']
                    );
            //appel ajax vers l'api mandrill : https://mandrillapp.com/
            /**
             * fonction d'envoie de mail 
             * @param {type} buttonIndex
             * @returns {undefined}
             */
            function onConfirm(buttonIndex) {
                var laDate = new Date();
                var annee = laDate.getFullYear();
                var mois = laDate.getMonth() + 1;
                var jour = laDate.getDate();
                var heure = laDate.getHours();
                var minute = laDate.getMinutes();
                var seconde = laDate.getSeconds();
                if (buttonIndex === 1) {
                    if (document.getElementById('urlImage').value === "") {
//envoie un e-mail depuis l'adresse e-mail renseigné avec le message renseigné et la photo prise avec l'appareil photo en piece jointe
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
//                            "attachments": [//piece jointe
//                                {
//                                    "type": "image/jpg",
//                                    "name": 'signalement-' + jour + '/' + mois + '/' + annee + '/' + heure + '/' + minute + '/' + seconde + '.jpg', //nom du fichier
//                                    "content": document.getElementById('urlImage').html//contenu de l'image trés important !(en base64)
//                                }
//                            ],
                                    'subject': 'signalement', //sujet du mail
                                    'text': document.getElementById('info').value//contenu du mail
                                }
                            }
                        }).done(function (response) {
                            //console.log(response); // if you're into that sorta thing
                            navigator.notification.alert('Votre signalement a été envoyé avec succés', alertDismiss, 'Information', 'ok');

                        });
                    } else {
                        //envoie un e-mail depuis l'adresse e-mail renseigné avec le message renseigné et la photo prise avec l'appareil photo en piece jointe
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
                                            "name": 'signalement-' + jour + '/' + mois + '/' + annee + '/' + heure + '/' + minute + '/' + seconde + '.jpg', //nom du fichier
                                            "content": document.getElementById('urlImage').value//contenu de l'image trés important !(en base64)
                                        }
                                    ],
                                    'subject': 'signalement', //sujet du mail
                                    'text': document.getElementById('info').value//contenu du mail
                                }
                            },
                            error: function () {
                                navigator.notification.alert('L\'envoie du mail a échoué', alertDismiss, 'Information', 'ok');
                            }
                        }).done(function (response) {
                            //console.log(response); // if you're into that sorta thing
                            navigator.notification.alert('Votre signalement a été envoyé avec succés', alertDismiss, 'Information', 'ok');

                        });
                    }
                } else {

                }
            }

        });
        function alertDismiss() {

        }
        function onFail(message) {
            navigator.notification.alert('La jointure d\'une photo a échoué car : ' + message, alertDismiss, 'Information', 'ok');
        }

        //Vide les champs de saisi et la div de l'image 
        document.getElementById('Image').src = "";
        document.getElementById('email').value = "";
        document.getElementById('info').value = "";
        document.getElementById('urlImage').value = "";
    });
}, false);