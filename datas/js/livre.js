
var adressePagePrecedente = document.referrer;
if (adressePagePrecedente != '')
{
    $('#boutonAccueil').removeClass('d-none');
}


// Préparation de la hauteur d'iframe
    var hauteurHeader = $('header').height()
    var hauteurFenetre = $(window).height();
    $('#iframeAffichage').height(hauteurFenetre - hauteurHeader - 50)
    // $('#Sommaire').height(hauteurFenetre - hauteurHeader - 50)

// on activ les info bulles de bootstrap
var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
var tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


// Fonction d'acualisation du curser dans le sommaire
    function curseurSommaire(lien){
        $('#modalBody div.pearl').removeClass('active')
        $( "#modalBody div.pearl:has(a[href='"+lien+"'])" ).addClass('active')
        setTimeout(() => {
            var scrollTop = $( "#modalBody div.active" ).offset().top;
            $('#modalBody').scrollTop(scrollTop);

        }, "1000")

    }

// on génère le fil d'ariane avec les boutons pages suivantes et précédente
function ariane(lien,liste){
    $(".tooltip").fadeOut();
    var position = -1;
    $.each(liste, function(index, element){
        if(element.fichier === lien) {
            position = index;
            return false; // Sortie de la boucle each() une fois l'élément trouvé
        }
    });
    var max = liste.length - 1;
    var suivant = ''
    var precedent = ''
    var fil = liste[position].chemin;
    if (position >= 1){
        precedent = "<div  data-bs-toggle='tooltip' data-bs-placement='bottom' data-bs-custom-class='custom-tooltip' data-bs-title='Page précedente'><a href='" +  liste[position - 1].fichier + "' target='iframeAffichage' onclick=' curseurSommaire(\""+liste[position - 1]+"\"); ariane(\""+liste[position - 1].fichier+"\", liste);'><img src='datas/img/gauche.png' class='page'></a></div>"
    }
    if (position < max){
        suivant = "<div  data-bs-toggle='tooltip' data-bs-placement='bottom' data-bs-custom-class='custom-tooltip' data-bs-title='Page suivante'><a href='" +  liste[position + 1].fichier + "'  target='iframeAffichage' onclick=' curseurSommaire(\""+liste[position + 1]+"\"); ariane(\""+liste[position + 1].fichier+"\", liste);'><img src='datas/img/droite.png' class='page' ></a></div>"
    }

    if ( location.protocol != 'file:') {
        var pathname = window.location.pathname;
        lienFichier = lien.replace(/ /g, '%20');
        lienPartage = location.protocol + '//' + location.hostname + pathname + lienFichier;
        console.log(lienPartage);
        codeiFrame = '<iframe width="900px" height="600px" src="' + lienPartage + '"></iframe>'
        $('#lienPartage').val(lienPartage)
        $('#codePartage').text(codeiFrame)
    }


    setTimeout(() => {
        $('#ariane').text(fil)
        $('#avant').html(precedent)
        $('#apres').html(suivant)
        $('#iframeAffichage').contents().find('.central-column').css('width', '100%')
        $('#iframeAffichage').contents().find('.central-column').css('justify-content', 'left')

        $('#iframeAffichage').height($('#iframeAffichage').contents().find('body').height()+100)
        var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        var tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    }, "200")

}



// preparation du sommaire
    $("#modalBody a[target='iframeAffichage']").on("click", function (){
        $('#Sommaire').remove()
        lien = $(this).attr('href')
        curseurSommaire(lien)
        ariane(lien, liste)
        $('#fermerModal').click()
    })



    $('#Sommaire').contents().find("a[target='iframeAffichage']").each(function() {
        $(this).on("click", function (){
            $('#Sommaire').remove()
            lien = $(this).attr('href')
            curseurSommaire(lien)
            ariane(lien, liste)
        })
    });






// module de recherche
function recherche(rechercher){
    var debut = new Date();


            var pages = {};

            // Traitement des données
            var recherche = rechercher.split(" ");
            $.each(recherche, function(index, mot) {
                $.each(mots[mot], function(page, valeur) {
                    pages[page] = (pages[page] || 0) + valeur;
                });
            });

            // Tri des pages
            var sortedPages = Object.keys(pages).sort(function(a, b) {
                return pages[a] - pages[b];
            });

            // Création de la liste triée
            var goodListe = {};
            sortedPages.reverse().forEach(function(page) {
                goodListe[page] = pages[page];
            });

            $('#resultatRecherche').empty()
            $.each(goodListe, function(index, nb) {

                var ligne = afficher(liste[index])
                $('#resultatRecherche').append(ligne)
            });
            var fin = new Date();
            var tempsEcoule = fin - debut;

            console.log("Temps de recherche : " + tempsEcoule + " millisecondes");

}
function afficher(objet)
{
    var lien = objet.fichier.replace(/%20/g, ' ');
    var ligne = '<a  class="ouvrirDepuisRecherche list-group-item list-group-item-action d-flex gap-3 py-3" href="' + objet.fichier + '" target="iframeAffichage" onclick="$(\'#Sommaire\').remove(); $(\'#boutonAfficherRecherche\').click(); curseurSommaire(\'' + lien + '\'); ariane(\'' + lien + '\', liste);" aria-current="true"><div class="d-flex gap-2 w-100 justify-content-between"><div><h6 class="mb-0">' + objet.titre + '</h6><p class="mb-0 opacity-75">' + objet.chemin + '</p></div><small class="text-primary text-nowrap">Voir la page</small></div></a>'
    return ligne
}

$( "#formSearch" ).on( "submit", function( event ) {
    $('#resultatRecherche').html('<img src="datas/img/attente.gif">')
    var quoi = $('#search').val();
    $('#quoi').text(quoi)

    event.preventDefault();

    recherche(quoi)

});

if ( location.protocol == 'file:')
{
    $('.fonctionPartage').remove();

}


