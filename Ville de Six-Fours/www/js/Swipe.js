/*
 * Ce fichier a pour but de permettre de naviguer parmi les pages
 *  de l'application en glissant avec le doight sur l'écran à gauche ou à droite 
 */
$(document).on("pageinit", "[data-role='page']", function () {
    var page = "#" + $(this).attr("id"), //récupère l'id de la page où $(this) correspond à la page courante
            // récupére l'id de la page suivante qui est stocké dans l'attribut data-next
            next = $(this).jqmData("next"),
            // récupére l'id de la page précédente qui est stocké dans l'attribut data-prev
            prev = $(this).jqmData("prev");
// vérifie si l'attribut data-next est rempli
    if (next) {
        // précharge la page suivante
        $.mobile.loadPage('#' + next);
        // évenement pour swipe vers la droite et changer de page
        $(document).on("swipeleft", page, function () {
            $.mobile.changePage('#' + next, {transition: "slide"});
        });
    }
// pareil que précedemment sauf qu'il n'y a plus besoin de précharger la page
    if (prev) {
        $(document).on("swiperight", page, function () {
            $.mobile.changePage('#' + prev, {transition: "slide", reverse: true});
        });
    }
});






